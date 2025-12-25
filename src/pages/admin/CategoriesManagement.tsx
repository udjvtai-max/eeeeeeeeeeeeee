import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RoleBadge } from '@/components/admin/RoleBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { FolderOpen, Settings } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface Role {
  id: string;
  name: string;
  display_name: string;
  color: string;
  badge_text: string | null;
}

interface CategoryPermission {
  id: string;
  category_id: string;
  role_id: string;
  can_view: boolean;
  can_create_thread: boolean;
  can_reply: boolean;
}

const CategoriesManagement = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [categoryPermissions, setCategoryPermissions] = useState<CategoryPermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchData = async () => {
    const [catsRes, rolesRes, permsRes] = await Promise.all([
      supabase.from('forum_categories').select('*').order('sort_order'),
      supabase.from('custom_roles').select('*').order('priority', { ascending: false }),
      supabase.from('category_permissions').select('*'),
    ]);

    if (catsRes.data) setCategories(catsRes.data);
    if (rolesRes.data) setRoles(rolesRes.data);
    if (permsRes.data) setCategoryPermissions(permsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCategoryPermission = (categoryId: string, roleId: string) => {
    return categoryPermissions.find(
      cp => cp.category_id === categoryId && cp.role_id === roleId
    );
  };

  const updateCategoryPermission = async (
    categoryId: string,
    roleId: string,
    field: 'can_view' | 'can_create_thread' | 'can_reply',
    value: boolean
  ) => {
    const existing = getCategoryPermission(categoryId, roleId);

    if (existing) {
      const { error } = await supabase
        .from('category_permissions')
        .update({ [field]: value })
        .eq('id', existing.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        setCategoryPermissions(prev => 
          prev.map(cp => cp.id === existing.id ? { ...cp, [field]: value } : cp)
        );
      }
    } else {
      const newPerm = {
        category_id: categoryId,
        role_id: roleId,
        can_view: field === 'can_view' ? value : true,
        can_create_thread: field === 'can_create_thread' ? value : true,
        can_reply: field === 'can_reply' ? value : true,
      };

      const { data, error } = await supabase
        .from('category_permissions')
        .insert(newPerm)
        .select()
        .single();

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else if (data) {
        setCategoryPermissions(prev => [...prev, data]);
      }
    }

    await supabase.from('moderation_logs').insert({
      actor_id: user!.id,
      action: `Updated category permission: ${field}`,
      target_type: 'category',
      target_id: categoryId,
      details: { role_id: roleId, field, value },
    });
  };

  const openPermissionsDialog = (category: Category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  return (
    <AdminLayout requiredPermission="manage_categories">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading">Category Permissions</h1>
          <p className="text-muted-foreground text-sm">Set role-based access for forum categories</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading categories...</p>
        ) : (
          <div className="grid gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="bg-card border-border">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <Dialog open={dialogOpen && selectedCategory?.id === category.id} onOpenChange={(open) => {
                    if (!open) setDialogOpen(false);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => openPermissionsDialog(category)}>
                        <Settings className="w-4 h-4 mr-2" />
                        Permissions
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-heading">
                          Permissions - {selectedCategory?.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-2 text-sm">Role</th>
                              <th className="text-center p-2 text-sm">View</th>
                              <th className="text-center p-2 text-sm">Create</th>
                              <th className="text-center p-2 text-sm">Reply</th>
                            </tr>
                          </thead>
                          <tbody>
                            {roles.map((role) => {
                              const perm = getCategoryPermission(selectedCategory?.id || '', role.id);
                              return (
                                <tr key={role.id} className="border-b border-border">
                                  <td className="p-2">
                                    <RoleBadge
                                      displayName={role.display_name}
                                      color={role.color}
                                      badgeText={role.badge_text}
                                    />
                                  </td>
                                  <td className="p-2 text-center">
                                    <Switch
                                      checked={perm?.can_view ?? true}
                                      onCheckedChange={(v) => 
                                        updateCategoryPermission(selectedCategory!.id, role.id, 'can_view', v)
                                      }
                                    />
                                  </td>
                                  <td className="p-2 text-center">
                                    <Switch
                                      checked={perm?.can_create_thread ?? true}
                                      onCheckedChange={(v) => 
                                        updateCategoryPermission(selectedCategory!.id, role.id, 'can_create_thread', v)
                                      }
                                    />
                                  </td>
                                  <td className="p-2 text-center">
                                    <Switch
                                      checked={perm?.can_reply ?? true}
                                      onCheckedChange={(v) => 
                                        updateCategoryPermission(selectedCategory!.id, role.id, 'can_reply', v)
                                      }
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CategoriesManagement;
