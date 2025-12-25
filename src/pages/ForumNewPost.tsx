import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import ForumEditor from '@/components/forum/ForumEditor';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const ForumNewPost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchCategories = async () => {
      const { data } = await supabase
        .from('forum_categories')
        .select('id, name, slug')
        .order('sort_order');

      if (data) {
        setCategories(data);
        const catSlug = searchParams.get('category');
        const matchingCat = data.find((c) => c.slug === catSlug);
        if (matchingCat) {
          setSelectedCategory(matchingCat.id);
        } else if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      }
    };

    fetchCategories();
  }, [user, navigate, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !content.trim() || !selectedCategory) return;

    setLoading(true);

    const { data, error } = await supabase
      .from('forum_posts')
      .insert({
        category_id: selectedCategory,
        user_id: user.id,
        title: title.trim(),
        content: content,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      });
    } else {
      toast({ title: 'Post created!' });
      navigate(`/forum/post/${data.id}`);
    }

    setLoading(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/forum" className="text-primary font-pixel text-sm hover:underline">
              ← Back to Forum
            </Link>
          </div>

          <h1 className="text-xl font-heading mb-6">Create New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-pixel text-muted-foreground mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-background border-2 border-border p-3 font-pixel text-sm focus:border-primary outline-none"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-pixel text-muted-foreground mb-2">
                Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your post about?"
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
                disabled={loading}
                className="font-heading text-xs border-2 border-primary"
              >
                {loading ? 'Creating...' : 'Create Post'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/forum')}
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

export default ForumNewPost;
