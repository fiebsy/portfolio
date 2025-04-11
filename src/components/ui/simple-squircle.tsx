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
  borderRadius?: string | number;  // Default is now 42px
  cornerSmoothing?: 'ios' | 'medium' | 'high' | number; // iOS = 5, medium = 4, high = 6, custom = any number from 5-8
  
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
  
  // Advanced rendering options
  pointsPerCorner?: number; // Controls number of points used to draw curves (default: 45)
  
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
 * @param pointsPerCorner - Number of points to use per corner (default: 12)
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
  exponent: number = 5,
  pointsPerCorner: number = 12
): string => {
  // Ensure radius doesn't exceed half of the smaller dimension
  const maxRadius = Math.min(width / 2, height / 2);
  
  // Get radius for each corner, using the default if not specified
  const rTL = radiusTopLeft !== undefined ? 
    Math.min(radiusTopLeft, maxRadius) : Math.min(radius, maxRadius);
  
  const rTR = radiusTopRight !== undefined ? 
    Math.min(radiusTopRight, maxRadius) : Math.min(radius, maxRadius);
  
  const rBR = radiusBottomRight !== undefined ? 
    Math.min(radiusBottomRight, maxRadius) : Math.min(radius, maxRadius);
  
  const rBL = radiusBottomLeft !== undefined ? 
    Math.min(radiusBottomLeft, maxRadius) : Math.min(radius, maxRadius);
  
  // Round to reduce possible rendering issues
  const round = (num: number): number => Math.round(num * 100) / 100;
  
  // Calculate number of points per corner - constrain to reasonable values
  const numPoints = Math.max(4, Math.min(pointsPerCorner, 50));
  
  // Functions to generate precise iOS-style superellipse corner points
  const generateCornerPoints = (
    centerX: number, 
    centerY: number, 
    radiusX: number, 
    radiusY: number, 
    startAngle: number, 
    endAngle: number,
    clockwise: boolean = true
  ): string => {
    let points = '';
    const angleStep = Math.abs(endAngle - startAngle) / numPoints;
    const angleDirection = clockwise ? 1 : -1;
    
    // Skip first and last point as they will be handled by L commands
    for (let i = 1; i < numPoints; i++) {
      const angle = startAngle + (angleDirection * i * angleStep);
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      
      // Superellipse formula for iOS-style rounded corners
      const factor = Math.pow(
        Math.pow(Math.abs(cosAngle), exponent) + 
        Math.pow(Math.abs(sinAngle), exponent), 
        1/exponent
      );
      
      const x = centerX + (radiusX * cosAngle / factor);
      const y = centerY + (radiusY * sinAngle / factor);
      
      // With high point counts, only add points that make a visual difference
      // Skip points that are very close to the previous point to avoid unnecessarily complex paths
      if (numPoints > 24 && i % 2 !== 0 && i !== numPoints - 1) {
        continue;
      }
      
      points += `L ${round(x)},${round(y)} `;
    }
    
    return points;
  };
  
  // Build the path using corner points
  // We'll use L commands instead of many tiny steps, with strategic points on the corners
  const path = [
    // Start at top left, after the corner curve
    `M ${round(rTL)},0`,
    
    // Line to start of top right corner
    `L ${round(width - rTR)},0`,
    
    // Top right corner
    generateCornerPoints(
      width - rTR, // center x
      rTR,         // center y
      rTR,         // radius x
      rTR,         // radius y
      -Math.PI/2,  // start angle
      0,           // end angle
      true         // clockwise
    ),
    
    // Line to start of bottom right corner
    `L ${round(width)},${round(height - rBR)}`,
    
    // Bottom right corner
    generateCornerPoints(
      width - rBR, // center x
      height - rBR, // center y
      rBR,         // radius x
      rBR,         // radius y
      0,           // start angle
      Math.PI/2,   // end angle
      true         // clockwise
    ),
    
    // Line to start of bottom left corner
    `L ${round(rBL)},${round(height)}`,
    
    // Bottom left corner
    generateCornerPoints(
      rBL,         // center x
      height - rBL, // center y
      rBL,         // radius x
      rBL,         // radius y
      Math.PI/2,   // start angle
      Math.PI,     // end angle
      true         // clockwise
    ),
    
    // Line to start of top left corner
    `L ${round(0)},${round(rTL)}`,
    
    // Top left corner
    generateCornerPoints(
      rTL,         // center x
      rTL,         // center y
      rTL,         // radius x
      rTL,         // radius y
      Math.PI,     // start angle
      3*Math.PI/2, // end angle
      true         // clockwise
    ),
    
    // Close the path
    'Z'
  ].join(' ');
  
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
      borderRadius = 42,
      cornerSmoothing = 5.5,
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
      pointsPerCorner = 45,
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
        case 'medium': return 5.5;
        case 'high': return 6.5;
        default: return 5.5;
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
      generateSquirclePath(widthInPx, heightInPx, radiusInPx, borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, exponent, pointsPerCorner)
      : '';
    const paddingValue = typeof padding === 'number' ? `${padding}px` : padding;

    const getColorWithOpacity = (color: string, opacity: number): string => {
      if (!/^#[0-9a-fA-F]{6}$/.test(color)) { return `rgba(0, 0, 0, ${opacity / 100})`; }
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    };

    // New double-layer approach base styles
    const baseOuterStyle: React.CSSProperties = {
      position: 'relative',
      overflow: 'hidden',
      width: width === 'full' ? '100%' : (hasFixedWidth ? `${fixedWidth}px` : width),
      height: height === 'full' ? '100%' : (hasFixedHeight ? `${fixedHeight}px` : height),
      boxSizing: 'border-box',
      ...(isClient && squirclePath ? {
        clipPath: `path('${squirclePath}')`,
        WebkitClipPath: `path('${squirclePath}')`,
        // Also add mask-image as primary method for Safari and other browsers
        WebkitMaskImage: squirclePath ? `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${widthInPx}' height='${heightInPx}'><path d='${squirclePath}' fill='black'/></svg>")` : 'none',
        maskImage: squirclePath ? `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='${widthInPx}' height='${heightInPx}'><path d='${squirclePath}' fill='black'/></svg>")` : 'none',
      } : {
        borderRadius: `${radiusInPx}px`,
      }),
      // Force hardware acceleration in all browsers
      transform: 'translateZ(0)',
    };
    
    // --- Conditional Rendering --- 

    // CASE 1: Solid border - Use nested elements
    if (borderStyle === 'solid' && hasBorder && borderWidth > 0) {
      const innerRadius = Math.max(0, radiusInPx - borderWidth);
      
      // Outer border element (with clip-path)
      const outerStyles: React.CSSProperties = {
        ...baseOuterStyle,
        backgroundColor: useHoverEffect ? 
          getColorWithOpacity(borderColor, isHovered ? hoverBorderOpacity : initialBorderOpacity) : 
          borderColor
      };
      
      if (useHoverEffect) {
        outerStyles.transition = `background-color ${hoverTransition}`;
      }
      
      // Inner content area (no clip-path, masked by parent)
      const innerStyles: React.CSSProperties = {
        position: 'absolute',
        top: `${borderWidth}px`,
        left: `${borderWidth}px`,
        right: `${borderWidth}px`,
        bottom: `${borderWidth}px`, 
        boxSizing: 'border-box',
        padding: paddingValue,
        ...style,
        borderRadius: `${innerRadius}px`, // Fallback for non-clip-path browsers
      };

      return (
        <Component
          ref={combinedRef}
          style={outerStyles}
          {...rest}
        >
          <div className={className} style={innerStyles}>
            {children}
          </div>
        </Component>
      );
    }

    // CASE 2: No border, dashed, or dotted - Use double-layer approach
    else {
      // Outer shape container (with clip-path)
      const outerStyles: React.CSSProperties = {
        ...baseOuterStyle,
        ...style,
      };
      
      // Inner content container - expanded by 1px to cover edge artifacts
      const innerStyles: React.CSSProperties = {
        position: 'absolute',
        top: '-0.5px',
        left: '-0.5px',
        right: '-0.5px',
        bottom: '-0.5px',
        padding: paddingValue,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      };
      
      // Apply dashed or dotted border if specified
      if (borderStyle === 'dashed' || borderStyle === 'dotted') {
        outerStyles.border = `${borderWidth}px ${borderStyle} ${borderColor}`;
      }

      return (
        <Component
          ref={combinedRef}
          style={outerStyles}
          {...rest}
        >
          <div className={className} style={innerStyles}>
            {children}
          </div>
        </Component>
      );
    }
  }
);

SimpleSquircle.displayName = 'SimpleSquircle';
export const BorderedSquircle = SimpleSquircle;
export default SimpleSquircle;