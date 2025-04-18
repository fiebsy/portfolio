'use client';

import { SimpleSquircle, SimpleSquircleProps } from './simple-squircle';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface SquircleButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  roundnessLevel?: 1 | 2 | 3 | 4;
  textClassName?: string;
  isLoading?: boolean;
  // SimpleSquircle props can be selectively exposed here
  padding?: SimpleSquircleProps['padding'];
  border?: number;
  borderColor?: SimpleSquircleProps['borderColor'];
  hoverEffect?: SimpleSquircleProps['hoverEffect'];
  hoverOpacity?: SimpleSquircleProps['hoverOpacity'];
  initialOpacity?: SimpleSquircleProps['initialOpacity'];
  hoverTransition?: SimpleSquircleProps['hoverTransition'];
}

export const SquircleButton = forwardRef<HTMLDivElement, SquircleButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      width = 'auto',
      height = 'auto',
      roundnessLevel = 1,
      padding,
      border,
      borderColor,
      textClassName = '',
      isLoading = false,
      disabled = false,
      hoverEffect = true,
      hoverOpacity = 100,
      initialOpacity = 0,
      hoverTransition = '0.2s ease',
      onClick,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ...props
    },
    ref
  ) => {
    // Set default padding based on size
    const buttonPadding =
      padding || (size === 'sm' ? '8px 12px' : size === 'md' ? '12px 16px' : '16px 24px');

    // Set variant styles
    const variantStyles = (): { className: string; border?: number; borderColor?: string } => {
      switch (variant) {
        case 'primary':
          return {
            className: 'bg-gray-15',
            border: border ?? 0,
          };
        case 'outline':
          return {
            className: 'bg-transparent',
            border: border ?? 1,
            borderColor: borderColor ?? '#b9b9b9',
          };
        case 'secondary':
          return {
            className: 'bg-gray-2',
            border: border ?? 0,
          };
        case 'ghost':
          return {
            className: 'bg-transparent',
            border: 0,
          };
        default:
          return {
            className: 'bg-gray-15',
            border: border ?? 0,
          };
      }
    };

    const { className: variantClassName, ...variantProps } = variantStyles();

    // Set text color based on variant
    const textColorClass =
      variant === 'primary'
        ? 'text-white'
        : variant === 'secondary'
          ? 'text-gray-12'
          : 'text-gray-12';

    // Handle disabled state
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isLoading) return;
      onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
    };

    return (
      <SimpleSquircle
        as="div"
        role="button"
        tabIndex={disabled ? -1 : 0}
        width={width}
        height={height}
        roundnessLevel={roundnessLevel}
        className={`${variantClassName} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        padding={buttonPadding}
        hoverEffect={!disabled && hoverEffect}
        hoverOpacity={hoverOpacity}
        initialOpacity={initialOpacity}
        hoverTransition={hoverTransition}
        borderStyle="solid"
        {...variantProps}
        onClick={handleClick}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled && !isLoading) {
            e.preventDefault();
            onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
          }
        }}
        ref={ref}
      >
        <div className="flex items-center justify-center">
          {isLoading ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : null}
          <span className={`flex items-center justify-center ${textColorClass} ${textClassName}`}>
            {children}
          </span>
        </div>
      </SimpleSquircle>
    );
  }
);

SquircleButton.displayName = 'SquircleButton';
export { SimpleSquircle as Button }; // For backward compatibility
export default SquircleButton;
