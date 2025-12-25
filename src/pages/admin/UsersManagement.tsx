import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RoleBadge } from '@/components/admin/RoleBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Search, Shield } from 'lucide-react';

interface User {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  roles: Array<{
    id: string;
    name: string;
    display_name: string;
    color: string;
    badge_text: string | null;
    priority: number;
  }>;
}

interface Role {
  id: string;
  name: string;
  display_name: string;
  color: string;
  badge_text: string | null;
  priority: number;
}

const UsersManagement = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchData = async () => {
    // Fetch all profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, display_name, avatar_url')
      .order('display_name');

    // Fetch all roles
    const { data: rolesData } = await supabase
      .from('custom_roles')
      .select('*')
      .order('priority', { ascending: false });

    if (rolesData) setRoles(rolesData);

    // Fetch all user role assignments
    const { data: userRolesData } = await supabase
      .from('user_custom_roles')
      .select(`
        user_id,
        role_id,
        custom_roles (*)
      `);

    if (profiles) {
      const usersWithRoles = profiles.map((profile) => {
        const assignedRoles = userRolesData
          ?.filter((ur: any) => ur.user_id === profile.user_id)
          .map((ur: any) => ur.custom_roles)
          .filter(Boolean) || [];

        return {
          ...profile,
          roles: assignedRoles,
        };
      });

      setUsers(usersWithRoles);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openRolesDialog = (user: User) => {
    setSelectedUser(user);
    setUserRoles(user.roles.map(r => r.id));
    setDialogOpen(true);
  };

  const toggleRole = (roleId: string) => {
    setUserRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(r => r !== roleId)
        : [...prev, roleId]
    );
  };

  const saveUserRoles = async () => {
    if (!selectedUser) return;

    // Delete existing roles
    await supabase
      .from('user_custom_roles')
      .delete()
      .eq('user_id', selectedUser.user_id);

    // Insert new roles
    if (userRoles.length > 0) {
      const inserts = userRoles.map(roleId => ({
        user_id: selectedUser.user_id,
        role_id: roleId,
        assigned_by: currentUser!.id,
      }));

      const { error } = await supabase
        .from('user_custom_roles')
        .insert(inserts);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
    }

    // Log action
    await supabase.from('moderation_logs').insert({
      actor_id: currentUser!.id,
      action: 'Updated user roles',
      target_type: 'user',
      target_id: selectedUser.user_id,
      details: { roles: userRoles },
    });

    toast({ title: 'Roles updated' });
    setDialogOpen(false);
    fetchData();
  };

  const filteredUsers = users.filter(user => 
    user.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout requiredPermission="assign_roles">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading">Users Management</h1>
          <p className="text-muted-foreground text-sm">Assign roles to users</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading users...</p>
        ) : (
          <div className="grid gap-3">
            {filteredUsers.map((user) => (
              <Card key={user.user_id} className="bg-card border-border">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted border border-border rounded-sm flex items-center justify-center overflow-hidden">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg">👤</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.display_name || 'Anonymous'}</p>
                      <div className="flex gap-1 mt-1">
                        {user.roles.length > 0 ? (
                          user.roles.map(role => (
                            <RoleBadge
                              key={role.id}
                              displayName={role.display_name}
                              color={role.color}
                              badgeText={role.badge_text}
                            />
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No roles</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Dialog open={dialogOpen && selectedUser?.user_id === user.user_id} onOpenChange={(open) => {
                    if (!open) setDialogOpen(false);
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => openRolesDialog(user)}>
                        <Shield className="w-4 h-4 mr-2" />
                        Manage Roles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="font-heading">
                          Manage Roles - {selectedUser?.display_name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        {roles.map((role) => (
                          <div 
                            key={role.id} 
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-sm"
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={userRoles.includes(role.id)}
                                onCheckedChange={() => toggleRole(role.id)}
                              />
                              <RoleBadge
                                displayName={role.display_name}
                                color={role.color}
                                badgeText={role.badge_text}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Priority: {role.priority}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button onClick={saveUserRoles} className="w-full mt-4">
                        Save Roles
                      </Button>
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

export default UsersManagement;
