-- Add foreign key from forum_posts to profiles
ALTER TABLE public.forum_posts
ADD CONSTRAINT forum_posts_user_id_profiles_fkey
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;

-- Add foreign key from forum_replies to profiles
ALTER TABLE public.forum_replies
ADD CONSTRAINT forum_replies_user_id_profiles_fkey
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;