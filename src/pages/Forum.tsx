import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import NotificationBell from '@/components/forum/NotificationBell';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string | null;
  post_count?: number;
}

interface RecentPost {
  id: string;
  title: string;
  created_at: string;
  category_id: string;
  profiles: { display_name: string | null } | null;
}

const Forum = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isSupport } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data: cats } = await supabase
        .from('forum_categories')
        .select('*')
        .order('sort_order');

      if (cats) {
        const catsWithCounts = await Promise.all(
          cats.map(async (cat) => {
            const { count } = await supabase
              .from('forum_posts')
              .select('*', { count: 'exact', head: true })
              .eq('category_id', cat.id);
            return { ...cat, post_count: count || 0 };
          })
        );
        setCategories(catsWithCounts);
      }

      const { data: posts } = await supabase
        .from('forum_posts')
        .select(`
          id,
          title,
          created_at,
          category_id,
          profiles!forum_posts_user_id_profiles_fkey(display_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (posts) {
        setRecentPosts(posts as unknown as RecentPost[]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-heading mb-2">
                SenX <span className="text-primary">Support</span>
              </h1>
              <p className="text-muted-foreground font-pixel text-sm">
                Get help, ask questions, and connect with the community
              </p>
            </div>
            <div className="flex items-center gap-4">
              {user && <NotificationBell />}
              {isSupport && (
                <Link to="/admin">
                  <Button variant="outline" className="font-pixel text-sm border-2 border-primary text-primary">
                    ⚙️ Admin
                  </Button>
                </Link>
              )}
              {user ? (
                <Link to="/forum/new">
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
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="font-pixel text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h2 className="font-heading text-lg mb-4">Categories</h2>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/forum/category/${category.slug}`}
                    className="block bg-card border-2 border-border p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{category.icon || '📁'}</span>
                      <div className="flex-1">
                        <h3 className="font-heading text-base text-primary">{category.name}</h3>
                        <p className="text-muted-foreground font-pixel text-sm mt-1">
                          {category.description}
                        </p>
                        <p className="text-xs font-pixel text-muted-foreground mt-2">
                          {category.post_count} posts
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div>
                <h2 className="font-heading text-lg mb-4">Recent Posts</h2>
                <div className="bg-card border-2 border-border p-4 space-y-4">
                  {recentPosts.length === 0 ? (
                    <p className="text-muted-foreground font-pixel text-sm">No posts yet</p>
                  ) : (
                    recentPosts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/forum/post/${post.id}`}
                        className="block hover:text-primary transition-colors"
                      >
                        <h4 className="font-pixel text-sm truncate">{post.title}</h4>
                        <p className="text-xs text-muted-foreground font-pixel mt-1">
                          by {post.profiles?.display_name || 'Anonymous'} •{' '}
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
