import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Search, Clock } from 'lucide-react';

interface Log {
  id: string;
  actor_id: string;
  action: string;
  target_type: string;
  target_id: string;
  details: any;
  created_at: string;
  actor_profile?: { display_name: string | null };
}

const AuditLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await supabase
        .from('moderation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (data) {
        // Fetch actor profiles
        const actorIds = [...new Set(data.map(l => l.actor_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, display_name')
          .in('user_id', actorIds);

        const logsWithProfiles = data.map(log => ({
          ...log,
          actor_profile: profiles?.find(p => p.user_id === log.actor_id),
        }));

        setLogs(logsWithProfiles);
      }
      setLoading(false);
    };

    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actor_profile?.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionColor = (action: string) => {
    if (action.includes('Delete')) return 'text-red-400';
    if (action.includes('Create') || action.includes('Added')) return 'text-green-400';
    if (action.includes('Update') || action.includes('Set')) return 'text-blue-400';
    return 'text-muted-foreground';
  };

  return (
    <AdminLayout requiredPermission="view_logs">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading">Audit Logs</h1>
          <p className="text-muted-foreground text-sm">Track all moderation and role changes</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading logs...</p>
        ) : filteredLogs.length === 0 ? (
          <p className="text-muted-foreground">No logs found</p>
        ) : (
          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className={`font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        By <span className="text-foreground">{log.actor_profile?.display_name || 'Unknown'}</span>
                        {' • '}Target: {log.target_type}
                      </p>
                      {log.details && (
                        <p className="text-xs text-muted-foreground mt-1 font-mono">
                          {JSON.stringify(log.details)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {new Date(log.created_at).toLocaleString()}
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

export default AuditLogs;
