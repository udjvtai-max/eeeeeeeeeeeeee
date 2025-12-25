-- Create custom roles table with display properties
CREATE TABLE public.custom_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  color text NOT NULL DEFAULT '#6b7280',
  badge_text text,
  priority integer NOT NULL DEFAULT 0,
  is_staff boolean NOT NULL DEFAULT false,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create permissions table
CREATE TABLE public.permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'general',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create role_permissions junction table
CREATE TABLE public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES public.custom_roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(role_id, permission_id)
);

-- Create user_custom_roles junction table
CREATE TABLE public.user_custom_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role_id uuid NOT NULL REFERENCES public.custom_roles(id) ON DELETE CASCADE,
  assigned_by uuid,
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, role_id)
);

-- Create category_permissions for category-level access control
CREATE TABLE public.category_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES public.custom_roles(id) ON DELETE CASCADE,
  can_view boolean NOT NULL DEFAULT true,
  can_create_thread boolean NOT NULL DEFAULT true,
  can_reply boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(category_id, role_id)
);

-- Create moderation_logs for audit trail
CREATE TABLE public.moderation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid NOT NULL,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id uuid NOT NULL,
  details jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.custom_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_custom_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for custom_roles
CREATE POLICY "Anyone can view roles" ON public.custom_roles FOR SELECT USING (true);
CREATE POLICY "Admins can manage roles" ON public.custom_roles FOR ALL USING (is_admin_or_support(auth.uid()));

-- RLS Policies for permissions
CREATE POLICY "Anyone can view permissions" ON public.permissions FOR SELECT USING (true);
CREATE POLICY "Admins can manage permissions" ON public.permissions FOR ALL USING (is_admin_or_support(auth.uid()));

-- RLS Policies for role_permissions
CREATE POLICY "Anyone can view role permissions" ON public.role_permissions FOR SELECT USING (true);
CREATE POLICY "Admins can manage role permissions" ON public.role_permissions FOR ALL USING (is_admin_or_support(auth.uid()));

-- RLS Policies for user_custom_roles
CREATE POLICY "Anyone can view user roles" ON public.user_custom_roles FOR SELECT USING (true);
CREATE POLICY "Admins can manage user roles" ON public.user_custom_roles FOR ALL USING (is_admin_or_support(auth.uid()));

-- RLS Policies for category_permissions
CREATE POLICY "Anyone can view category permissions" ON public.category_permissions FOR SELECT USING (true);
CREATE POLICY "Admins can manage category permissions" ON public.category_permissions FOR ALL USING (is_admin_or_support(auth.uid()));

-- RLS Policies for moderation_logs
CREATE POLICY "Staff can view logs" ON public.moderation_logs FOR SELECT USING (is_admin_or_support(auth.uid()));
CREATE POLICY "Staff can create logs" ON public.moderation_logs FOR INSERT WITH CHECK (is_admin_or_support(auth.uid()));

-- Function to check if user has a specific permission
CREATE OR REPLACE FUNCTION public.user_has_permission(_user_id uuid, _permission_name text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_custom_roles ucr
    JOIN public.role_permissions rp ON rp.role_id = ucr.role_id
    JOIN public.permissions p ON p.id = rp.permission_id
    WHERE ucr.user_id = _user_id AND p.name = _permission_name
  )
$$;

-- Function to get user's highest priority role
CREATE OR REPLACE FUNCTION public.get_user_primary_role(_user_id uuid)
RETURNS TABLE(role_id uuid, name text, display_name text, color text, badge_text text, is_staff boolean)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT cr.id, cr.name, cr.display_name, cr.color, cr.badge_text, cr.is_staff
  FROM public.user_custom_roles ucr
  JOIN public.custom_roles cr ON cr.id = ucr.role_id
  WHERE ucr.user_id = _user_id
  ORDER BY cr.priority DESC
  LIMIT 1
$$;

