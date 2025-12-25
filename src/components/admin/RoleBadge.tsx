import { cn } from '@/lib/utils';

interface RoleBadgeProps {
  displayName: string;
  color: string;
  badgeText?: string | null;
  size?: 'sm' | 'md';
  className?: string;
}

export const RoleBadge = ({ 
  displayName, 
  color, 
  badgeText, 
  size = 'sm',
  className 
}: RoleBadgeProps) => {
  const text = badgeText || displayName;
  
  return (
    <span
      className={cn(
        "inline-flex items-center font-heading uppercase tracking-wider border",
        size === 'sm' ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs",
        className
      )}
      style={{ 
        backgroundColor: `${color}20`,
        borderColor: color,
        color: color 
      }}
    >
      {text}
    </span>
  );
};
