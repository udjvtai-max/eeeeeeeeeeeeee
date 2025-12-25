import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { sanitizeHtml } from '@/lib/sanitize';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  is_locked: boolean;
  user_id: string;
  category_id: string;
  profiles: { display_name: string | null; avatar_url: string | null } | null;
  forum_categories: { name: string; slug: string } | null;
}

interface Reply {
  id: string;
  content: string;
  created_at: string;
  is_admin_reply: boolean;
  user_id: string;
  profiles: { display_name: string | null; avatar_url: string | null } | null;
}

const ForumPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user, isSupport } = useAuth();

  const fetchPost = async () => {
    const { data: postData } = await supabase
      .from('forum_posts')
      .select(`
        *,
        profiles!forum_posts_user_id_profiles_fkey(display_name, avatar_url),
        forum_categories(name, slug)
      `)
      .eq('id', id)
      .maybeSingle();

    if (postData) {
      setPost(postData as unknown as Post);

      // Increment view count
      await supabase
        .from('forum_posts')
        .update({ view_count: (postData.view_count || 0) + 1 })
        .eq('id', id);
    }

    const { data: repliesData } = await supabase
      .from('forum_replies')
      .select(`
        *,
        profiles!forum_replies_user_id_profiles_fkey(display_name, avatar_url)
      `)
      .eq('post_id', id)
      .order('created_at');

    if (repliesData) {
      setReplies(repliesData as unknown as Reply[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newReply.trim()) return;

    setSubmitting(true);

    const { error } = await supabase.from('forum_replies').insert({
      post_id: id,
      user_id: user.id,
      content: newReply,
      is_admin_reply: isSupport,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to post reply',
        variant: 'destructive',
      });
    } else {
      // Create notification for post owner if admin reply
      if (isSupport && post && post.user_id !== user.id) {
        await supabase.from('notifications').insert({
          user_id: post.user_id,
          title: 'Admin Reply',
          message: `An admin replied to your post: "${post.title}"`,
          type: 'admin_reply',
          post_id: id,
        });
      }

      toast({ title: 'Reply posted!' });
      setNewReply('');
      fetchPost();
    }

    setSubmitting(false);
  };

  const handleDeletePost = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const { error } = await supabase.from('forum_posts').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Post deleted' });
      navigate('/forum');
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    if (!confirm('Are you sure you want to delete this reply?')) return;

    const { error } = await supabase.from('forum_replies').delete().eq('id', replyId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete reply',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Reply deleted' });
      fetchPost();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-pixel text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl font-heading">Post not found</h1>
            <Link to="/forum" className="text-primary font-pixel text-sm mt-4 inline-block">
              ← Back to Forum
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canEdit = user && (user.id === post.user_id || isSupport);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              to={`/forum/category/${post.forum_categories?.slug || 'support'}`}
              className="text-primary font-pixel text-sm hover:underline"
            >
              ← Back to {post.forum_categories?.name || 'Forum'}
            </Link>
          </div>

          {/* Post */}
          <article className="bg-card border-2 border-border p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-muted border-2 border-border flex items-center justify-center text-xl shrink-0">
                {post.profiles?.avatar_url ? (
                  <img
                    src={post.profiles.avatar_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  '👤'
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-heading mb-2">{post.title}</h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-pixel mb-4">
                  <span>{post.profiles?.display_name || 'Anonymous'}</span>
                  <span>•</span>
                  <span>{new Date(post.created_at).toLocaleString()}</span>
                  <span>•</span>
                  <span>👁 {post.view_count}</span>
                </div>
                <div
                  className="font-pixel text-sm prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                />
                {canEdit && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <Link to={`/forum/edit/${post.id}`}>
                      <Button variant="outline" size="sm" className="font-pixel text-xs">
                        ✏️ Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-pixel text-xs text-destructive"
                      onClick={handleDeletePost}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Replies */}
          <h2 className="font-heading text-base mb-4">
            Replies ({replies.length})
          </h2>
          <div className="space-y-4 mb-8">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className={`bg-card border-2 p-4 ${
                  reply.is_admin_reply ? 'border-primary' : 'border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-muted border-2 border-border flex items-center justify-center text-lg shrink-0">
                    {reply.profiles?.avatar_url ? (
                      <img
                        src={reply.profiles.avatar_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      '👤'
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-pixel mb-2">
                      <span className={reply.is_admin_reply ? 'text-primary font-bold' : ''}>
                        {reply.profiles?.display_name || 'Anonymous'}
                        {reply.is_admin_reply && ' [STAFF]'}
                      </span>
                      <span>•</span>
                      <span>{new Date(reply.created_at).toLocaleString()}</span>
                    </div>
                    <div
                      className="font-pixel text-sm"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(reply.content) }}
                    />
                    {user && (user.id === reply.user_id || isSupport) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-pixel text-xs text-destructive mt-2"
                        onClick={() => handleDeleteReply(reply.id)}
                      >
                        🗑️ Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          {post.is_locked ? (
            <div className="bg-muted border-2 border-border p-4 text-center">
              <p className="font-pixel text-sm text-muted-foreground">
                🔒 This post is locked and cannot receive new replies
              </p>
            </div>
          ) : user ? (
            <form onSubmit={handleSubmitReply} className="bg-card border-2 border-border p-4">
              <h3 className="font-heading text-sm mb-3">Post a Reply</h3>
              <Textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write your reply..."
                className="bg-background border-2 border-border font-pixel text-sm min-h-[100px] mb-3"
                required
              />
              <Button
                type="submit"
                disabled={submitting}
                className="font-heading text-xs border-2 border-primary"
              >
                {submitting ? 'Posting...' : 'Post Reply'}
              </Button>
            </form>
          ) : (
            <div className="bg-muted border-2 border-border p-4 text-center">
              <p className="font-pixel text-sm text-muted-foreground">
                <Link to="/auth" className="text-primary hover:underline">
                  Sign in
                </Link>{' '}
                to reply to this post
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForumPost;
