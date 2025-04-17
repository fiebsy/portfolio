'use client';

import { LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';
import SimpleSquircle from './simple-squircle';

// Dynamically import the Lottie Player with no SSR
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), {
  ssr: false,
});

type IconType = LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;

export interface SquircleBadgeProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'surface';
  leftIcon?: IconType | string; // Can be Lucide icon, custom SVG component, or Lottie URL
  rightIcon?: IconType | string;
  iconOnly?: boolean;
  className?: string;
  url?: string;
  roundnessLevel?: 1 | 2 | 3 | 4;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const sizeClasses = {
  sm: 'text-xs font-semibold',
  md: 'text-sm font-semibold',
  lg: 'text-base font-semibold',
};

const sizePadding = {
  sm: '6px 16px 6px 10px',
  md: '8px 18px 8px 12px',
  lg: '10px 22px 10px 16px',
};

const variantStyles = {
  default: {
    bg: 'bg-gray-2',
    text: 'text-gray-13',
    border: 1,
    borderColor: '#e9e9e9', // gray-3
    hoverEffect: false,
  },
  outline: {
    bg: 'bg-gray-2',
    text: 'text-gray-13 hover:text-gray-16',
    border: 1,
    borderColor: '#e9e9e9', // gray-3
    hoverEffect: 'hover:bg-[#FFF4EB] hover:border-[#FFD0AD] transition-all duration-200', // Fuego color
  },
  surface: {
    bg: 'bg-gray-5',
    text: 'text-gray-13',
    border: 0,
    borderColor: 'transparent',
    hoverEffect: false,
  },
};

// Map badge size to Tailwind size classes
const iconSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const SquircleBadge = React.forwardRef<HTMLDivElement, SquircleBadgeProps>(
  (
    {
      children,
      size = 'md',
      variant = 'default',
      leftIcon,
      rightIcon,
      iconOnly = false,
      className = '',
      url,
      roundnessLevel = 3,
      onClick,
      ...props
    },
    ref
  ) => {
    const variantStyle = variantStyles[variant];

    const renderIcon = (icon: IconType | string | undefined, position: 'left' | 'right') => {
      if (!icon) return null;

      // Handle Lottie animation
      if (typeof icon === 'string' && icon.includes('.json')) {
        return (
          <div className={`flex items-center ${position === 'left' ? 'mr-2' : 'ml-2 mr-2'}`}>
            <Player src={icon} className={`inline-block ${iconSizeClasses[size]}`} autoplay loop />
          </div>
        );
      }

      // Handle Lucide or custom SVG icons
      if (typeof icon !== 'string') {
        const IconComponent = icon;
        return (
          <div
            className={`flex items-center ${iconSizeClasses[size]} ${
              position === 'left' ? 'mr-1.5' : 'ml-1.5 mr-1.5'
            }`}
          >
            <IconComponent className="w-full h-full" />
          </div>
        );
      }

      return null;
    };

    const content = (
      <div className="flex items-center justify-center gap-1.5 w-full text-center">
        {renderIcon(leftIcon, 'left')}
        {!iconOnly && <span className="inline-block">{children}</span>}
        {renderIcon(rightIcon, 'right')}
      </div>
    );

    // If URL is provided, wrap in an anchor
    const wrappedContent = url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </a>
    ) : (
      content
    );

    return (
      <SimpleSquircle
        ref={ref}
        roundnessLevel={roundnessLevel}
        className={`${variantStyle.bg} ${variantStyle.text} ${sizeClasses[size]} ${className} ${
          onClick ? 'cursor-pointer' : ''
        } ${variantStyle.hoverEffect || ''}`}
        border={variantStyle.border}
        borderColor={variantStyle.borderColor}
        padding={sizePadding[size]}
        height="auto"
        onClick={onClick}
        {...props}
      >
        {wrappedContent}
      </SimpleSquircle>
    );
  }
);

SquircleBadge.displayName = 'SquircleBadge';

export default SquircleBadge;
