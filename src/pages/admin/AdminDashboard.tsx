import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, MessageSquare, Shield, FileText } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalPosts: number;
  totalReplies: number;
  totalRoles: number;
  recentLogs: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalPosts: 0,
    totalReplies: 0,
    totalRoles: 0,
    recentLogs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [usersRes, postsRes, repliesRes, rolesRes, logsRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('forum_posts').select('id', { count: 'exact', head: true }),
        supabase.from('forum_replies').select('id', { count: 'exact', head: true }),
        supabase.from('custom_roles').select('id', { count: 'exact', head: true }),
        supabase.from('moderation_logs').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        totalPosts: postsRes.count || 0,
        totalReplies: repliesRes.count || 0,
        totalRoles: rolesRes.count || 0,
        recentLogs: logsRes.data || [],
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500' },
    { title: 'Forum Posts', value: stats.totalPosts, icon: MessageSquare, color: 'text-green-500' },
    { title: 'Total Replies', value: stats.totalReplies, icon: FileText, color: 'text-yellow-500' },
    { title: 'Custom Roles', value: stats.totalRoles, icon: Shield, color: 'text-purple-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Overview of your forum statistics</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading statistics...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statCards.map((stat) => (
                <Card key={stat.title} className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-heading">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base font-heading">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentLogs.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No recent activity</p>
                ) : (
                  <div className="space-y-3">
                    {stats.recentLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm">{log.action}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.target_type} • {new Date(log.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
