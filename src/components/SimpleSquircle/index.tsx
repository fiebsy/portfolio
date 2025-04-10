'use client';

import React, { forwardRef, useEffect, useState } from 'react';

export interface SimpleSquircleProps {
  children?: React.ReactNode;
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  color?: string;
  padding?: string;
  as?: React.ElementType;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  debug?: boolean;
  border?: {
    color: string;
    width: number | string;
  };
}

export interface BorderedSquircleProps extends SimpleSquircleProps {
  borderWidth?: string | number;
  borderColor?: string;
  borderRadius?: string | number;
  innerBorderRadius?: string | number;
}

/**
 * Generates an SVG path for a squircle with iOS-style corner smoothing
 * @param width - Width of the squircle in pixels
 * @param height - Height of the squircle in pixels 
 * @param radius - Corner radius in pixels
 * @returns SVG path string
 */
const generateSquirclePath = (width: number, height: number, radius: number): string => {
  // Use exponent 5 for iOS-style squircle
  const n = 5;
  
  // Number of points per corner (higher = smoother)
  const points = 120;
  const angleStep = (Math.PI / 2) / points;
  
  // Ensure radius doesn't exceed half of the smaller dimension
  const maxRadius = Math.min(width / 2, height / 2);
  const actualRadius = Math.min(radius, maxRadius);
  
  // Calculate straight edge lengths
  const straightWidth = width - 2 * actualRadius;
  const straightHeight = height - 2 * actualRadius;
  
  // Generate coordinates for the full path
  const coords: [number, number][] = [];
  
  // Top edge (left to right)
  if (straightWidth > 0) {
    coords.push([actualRadius, 0]);
    coords.push([width - actualRadius, 0]);
  }
  
  // Top-right corner
  for (let i = 0; i <= points; i++) {
    const angle = i * angleStep;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const factor = Math.pow(Math.pow(Math.abs(cosAngle), n) + Math.pow(Math.abs(sinAngle), n), 1/n);
    
    const x = width - actualRadius + (actualRadius * cosAngle / factor);
    const y = actualRadius - (actualRadius * sinAngle / factor);
    
    coords.push([x, y]);
  }
  
  // Right edge (top to bottom)
  if (straightHeight > 0) {
    coords.push([width, actualRadius]);
    coords.push([width, height - actualRadius]);
  }
  
  // Bottom-right corner
  for (let i = 0; i <= points; i++) {
    const angle = i * angleStep;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const factor = Math.pow(Math.pow(Math.abs(cosAngle), n) + Math.pow(Math.abs(sinAngle), n), 1/n);
    
    const x = width - actualRadius + (actualRadius * cosAngle / factor);
    const y = height - actualRadius + (actualRadius * sinAngle / factor);
    
    coords.push([x, y]);
  }
  
  // Bottom edge (right to left)
  if (straightWidth > 0) {
    coords.push([width - actualRadius, height]);
    coords.push([actualRadius, height]);
  }
  
  // Bottom-left corner
  for (let i = 0; i <= points; i++) {
    const angle = i * angleStep;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const factor = Math.pow(Math.pow(Math.abs(cosAngle), n) + Math.pow(Math.abs(sinAngle), n), 1/n);
    
    const x = actualRadius - (actualRadius * cosAngle / factor);
    const y = height - actualRadius + (actualRadius * sinAngle / factor);
    
    coords.push([x, y]);
  }
  
  // Left edge (bottom to top)
  if (straightHeight > 0) {
    coords.push([0, height - actualRadius]);
    coords.push([0, actualRadius]);
  }
  
  // Top-left corner
  for (let i = 0; i <= points; i++) {
    const angle = i * angleStep;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const factor = Math.pow(Math.pow(Math.abs(cosAngle), n) + Math.pow(Math.abs(sinAngle), n), 1/n);
    
    const x = actualRadius - (actualRadius * cosAngle / factor);
    const y = actualRadius - (actualRadius * sinAngle / factor);
    
    coords.push([x, y]);
  }
  
  // Build the SVG path
  let path = `M ${coords[0][0]},${coords[0][1]} `;
  
  for (let i = 1; i < coords.length; i++) {
    path += `L ${coords[i][0]},${coords[i][1]} `;
  }
  
  path += 'Z';
  
  return path;
};

/**
 * SimpleSquircle - A component that creates containers with iOS-style corner smoothing.
 * 
 * This component creates a container with corners that use a mathematical formula 
 * to achieve the continuous-curvature rounded corners seen in iOS interfaces.
 * Unlike standard CSS border-radius which creates circular arcs, this creates true
 * "squircle" corners with aesthetically pleasing, gradually changing curvature.
 */
