'use client';

import React, { forwardRef, useEffect, useState } from 'react';

export interface SimpleSquircleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  
  // Dimension props
  width?: string | number;
  height?: string | number;
  
  // Style props
  padding?: string | number;
  style?: React.CSSProperties;
  
  // Border radius props
  borderRadius?: string | number;
  cornerSmoothing?: 'ios' | 'medium' | 'high' | number; // iOS = 5, medium = 4, high = 6, custom = any number
  
  // Per-corner border radius (optional)
  borderRadiusTopLeft?: number;
  borderRadiusTopRight?: number;
  borderRadiusBottomRight?: number;
  borderRadiusBottomLeft?: number;
  
  // Border props (Restored for solid borders)
  border?: boolean | number; // true = 2px border, or specify width directly
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  
  // Per-side borders (REMOVED - Must use Tailwind for non-solid)
  // borderTop?: number;
  // borderRight?: number;
  // borderBottom?: number;
  // borderLeft?: number;
  
  // Hover effect properties (Restored for solid borders)
  hoverEffect?: boolean | 'border'; // true or 'border' enables the hover border effect
  hoverOpacity?: number; // 0-100, defaults to 100
  initialOpacity?: number; // 0-100, defaults to 0
  hoverTransition?: string; // defaults to '0.3s ease'
  
  // Component props
  as?: React.ElementType;
}

/**
 * Generates an SVG path for a squircle with iOS-style corner smoothing
 * @param width - Width of the squircle in pixels
 * @param height - Height of the squircle in pixels 
 * @param radius - Corner radius in pixels (default, used for all corners unless overridden)
 * @param radiusTopLeft - Top-left corner radius
 * @param radiusTopRight - Top-right corner radius
 * @param radiusBottomRight - Bottom-right corner radius
 * @param radiusBottomLeft - Bottom-left corner radius
 * @param exponent - Exponent to use for the squircle formula (higher = sharper corners)
 * @returns SVG path string
 */
