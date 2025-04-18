'use client';

import { XIcon, type XIconHandle } from './x';
import { forwardRef, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
  iconClassName?: string;
}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, size = 24, iconClassName, onClick, ...props }, ref) => {
    const xIconRef = useRef<XIconHandle>(null);

    const handleMouseEnter = () => {
      xIconRef.current?.startAnimation();
    };

    const handleMouseLeave = () => {
      xIconRef.current?.stopAnimation();
    };

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-full w-8 h-8 hover:bg-gray-4 group  flex items-center justify-center p-0 cursor-pointer backdrop-blur-2xl',
          className
        )}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <XIcon
          ref={xIconRef}
          size={size}
          className={cn('text-gray-8 hover:text-gray-16', iconClassName)}
        />
      </button>
    );
  }
);

CloseButton.displayName = 'CloseButton';

export { CloseButton };
