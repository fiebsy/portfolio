'use client';

import { cn } from '@/lib/utils';
import type { Transition } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface ChevronRightIconHandle {
  startAnimation: () => void;
  completeAnimation: () => void;
  resetAnimation: () => void;
}

interface ChevronRightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const defaultTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
};

const ChevronRightIcon = forwardRef<ChevronRightIconHandle, ChevronRightIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start({ x: 2 }),
        completeAnimation: () => controls.start({ x: 0 }),
        resetAnimation: () => controls.start({ x: 0 }),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start({ x: 2 });
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start({ x: 0 });
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(
          `cursor-pointer select-none p-2  rounded-md transition-colors duration-200 flex items-center justify-center`,
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            initial={{ x: 0 }}
            transition={defaultTransition}
            animate={controls}
            d="m9 18 6-6-6-6"
          />
        </svg>
      </div>
    );
  }
);

ChevronRightIcon.displayName = 'ChevronRightIcon';

export { ChevronRightIcon };
