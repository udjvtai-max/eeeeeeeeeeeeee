import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Search, Pin, Lock, Check, ExternalLink } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  created_at: string;
  is_pinned: boolean;
  is_locked: boolean;
  is_solved: boolean;
  view_count: number;
  profiles: { display_name: string | null } | null;
  forum_categories: { name: string } | null;
}

const ModerationManagement = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('forum_posts')
      .select(`
        id, title, created_at, is_pinned, is_locked, is_solved, view_count,
        profiles!forum_posts_user_id_profiles_fkey(display_name),
        forum_categories(name)
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (data) setPosts(data as unknown as Post[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const togglePost = async (postId: string, field: 'is_pinned' | 'is_locked' | 'is_solved', currentValue: boolean) => {
    const { error } = await supabase
      .from('forum_posts')
      .update({ [field]: !currentValue })
      .eq('id', postId);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, [field]: !currentValue } : p
      ));

      await supabase.from('moderation_logs').insert({
        actor_id: user!.id,
        action: `${!currentValue ? 'Set' : 'Unset'} ${field.replace('is_', '')}`,
        target_type: 'post',
        target_id: postId,
      });

      toast({ title: 'Post updated' });
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading">Thread Moderation</h1>
          <p className="text-muted-foreground text-sm">Pin, lock, and mark threads as solved</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search threads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading threads...</p>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {post.is_pinned && <Badge variant="secondary" className="text-xs">📌 Pinned</Badge>}
                        {post.is_locked && <Badge variant="secondary" className="text-xs">🔒 Locked</Badge>}
                        {post.is_solved && <Badge className="bg-green-600 text-xs">✓ Solved</Badge>}
                      </div>
                      <h3 className="font-medium truncate">{post.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        By {post.profiles?.display_name || 'Anonymous'} • 
                        {post.forum_categories?.name} • 
                        {new Date(post.created_at).toLocaleDateString()} • 
                        👁 {post.view_count}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant={post.is_pinned ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePost(post.id, 'is_pinned', post.is_pinned)}
                        title="Toggle Pin"
                      >
                        <Pin className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={post.is_locked ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePost(post.id, 'is_locked', post.is_locked)}
                        title="Toggle Lock"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={post.is_solved ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePost(post.id, 'is_solved', post.is_solved)}
                        className={post.is_solved ? "bg-green-600 hover:bg-green-700" : ""}
                        title="Toggle Solved"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Link to={`/forum/post/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ModerationManagement;
