'use client';

import React from 'react';
import { SimpleSquircle, SimpleSquircleProps } from '@/components/ui/simple-squircle';

export interface ButtonProps extends Omit<SimpleSquircleProps, 'as'> {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
  (
    {
      children,
      onClick,
      href,
      icon,
      iconPosition = 'right',
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const buttonProps = {
      onClick: !disabled ? onClick : undefined,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
      },
    };

    // Handle href differently based on if we're using an anchor
    const Component = href && !disabled ? 'a' : 'button';
    const linkProps = href && !disabled ? { href } : { type: 'button' };

    return (
      <SimpleSquircle
        ref={ref}
        as={Component}
        className={className}
        width="auto"
        height="auto"
        roundnessLevel={2}
        padding="12px"
        border={2}
        borderColor="#d9d9d9"
        borderStyle="solid"
        hoverEffect
        hoverOpacity={100}
        initialOpacity={23}
        hoverTransition="0.2s ease"
        {...linkProps}
        {...buttonProps}
        {...props}
      >
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </SimpleSquircle>
    );
  }
);

Button.displayName = 'Button';

export default Button;
