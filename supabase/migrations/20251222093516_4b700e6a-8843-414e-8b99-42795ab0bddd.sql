-- Create a function to notify post author when someone replies
CREATE OR REPLACE FUNCTION public.notify_on_reply()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  post_author_id uuid;
  post_title text;
  parent_reply_author_id uuid;
  replier_name text;
BEGIN
  -- Get the post author and title
  SELECT user_id, title INTO post_author_id, post_title
  FROM public.forum_posts
  WHERE id = NEW.post_id;
  
  -- Get the replier's display name
  SELECT display_name INTO replier_name
  FROM public.profiles
  WHERE user_id = NEW.user_id;
  
  -- If replier has no display name, use a default
  IF replier_name IS NULL THEN
    replier_name := 'Someone';
  END IF;
  
  -- Notify post author if the reply is not from themselves
  IF post_author_id IS NOT NULL AND post_author_id != NEW.user_id THEN
    INSERT INTO public.notifications (user_id, title, message, post_id, type)
    VALUES (
      post_author_id,
      'New reply on your post',
      replier_name || ' replied to "' || LEFT(post_title, 50) || '"',
      NEW.post_id,
      'reply'
    );
  END IF;
  
  -- If this is a nested reply, notify the parent reply author
  IF NEW.parent_reply_id IS NOT NULL THEN
    SELECT user_id INTO parent_reply_author_id
    FROM public.forum_replies
    WHERE id = NEW.parent_reply_id;
    
    -- Notify parent reply author if different from current replier and post author
    IF parent_reply_author_id IS NOT NULL 
       AND parent_reply_author_id != NEW.user_id 
       AND parent_reply_author_id != post_author_id THEN
      INSERT INTO public.notifications (user_id, title, message, post_id, type)
      VALUES (
        parent_reply_author_id,
        'New reply to your comment',
        replier_name || ' replied to your comment',
        NEW.post_id,
        'reply'
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create the trigger on forum_replies
DROP TRIGGER IF EXISTS on_forum_reply_created ON public.forum_replies;
CREATE TRIGGER on_forum_reply_created
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_reply();