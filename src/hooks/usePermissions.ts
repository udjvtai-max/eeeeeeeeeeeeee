import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface CustomRole {
  id: string;
  name: string;
  display_name: string;
  color: string;
  badge_text: string | null;
  priority: number;
  is_staff: boolean;
  is_system: boolean;
}

export interface Permission {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  category: string;
}

export interface UserRole {
  role_id: string;
  custom_roles: CustomRole;
}

export const usePermissions = () => {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<CustomRole[]>([]);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [primaryRole, setPrimaryRole] = useState<CustomRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserPermissions = useCallback(async () => {
    if (!user) {
      setUserRoles([]);
      setUserPermissions([]);
      setPrimaryRole(null);
      setLoading(false);
      return;
    }

    try {
      // Fetch user's custom roles
      const { data: rolesData } = await supabase
        .from('user_custom_roles')
        .select(`
          role_id,
          custom_roles (*)
        `)
        .eq('user_id', user.id);

      if (rolesData && rolesData.length > 0) {
        const roles = rolesData
          .map((r: any) => r.custom_roles)
          .filter(Boolean) as CustomRole[];
        
        setUserRoles(roles);
        
        // Get primary role (highest priority)
        const primary = roles.reduce((prev, current) => 
          prev.priority > current.priority ? prev : current
        );
        setPrimaryRole(primary);

        // Fetch permissions for all roles
        const roleIds = roles.map(r => r.id);
        const { data: permData } = await supabase
          .from('role_permissions')
          .select(`
            permission_id,
            permissions (name)
          `)
          .in('role_id', roleIds);

        if (permData) {
          const perms = [...new Set(permData.map((p: any) => p.permissions?.name).filter(Boolean))];
          setUserPermissions(perms);
        }
      } else {
        // Assign default member role permissions
        const { data: memberRole } = await supabase
          .from('custom_roles')
          .select('*')
          .eq('name', 'member')
          .single();

        if (memberRole) {
          setPrimaryRole(memberRole as CustomRole);
          setUserRoles([memberRole as CustomRole]);

          const { data: permData } = await supabase
            .from('role_permissions')
            .select(`permissions (name)`)
            .eq('role_id', memberRole.id);

          if (permData) {
            const perms = permData.map((p: any) => p.permissions?.name).filter(Boolean);
            setUserPermissions(perms);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchUserPermissions();
  }, [fetchUserPermissions]);

  const hasPermission = useCallback((permissionName: string): boolean => {
    return userPermissions.includes(permissionName);
  }, [userPermissions]);

  const hasAnyPermission = useCallback((permissionNames: string[]): boolean => {
    return permissionNames.some(p => userPermissions.includes(p));
  }, [userPermissions]);

  const canAccessAdminPanel = useCallback((): boolean => {
    return hasPermission('access_admin_panel');
  }, [hasPermission]);

  const isStaff = useCallback((): boolean => {
    return userRoles.some(r => r.is_staff);
  }, [userRoles]);

  return {
    userRoles,
    userPermissions,
    primaryRole,
    loading,
    hasPermission,
    hasAnyPermission,
    canAccessAdminPanel,
    isStaff,
    refetch: fetchUserPermissions,
  };
};