export const SimpleSquircle = forwardRef<HTMLDivElement, SimpleSquircleProps>(
  (
    {
      children,
      className = '',
      width = '200px',
      height = '200px',
      borderRadius = 20,
      color = '#b8dd23',
      padding = '1rem',
      as: Component = 'div',
      onClick,
      style = {},
      debug = false,
      border,
      ...rest
    },
    ref
  ) => {
    // Client-side only state to fix hydration issues
    const [isClient, setIsClient] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const localRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = ref ? 
      (node: HTMLDivElement) => {
        (ref as React.MutableRefObject<HTMLDivElement>).current = node;
        localRef.current = node;
      } : localRef;
    
    // Only run on client-side to avoid hydration mismatch
    useEffect(() => {
      setIsClient(true);
      
      // If debug is enabled, report dimensions
      if (debug && localRef.current) {
        const reportDimensions = () => {
          const rect = localRef.current?.getBoundingClientRect();
          if (rect && localRef.current) {
            setDimensions({
              width: rect.width,
              height: rect.height
            });
            console.log('SimpleSquircle Debug:', {
              requestedWidth: width,
              requestedHeight: height,
              actualWidth: rect.width,
              actualHeight: rect.height,
              computedStyle: window.getComputedStyle(localRef.current),
              element: localRef.current
            });
          }
        };
        
        reportDimensions();
        window.addEventListener('resize', reportDimensions);
        return () => window.removeEventListener('resize', reportDimensions);
      }
    }, [debug, width, height]);
    
    // Convert dimensions to pixel values for path generation
    const widthInPx = typeof width === 'number' ? width : parseInt(width, 10) || 200;
    const heightInPx = typeof height === 'number' ? height : parseInt(height, 10) || 200;
    const radiusInPx = typeof borderRadius === 'number' 
      ? borderRadius 
      : parseInt(borderRadius.toString(), 10) || 20;
    
    // Generate the SVG path for the squircle - only on client side
    const squirclePath = isClient ? generateSquirclePath(widthInPx, heightInPx, radiusInPx) : '';
    
    // Create component styles
    const squircleStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      width: width === 'full' ? '100%' : (typeof width === 'number' ? `${width}px` : width),
      height: height === 'full' ? '100%' : (typeof height === 'number' ? `${height}px` : height),
      padding,
      backgroundColor: color,
      color: '#171717',
      ...style
    };
    
    // Only add clip-path styles on client-side to prevent hydration mismatch
    if (isClient && squirclePath) {
      squircleStyles.clipPath = `path('${squirclePath}')`;
      squircleStyles.WebkitClipPath = `path('${squirclePath}')`;
    } else {
      // Use standard border-radius during server rendering
      squircleStyles.borderRadius = `${radiusInPx}px`;
    }

    // Apply border if specified
    if (border) {
      squircleStyles.boxShadow = `0 0 0 ${typeof border.width === 'number' ? 
        `${border.width}px` : border.width} ${border.color}`;
    }

    // Debug overlay
    const debugOverlay = debug && isClient ? (
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '4px 8px',
        fontSize: '10px',
        borderTopLeftRadius: '4px',
        zIndex: 1000
      }}>
        {dimensions.width.toFixed(0)}×{dimensions.height.toFixed(0)}px
      </div>
    ) : null;

    return (
      <Component
        ref={combinedRef}
        className={className}
        style={squircleStyles}
        onClick={onClick}
        {...rest}
      >
        {debugOverlay}
        {children}
      </Component>
    );
  }
);

SimpleSquircle.displayName = 'SimpleSquircle';

/**
 * BorderedSquircle - A convenience component for creating a SimpleSquircle with a border.
 * 
 * This component nests two SimpleSquircle components to create a border effect,
 * avoiding the complexity of manual nesting.
 */
export const BorderedSquircle = forwardRef<HTMLDivElement, BorderedSquircleProps>(
  (
    {
      children,
      className = '',
      width = '200px',
      height = '200px',
      borderRadius = 20,
      innerBorderRadius,
      color = 'white',
      borderColor = '#3b82f6',
      borderWidth = '2px',
      padding = '1rem',
      as = 'div',
      onClick,
      style = {},
      ...rest
    },
    ref
  ) => {
    // Calculate inner border radius if not provided
    const calculatedInnerRadius = innerBorderRadius ?? 
      (typeof borderRadius === 'number' 
        ? Math.max(0, borderRadius - 2)
        : `calc(${borderRadius} - 2px)`);
    
    // Calculate border width in pixels for padding
    const borderWidthInPx = typeof borderWidth === 'number' 
      ? borderWidth 
      : parseInt(borderWidth, 10) || 2;
    
    // Full width container styles to ensure proper filling
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      ...style
    };
    
    return (
      <SimpleSquircle
        className={className}
        width={width}
        height={height}
        borderRadius={borderRadius}
        color={borderColor}
        padding={`${borderWidthInPx}px`}
        as={as}
        onClick={onClick}
        style={style}
        {...rest}
      >
        <SimpleSquircle
          ref={ref}
          width="full"
          height="full"
          borderRadius={calculatedInnerRadius}
          color={color}
          padding={padding}
          style={containerStyle}
        >
          {children}
        </SimpleSquircle>
      </SimpleSquircle>
    );
  }
);

BorderedSquircle.displayName = 'BorderedSquircle';

export default SimpleSquircle; 