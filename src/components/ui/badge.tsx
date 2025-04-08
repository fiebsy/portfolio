'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the Lottie Player with no SSR
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

type IconType = LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;

interface BadgeProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'surface';
  leftIcon?: IconType | string;  // Can be Lucide icon, custom SVG component, or Lottie URL
  rightIcon?: IconType | string;
  iconOnly?: boolean;
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const sizeClasses = {
  sm: 'text-xs gap-1',
  md: 'text-sm gap-1.5',
  lg: 'text-base gap-2'
};

const variantPadding = {
  sm: 'px-2 py-0.5',
  md: 'px-2 py-2',
  lg: 'px-4 py-1.5'
};

const variantClasses = (size: BadgeProps['size'] = 'md') => ({
  default: `${variantPadding[size]} bg-gray-16 text-gray-5 border border-gray-14`,
  outline: `${variantPadding[size]} border border-gray-14 text-gray-9`,
  surface: 'text-gray-5'
});

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
};

// Map badge size to Tailwind size classes
const iconSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5'
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({
  children,
  size = 'md',
  variant = 'default',
  leftIcon,
  rightIcon,
  iconOnly,
  rounded = 'full',
  className = '',
  ...props
}, ref) => {
  const renderIcon = (icon: IconType | string | undefined, position: 'left' | 'right') => {
    if (!icon) return null;

    // Handle Lottie animation
    if (typeof icon === 'string' && icon.includes('.json')) {
      return (
        <Player
          src={icon}
          className={`inline-block ${iconSizeClasses[size]}`}
          autoplay
          loop
        />
      );
    }

    // Handle Lucide or custom SVG icons
    if (typeof icon !== 'string') {
      const IconComponent = icon;
      return (
        <div className={`flex items-center justify-center ${iconSizeClasses[size]} ${iconOnly ? '' : position === 'left' ? 'mr-1' : 'ml-1'}`}>
          <IconComponent className="w-full h-full" />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      ref={ref}
      className={`
        inline-flex items-center justify-center
        ${roundedClasses[rounded]}
        ${sizeClasses[size]}
        ${variantClasses(size)[variant]}
        ${iconOnly ? 'p-1' : ''}
        ${className}
      `}
      {...props}
    >
      {renderIcon(leftIcon, 'left')}
      {!iconOnly && children}
      {renderIcon(rightIcon, 'right')}
    </div>
  );
});

Badge.displayName = 'Badge';

export default Badge;
