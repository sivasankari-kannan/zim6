import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          {
            'bg-gray-100 text-gray-800': variant === 'default',
            'bg-primary-100 text-primary-800': variant === 'primary',
            'bg-secondary-100 text-secondary-800': variant === 'secondary',
            'bg-accent-100 text-accent-800': variant === 'accent',
            'bg-green-100 text-green-800': variant === 'success',
            'bg-amber-100 text-amber-800': variant === 'warning',
            'bg-red-100 text-red-800': variant === 'danger',
            
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-0.5 text-sm': size === 'md',
            'px-3 py-1 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;