import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  post_id: string | null;
  created_at: string;
}

const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.is_read).length);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Subscribe to realtime notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          const newNotif = payload.new as Notification;
          setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
          setUnreadCount((prev) => prev + 1);

          // Request browser notification permission and show notification
          if (Notification.permission === 'granted') {
            new Notification(newNotif.title, {
              body: newNotif.message,
              icon: '/favicon.ico',
            });
          }
        }
      )
      .subscribe();

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAsRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    fetchNotifications();
  };

  const markAllAsRead = async () => {
    if (!user) return;
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
    fetchNotifications();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative font-pixel text-lg p-2">
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center font-pixel">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 bg-card border-2 border-border p-0"
        align="end"
      >
        <div className="flex items-center justify-between p-3 border-b-2 border-border">
          <h3 className="font-heading text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="font-pixel text-xs text-primary"
            >
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-muted-foreground font-pixel text-sm">
              No notifications
            </p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 border-b border-border last:border-0 ${
                  !notif.is_read ? 'bg-primary/5' : ''
                }`}
              >
                {notif.post_id ? (
                  <Link
                    to={`/forum/post/${notif.post_id}`}
                    onClick={() => {
                      markAsRead(notif.id);
                      setOpen(false);
                    }}
                    className="block hover:text-primary"
                  >
                    <h4 className="font-pixel text-sm font-bold">{notif.title}</h4>
                    <p className="font-pixel text-xs text-muted-foreground mt-1">
                      {notif.message}
                    </p>
                    <p className="font-pixel text-xs text-muted-foreground mt-1">
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                  </Link>
                ) : (
                  <div onClick={() => markAsRead(notif.id)} className="cursor-pointer">
                    <h4 className="font-pixel text-sm font-bold">{notif.title}</h4>
                    <p className="font-pixel text-xs text-muted-foreground mt-1">
                      {notif.message}
                    </p>
                    <p className="font-pixel text-xs text-muted-foreground mt-1">
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
