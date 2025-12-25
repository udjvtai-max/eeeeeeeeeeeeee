import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  Key, 
  FolderOpen, 
  FileText, 
  Settings,
  LayoutDashboard,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/roles', icon: Shield, label: 'Roles' },
  { path: '/admin/permissions', icon: Key, label: 'Permissions' },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { path: '/admin/moderation', icon: FileText, label: 'Moderation' },
  { path: '/admin/logs', icon: Settings, label: 'Audit Logs' },
];

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
      <div className="mb-6">
        <Link 
          to="/forum" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Forum
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-heading text-primary">Admin Panel</h2>
        <p className="text-xs text-muted-foreground">Senx Cloud Management</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary border-l-2 border-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
