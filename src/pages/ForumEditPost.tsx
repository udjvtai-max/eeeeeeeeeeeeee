import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import ForumEditor from '@/components/forum/ForumEditor';

const ForumEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user, isSupport } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchPost = async () => {
      const { data } = await supabase
        .from('forum_posts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (data) {
        if (data.user_id !== user.id && !isSupport) {
          toast({
            title: 'Access Denied',
            description: 'You can only edit your own posts',
            variant: 'destructive',
          });
          navigate('/forum');
          return;
        }
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, user, navigate, isSupport]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);

    const { error } = await supabase
      .from('forum_posts')
      .update({
        title: title.trim(),
        content: content,
      })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Post updated!' });
      navigate(`/forum/post/${id}`);
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-pixel text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to={`/forum/post/${id}`} className="text-primary font-pixel text-sm hover:underline">
              ← Back to Post
            </Link>
          </div>

          <h1 className="text-xl font-heading mb-6">Edit Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-pixel text-muted-foreground mb-2">
                Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background border-2 border-border font-pixel"
                maxLength={200}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-pixel text-muted-foreground mb-2">
                Content
              </label>
              <ForumEditor content={content} onChange={setContent} />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={saving}
                className="font-heading text-xs border-2 border-primary"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/forum/post/${id}`)}
                className="font-pixel text-sm border-2 border-border"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForumEditPost;
