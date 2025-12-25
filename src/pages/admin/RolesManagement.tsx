import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RoleBadge } from '@/components/admin/RoleBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  display_name: string;
  color: string;
  badge_text: string | null;
  priority: number;
  is_staff: boolean;
  is_system: boolean;
}

const RolesManagement = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    display_name: '',
    color: '#6b7280',
    badge_text: '',
    priority: 0,
    is_staff: false,
  });

  const fetchRoles = async () => {
    const { data } = await supabase
      .from('custom_roles')
      .select('*')
      .order('priority', { ascending: false });
    
    if (data) setRoles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const roleData = {
      name: formData.name.toLowerCase().replace(/\s+/g, '_'),
      display_name: formData.display_name,
      color: formData.color,
      badge_text: formData.badge_text || null,
      priority: formData.priority,
      is_staff: formData.is_staff,
    };

    if (editingRole) {
      const { error } = await supabase
        .from('custom_roles')
        .update(roleData)
        .eq('id', editingRole.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        // Log action
        await supabase.from('moderation_logs').insert({
          actor_id: user!.id,
          action: 'Updated role',
          target_type: 'role',
          target_id: editingRole.id,
          details: { role_name: formData.display_name },
        });
        toast({ title: 'Role updated' });
        setDialogOpen(false);
        fetchRoles();
      }
    } else {
      const { data, error } = await supabase
        .from('custom_roles')
        .insert(roleData)
        .select()
        .single();

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        await supabase.from('moderation_logs').insert({
          actor_id: user!.id,
          action: 'Created role',
          target_type: 'role',
          target_id: data.id,
          details: { role_name: formData.display_name },
        });
        toast({ title: 'Role created' });
        setDialogOpen(false);
        fetchRoles();
      }
    }
  };

  const handleDelete = async (role: Role) => {
    if (role.is_system) {
      toast({ title: 'Error', description: 'Cannot delete system roles', variant: 'destructive' });
      return;
    }

    if (!confirm(`Delete role "${role.display_name}"?`)) return;

    const { error } = await supabase.from('custom_roles').delete().eq('id', role.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      await supabase.from('moderation_logs').insert({
        actor_id: user!.id,
        action: 'Deleted role',
        target_type: 'role',
        target_id: role.id,
        details: { role_name: role.display_name },
      });
      toast({ title: 'Role deleted' });
      fetchRoles();
    }
  };

  const openCreateDialog = () => {
    setEditingRole(null);
    setFormData({
      name: '',
      display_name: '',
      color: '#6b7280',
      badge_text: '',
      priority: 0,
      is_staff: false,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      display_name: role.display_name,
      color: role.color,
      badge_text: role.badge_text || '',
      priority: role.priority,
      is_staff: role.is_staff,
    });
    setDialogOpen(true);
  };

  return (
    <AdminLayout requiredPermission="manage_roles">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading">Roles Management</h1>
            <p className="text-muted-foreground text-sm">Create and manage custom roles</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="font-heading">
                  {editingRole ? 'Edit Role' : 'Create Role'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input
                      value={formData.display_name}
                      onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                      placeholder="e.g., VIP Member"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Badge Text</Label>
                    <Input
                      value={formData.badge_text}
                      onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                      placeholder="e.g., VIP"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-14 h-10 p-1"
                      />
                      <Input
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        placeholder="#6b7280"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Input
                      type="number"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                      placeholder="0-100"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_staff}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_staff: checked })}
                  />
                  <Label>Staff Role</Label>
                </div>
                <div className="pt-2">
                  <Label className="text-muted-foreground text-xs">Preview:</Label>
                  <div className="mt-2">
                    <RoleBadge
                      displayName={formData.display_name || 'Role'}
                      color={formData.color}
                      badgeText={formData.badge_text || undefined}
                      size="md"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {editingRole ? 'Update Role' : 'Create Role'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading roles...</p>
        ) : (
          <div className="grid gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="bg-card border-border">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <RoleBadge
                      displayName={role.display_name}
                      color={role.color}
                      badgeText={role.badge_text}
                      size="md"
                    />
                    <div>
                      <p className="text-sm">{role.display_name}</p>
                      <p className="text-xs text-muted-foreground">
                        Priority: {role.priority} • {role.is_staff ? 'Staff' : 'Member'}
                        {role.is_system && ' • System'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(role)}
                      disabled={role.is_system}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(role)}
                      disabled={role.is_system}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RolesManagement;