-- Insert default roles
INSERT INTO public.custom_roles (name, display_name, color, badge_text, priority, is_staff, is_system) VALUES
  ('owner', 'Owner', '#ef4444', 'OWNER', 100, true, true),
  ('administrator', 'Administrator', '#f97316', 'ADMIN', 90, true, true),
  ('moderator', 'Moderator', '#22c55e', 'MOD', 70, true, true),
  ('support', 'Support', '#3b82f6', 'SUPPORT', 60, true, true),
  ('verified_customer', 'Verified Customer', '#8b5cf6', 'VERIFIED', 30, false, true),
  ('member', 'Member', '#6b7280', NULL, 10, false, true),
  ('guest', 'Guest', '#9ca3af', NULL, 0, false, true);

-- Insert default permissions
INSERT INTO public.permissions (name, display_name, description, category) VALUES
  ('view_forum', 'View Forum', 'Can view forum categories and threads', 'forum'),
  ('create_thread', 'Create Thread', 'Can create new forum threads', 'forum'),
  ('reply_thread', 'Reply to Thread', 'Can reply to existing threads', 'forum'),
  ('edit_own_post', 'Edit Own Posts', 'Can edit their own posts and replies', 'forum'),
  ('edit_any_post', 'Edit Any Post', 'Can edit any post or reply', 'moderation'),
  ('delete_own_post', 'Delete Own Posts', 'Can delete their own posts', 'forum'),
  ('delete_any_post', 'Delete Any Post', 'Can delete any post or reply', 'moderation'),
  ('lock_thread', 'Lock Thread', 'Can lock/unlock threads', 'moderation'),
  ('pin_thread', 'Pin Thread', 'Can pin/unpin threads', 'moderation'),
  ('mark_thread_solved', 'Mark Solved', 'Can mark threads as solved', 'moderation'),
  ('manage_roles', 'Manage Roles', 'Can create, edit, and delete roles', 'admin'),
  ('manage_permissions', 'Manage Permissions', 'Can assign permissions to roles', 'admin'),
  ('assign_roles', 'Assign Roles', 'Can assign roles to users', 'admin'),
  ('manage_categories', 'Manage Categories', 'Can create, edit, and delete categories', 'admin'),
  ('view_logs', 'View Logs', 'Can view moderation and audit logs', 'admin'),
  ('access_admin_panel', 'Access Admin Panel', 'Can access the admin control panel', 'admin');

-- Assign permissions to default roles
-- Owner gets all permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM public.custom_roles WHERE name = 'owner'),
  id
FROM public.permissions;

-- Administrator gets most permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM public.custom_roles WHERE name = 'administrator'),
  id
FROM public.permissions
WHERE name NOT IN ('manage_roles');

-- Moderator permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM public.custom_roles WHERE name = 'moderator'),
  id
FROM public.permissions
WHERE name IN ('view_forum', 'create_thread', 'reply_thread', 'edit_own_post', 'edit_any_post', 'delete_own_post', 'delete_any_post', 'lock_thread', 'pin_thread', 'mark_thread_solved', 'view_logs', 'access_admin_panel');

-- Support permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM public.custom_roles WHERE name = 'support'),
  id
FROM public.permissions
WHERE name IN ('view_forum', 'create_thread', 'reply_thread', 'edit_own_post', 'lock_thread', 'mark_thread_solved', 'access_admin_panel');

-- Verified Customer permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM public.custom_roles WHERE name = 'verified_customer'),
  id
FROM public.permissions
WHERE name IN ('view_forum', 'create_thread', 'reply_thread', 'edit_own_post', 'delete_own_post');

-- Member permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM public.custom_roles WHERE name = 'member'),
  id
FROM public.permissions
WHERE name IN ('view_forum', 'create_thread', 'reply_thread', 'edit_own_post');

-- Guest permissions
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM public.custom_roles WHERE name = 'guest'),
  id
FROM public.permissions
WHERE name IN ('view_forum');

-- Add is_solved column to forum_posts if not exists
ALTER TABLE public.forum_posts ADD COLUMN IF NOT EXISTS is_solved boolean DEFAULT false;

-- Create trigger for updated_at on custom_roles
CREATE TRIGGER update_custom_roles_updated_at
  BEFORE UPDATE ON public.custom_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();