import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  view_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  profiles: { display_name: string | null; avatar_url: string | null } | null;
  reply_count?: number;
}

const ForumCategory = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data: cat } = await supabase
        .from('forum_categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (cat) {
        setCategory(cat);

        const { data: postsList } = await supabase
          .from('forum_posts')
          .select(`
            id,
            title,
            content,
            created_at,
            view_count,
            is_pinned,
            is_locked,
            profiles!forum_posts_user_id_profiles_fkey(display_name, avatar_url)
          `)
          .eq('category_id', cat.id)
          .order('is_pinned', { ascending: false })
          .order('created_at', { ascending: false });

        if (postsList) {
          const postsWithReplies = await Promise.all(
            (postsList as unknown as Post[]).map(async (post) => {
              const { count } = await supabase
                .from('forum_replies')
                .select('*', { count: 'exact', head: true })
                .eq('post_id', post.id);
              return { ...post, reply_count: count || 0 };
            })
          );
          setPosts(postsWithReplies);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="font-pixel text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-xl font-heading">Category not found</h1>
            <Link to="/forum" className="text-primary font-pixel text-sm mt-4 inline-block">
              ← Back to Forum
            </Link>
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
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link to="/forum" className="text-primary font-pixel text-sm hover:underline">
              ← Back to Forum
            </Link>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{category.icon || '📁'}</span>
              <div>
                <h1 className="text-xl font-heading">{category.name}</h1>
                <p className="text-muted-foreground font-pixel text-sm">{category.description}</p>
              </div>
            </div>
            {user ? (
              <Link to={`/forum/new?category=${slug}`}>
                <Button className="font-heading text-xs border-2 border-primary">
                  + New Post
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="font-heading text-xs border-2 border-primary">
                  Sign In to Post
                </Button>
              </Link>
            )}
          </div>

          <div className="space-y-3">
            {posts.length === 0 ? (
              <div className="bg-card border-2 border-border p-8 text-center">
                <p className="text-muted-foreground font-pixel">No posts in this category yet</p>
              </div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/forum/post/${post.id}`}
                  className="block bg-card border-2 border-border p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-muted border-2 border-border flex items-center justify-center text-lg">
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
                      <div className="flex items-center gap-2">
                        {post.is_pinned && <span className="text-xs">📌</span>}
                        {post.is_locked && <span className="text-xs">🔒</span>}
                        <h3 className="font-pixel text-base truncate">{post.title}</h3>
                      </div>
                      <p className="text-muted-foreground font-pixel text-xs mt-1 line-clamp-1">
                        {post.content.replace(/<[^>]*>/g, '').slice(0, 100)}...
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-pixel">
                        <span>{post.profiles?.display_name || 'Anonymous'}</span>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>👁 {post.view_count}</span>
                        <span>•</span>
                        <span>💬 {post.reply_count}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForumCategory;
