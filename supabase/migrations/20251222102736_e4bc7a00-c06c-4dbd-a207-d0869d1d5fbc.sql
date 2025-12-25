-- Drop the overly permissive insert policy
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- Create a more restrictive policy - only service role or trigger can insert
-- Since the notify_on_reply trigger uses SECURITY DEFINER, it will still work
CREATE POLICY "Only authenticated users via triggers can create notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (
  -- Allow inserts only if the user is staff/admin (for manual notifications)
  is_admin_or_support(auth.uid())
);