import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { RoleBadge } from '@/components/admin/RoleBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Role {
  id: string;
  name: string;
  display_name: string;
  color: string;
  badge_text: string | null;
  priority: number;
}

interface Permission {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  category: string;
}

interface RolePermission {
  role_id: string;
  permission_id: string;
}

const PermissionsManagement = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const [rolesRes, permsRes, rpRes] = await Promise.all([
      supabase.from('custom_roles').select('*').order('priority', { ascending: false }),
      supabase.from('permissions').select('*').order('category'),
      supabase.from('role_permissions').select('role_id, permission_id'),
    ]);

    if (rolesRes.data) setRoles(rolesRes.data);
    if (permsRes.data) setPermissions(permsRes.data);
    if (rpRes.data) setRolePermissions(rpRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hasPermission = (roleId: string, permissionId: string) => {
    return rolePermissions.some(rp => rp.role_id === roleId && rp.permission_id === permissionId);
  };

  const togglePermission = async (roleId: string, permissionId: string, permName: string) => {
    const exists = hasPermission(roleId, permissionId);

    if (exists) {
      const { error } = await supabase
        .from('role_permissions')
        .delete()
        .eq('role_id', roleId)
        .eq('permission_id', permissionId);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        setRolePermissions(prev => prev.filter(
          rp => !(rp.role_id === roleId && rp.permission_id === permissionId)
        ));
        await supabase.from('moderation_logs').insert({
          actor_id: user!.id,
          action: `Removed permission: ${permName}`,
          target_type: 'role',
          target_id: roleId,
        });
      }
    } else {
      const { error } = await supabase
        .from('role_permissions')
        .insert({ role_id: roleId, permission_id: permissionId });

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        setRolePermissions(prev => [...prev, { role_id: roleId, permission_id: permissionId }]);
        await supabase.from('moderation_logs').insert({
          actor_id: user!.id,
          action: `Added permission: ${permName}`,
          target_type: 'role',
          target_id: roleId,
        });
      }
    }
  };

  const permissionsByCategory = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <AdminLayout requiredPermission="manage_permissions">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading">Permissions Matrix</h1>
          <p className="text-muted-foreground text-sm">Assign permissions to roles</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading permissions...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 bg-muted text-sm font-heading">Permission</th>
                  {roles.map((role) => (
                    <th key={role.id} className="p-3 bg-muted text-center min-w-[100px]">
                      <RoleBadge
                        displayName={role.display_name}
                        color={role.color}
                        badgeText={role.badge_text}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(permissionsByCategory).map(([category, perms]) => (
                  <>
                    <tr key={category}>
                      <td colSpan={roles.length + 1} className="p-2 bg-secondary">
                        <span className="text-xs font-heading uppercase text-primary">
                          {category}
                        </span>
                      </td>
                    </tr>
                    {perms.map((perm) => (
                      <tr key={perm.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <p className="text-sm">{perm.display_name}</p>
                            <p className="text-xs text-muted-foreground">{perm.description}</p>
                          </div>
                        </td>
                        {roles.map((role) => (
                          <td key={role.id} className="p-3 text-center">
                            <Checkbox
                              checked={hasPermission(role.id, perm.id)}
                              onCheckedChange={() => togglePermission(role.id, perm.id, perm.name)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PermissionsManagement;