const generateSquirclePath = (
  width: number, 
  height: number, 
  radius: number,
  radiusTopLeft?: number,
  radiusTopRight?: number,
  radiusBottomRight?: number,
  radiusBottomLeft?: number,
  exponent: number = 5
): string => {
  // Number of points per corner (higher = smoother)
  const points = 120;
  const angleStep = (Math.PI / 2) / points;
  
  // Ensure radius doesn't exceed half of the smaller dimension
  const maxRadius = Math.min(width / 2, height / 2);
  
  // Get radius for each corner, using the default if not specified
  const actualRadiusTL = radiusTopLeft !== undefined ? 
    Math.min(radiusTopLeft, maxRadius) : Math.min(radius, maxRadius);
  
  const actualRadiusTR = radiusTopRight !== undefined ? 
    Math.min(radiusTopRight, maxRadius) : Math.min(radius, maxRadius);
  
  const actualRadiusBR = radiusBottomRight !== undefined ? 
    Math.min(radiusBottomRight, maxRadius) : Math.min(radius, maxRadius);
  
  const actualRadiusBL = radiusBottomLeft !== undefined ? 
    Math.min(radiusBottomLeft, maxRadius) : Math.min(radius, maxRadius);
  
  // Generate coordinates for the full path
  const coords: [number, number][] = [];
  
  // Top edge (left to right)
  coords.push([actualRadiusTL, 0]);
  coords.push([width - actualRadiusTR, 0]);
  
  // Top-right corner
  if (actualRadiusTR > 0) {
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const factor = Math.pow(Math.pow(Math.abs(cosAngle), exponent) + Math.pow(Math.abs(sinAngle), exponent), 1/exponent);
      
      const x = width - actualRadiusTR + (actualRadiusTR * cosAngle / factor);
      const y = actualRadiusTR - (actualRadiusTR * sinAngle / factor);
      
      coords.push([x, y]);
    }
  } else {
    // Sharp corner if radius is 0
    coords.push([width, 0]);
  }
  
  // Right edge (top to bottom)
  coords.push([width, actualRadiusTR]);
  coords.push([width, height - actualRadiusBR]);
  
  // Bottom-right corner
  if (actualRadiusBR > 0) {
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const factor = Math.pow(Math.pow(Math.abs(cosAngle), exponent) + Math.pow(Math.abs(sinAngle), exponent), 1/exponent);
      
      const x = width - actualRadiusBR + (actualRadiusBR * cosAngle / factor);
      const y = height - actualRadiusBR + (actualRadiusBR * sinAngle / factor);
      
      coords.push([x, y]);
    }
  } else {
    // Sharp corner if radius is 0
    coords.push([width, height]);
  }
  
  // Bottom edge (right to left)
  coords.push([width - actualRadiusBR, height]);
  coords.push([actualRadiusBL, height]);
  
  // Bottom-left corner
  if (actualRadiusBL > 0) {
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const factor = Math.pow(Math.pow(Math.abs(cosAngle), exponent) + Math.pow(Math.abs(sinAngle), exponent), 1/exponent);
      
      const x = actualRadiusBL - (actualRadiusBL * cosAngle / factor);
      const y = height - actualRadiusBL + (actualRadiusBL * sinAngle / factor);
      
      coords.push([x, y]);
    }
  } else {
    // Sharp corner if radius is 0
    coords.push([0, height]);
  }
  
  // Left edge (bottom to top)
  coords.push([0, height - actualRadiusBL]);
  coords.push([0, actualRadiusTL]);
  
  // Top-left corner
  if (actualRadiusTL > 0) {
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      const factor = Math.pow(Math.pow(Math.abs(cosAngle), exponent) + Math.pow(Math.abs(sinAngle), exponent), 1/exponent);
      
      const x = actualRadiusTL - (actualRadiusTL * cosAngle / factor);
      const y = actualRadiusTL - (actualRadiusTL * sinAngle / factor);
      
      coords.push([x, y]);
    }
  } else {
    // Sharp corner if radius is 0
    coords.push([0, 0]);
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
 * Background color/text/etc via `className` (applied to inner element for solid borders).
 * Solid borders use props and follow the shape.
 * Non-solid borders use `className` and are rectangular.
 */
export const SimpleSquircle = forwardRef<HTMLDivElement, SimpleSquircleProps>(
  (
    {
      children,
      className = '',
      width = 'auto',
      height = 'auto',
      borderRadius = 16,
      cornerSmoothing = 'ios',
      borderRadiusTopLeft,
      borderRadiusTopRight,
      borderRadiusBottomRight,
      borderRadiusBottomLeft,
      padding = '1rem',
      style = {},
      border = false,
      borderColor = '#3b82f6',
      borderStyle = 'solid',
      hoverEffect = false,
      hoverOpacity = 100,
      initialOpacity = 0,
      hoverTransition = '0.3s ease',
      as: Component = 'div',
      ...rest
    },
    ref
  ) => {
    const hasBorder = border !== false;
    const borderWidth = typeof border === 'number' ? border : (border ? 2 : 0);
    const useHoverEffect = hoverEffect !== false;
    const hoverBorderOpacity = hoverOpacity;
    const initialBorderOpacity = initialOpacity;

    const getSmoothingExponent = (): number => {
      if (typeof cornerSmoothing === 'number') return cornerSmoothing;
      switch (cornerSmoothing) {
        case 'ios': return 5;
        case 'medium': return 4;
        case 'high': return 6;
        default: return 5;
      }
    };
    const exponent = getSmoothingExponent();

    const [isClient, setIsClient] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const localRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = ref ?
      (node: HTMLDivElement | null) => {
         if (node) {
            if (typeof ref === 'function') { ref(node); }
            else { (ref as React.MutableRefObject<HTMLDivElement | null>).current = node; }
            (localRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
         }
      } : localRef;

    const hasFixedWidth = typeof width === 'number' || (typeof width === 'string' && /^\d+(\.\d+)?(px)?$/.test(width));
    const hasFixedHeight = typeof height === 'number' || (typeof height === 'string' && /^\d+(\.\d+)?(px)?$/.test(height));
    const fixedWidth = hasFixedWidth ? (typeof width === 'number' ? width : parseInt(width as string, 10) || 200) : 0;
    const fixedHeight = hasFixedHeight ? (typeof height === 'number' ? height : parseInt(height as string, 10) || 200) : 0;

    useEffect(() => {
      setIsClient(true);
      let resizeObserver: ResizeObserver | null = null;
      const currentElement = localRef.current;
      const handleMouseEnterEvent = () => setIsHovered(true);
      const handleMouseLeaveEvent = () => setIsHovered(false);

      if (currentElement) {
        const updateDimensions = () => {
            const rect = currentElement.getBoundingClientRect();
            setDimensions({ width: hasFixedWidth ? fixedWidth : rect.width, height: hasFixedHeight ? fixedHeight : rect.height });
        };
        updateDimensions();
        resizeObserver = new ResizeObserver(updateDimensions);
        resizeObserver.observe(currentElement);

        if (useHoverEffect && borderStyle === 'solid') {
          currentElement.addEventListener('mouseenter', handleMouseEnterEvent);
          currentElement.addEventListener('mouseleave', handleMouseLeaveEvent);
        }
      }
      return () => {
          if (currentElement && resizeObserver) { resizeObserver.unobserve(currentElement); }
          if (resizeObserver) { resizeObserver.disconnect(); }
          if (currentElement && useHoverEffect && borderStyle === 'solid') {
            currentElement.removeEventListener('mouseenter', handleMouseEnterEvent);
            currentElement.removeEventListener('mouseleave', handleMouseLeaveEvent);
          }
        };
    }, [width, height, hasFixedWidth, hasFixedHeight, fixedWidth, fixedHeight, useHoverEffect, borderStyle]);

    const widthInPx = hasFixedWidth ? fixedWidth : (dimensions.width > 0 ? dimensions.width : 200);
    const heightInPx = hasFixedHeight ? fixedHeight : (dimensions.height > 0 ? dimensions.height : 200);
    const radiusInPx = typeof borderRadius === 'number' ? borderRadius : parseInt(borderRadius.toString(), 10) || 20;
    const squirclePath = isClient && widthInPx > 0 && heightInPx > 0 ?
      generateSquirclePath(widthInPx, heightInPx, radiusInPx, borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, exponent)
      : '';
    const paddingValue = typeof padding === 'number' ? `${padding}px` : padding;

    const getColorWithOpacity = (color: string, opacity: number): string => {
      if (!/^#[0-9a-fA-F]{6}$/.test(color)) { return `rgba(0, 0, 0, ${opacity / 100})`; }
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    };

    // --- Conditional Rendering --- 

    // CASE 1: Solid border - Use nested elements
    if (borderStyle === 'solid' && hasBorder && borderWidth > 0) {
      const innerRadius = Math.max(0, radiusInPx - borderWidth);
      const innerWidth = Math.max(0, widthInPx - 2 * borderWidth);
      const innerHeight = Math.max(0, heightInPx - 2 * borderWidth);

      const innerSquirclePath = isClient && innerWidth > 0 && innerHeight > 0 ?
        generateSquirclePath(innerWidth, innerHeight, innerRadius, undefined, undefined, undefined, undefined, exponent)
        : '';

      // Outer element styles (the border)
      const outerStyles: React.CSSProperties = {
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        width: width === 'full' ? '100%' : (hasFixedWidth ? `${fixedWidth}px` : width),
        height: height === 'full' ? '100%' : (hasFixedHeight ? `${fixedHeight}px` : height),
        padding: `${borderWidth}px`,
        backgroundColor: borderColor,
        boxSizing: 'border-box',
        ...(isClient && squirclePath ? {
          clipPath: `path('${squirclePath}')`,
          WebkitClipPath: `path('${squirclePath}')`,
        } : {
          borderRadius: `${radiusInPx}px`,
        }),
        ...(useHoverEffect ? { transition: `background-color ${hoverTransition}` } : {}),
        transform: 'translateZ(0)',
      };

      if (useHoverEffect) {
        const currentOpacity = isHovered ? hoverBorderOpacity : initialBorderOpacity;
        outerStyles.backgroundColor = getColorWithOpacity(borderColor, currentOpacity);
      }

      // Inner element styles (the content area)
      const innerStyles: React.CSSProperties = {
        width: '100%',
        height: '100%',
        padding: paddingValue,
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...(isClient && innerSquirclePath ? {
            clipPath: `path('${innerSquirclePath}')`,
            WebkitClipPath: `path('${innerSquirclePath}')`,
        } : {
            borderRadius: `${innerRadius}px`,
        }),
        ...style,
        transform: 'translateZ(0)',
      };

      return (
        <Component
          ref={combinedRef}
          style={outerStyles}
          {...rest}
        >
          <div
             className={className}
             style={innerStyles}
          >
            {children}
          </div>
        </Component>
      );
    }

    // CASE 2: No border, dashed, or dotted - Use single element
    else {
      const singleElementStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        width: width === 'full' ? '100%' : (hasFixedWidth ? `${fixedWidth}px` : width),
        height: height === 'full' ? '100%' : (hasFixedHeight ? `${fixedHeight}px` : height),
        padding: paddingValue,
        boxSizing: 'border-box',
        ...style,
        ...(isClient && squirclePath ? {
          clipPath: `path('${squirclePath}')`,
          WebkitClipPath: `path('${squirclePath}')`,
        } : {
          borderRadius: `${radiusInPx}px`,
        }),
        transform: 'translateZ(0)',
      };

      return (
        <Component
          ref={combinedRef}
          className={className}
          style={singleElementStyles}
          {...rest}
        >
          {children}
        </Component>
      );
    }
  }
);

SimpleSquircle.displayName = 'SimpleSquircle';
export const BorderedSquircle = SimpleSquircle;
export default SimpleSquircle;