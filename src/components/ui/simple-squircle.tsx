'use client';

import React, { forwardRef, useEffect, useState, useRef, useCallback } from 'react';

export interface SimpleSquircleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  
  // Dimension props
  width?: string | number;
  height?: string | number;
  
  // Style props
  padding?: string | number;
  style?: React.CSSProperties;
  
  // Shape props - Default to level 1 (most round)
  roundnessLevel?: 1 | 2 | 3 | 4; // 1=most round, 4=least round
  
  // Border radius props
  borderRadius?: string | number;  // Only used if roundnessLevel is not provided
  cornerSmoothing?: 'ios' | 'medium' | 'high' | number; // Only used if roundnessLevel is not provided
  
  // Per-corner border radius (optional)
  borderRadiusTopLeft?: number;
  borderRadiusTopRight?: number;
  borderRadiusBottomRight?: number;
  borderRadiusBottomLeft?: number;
  
  // Border props (for solid borders)
  border?: boolean | number; // true = 2px border, or specify width directly
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  
  // Hover effect properties (for solid borders)
  hoverEffect?: boolean | 'border'; // true or 'border' enables the hover border effect
  hoverOpacity?: number; // 0-100, defaults to 100
  initialOpacity?: number; // 0-100, defaults to 0
  hoverTransition?: string; // defaults to '0.3s ease'
  
  // Advanced rendering options
  pointsPerCorner?: number; // Controls number of points used to draw curves
  
  // Component props
  as?: React.ElementType;
  
  // Debug mode
  debug?: boolean;
}

// Define roundness levels (1=most round, 4=least round)
const ROUNDNESS_LEVELS = {
  // Level 1: Most rounded
  1: {
    smoothing: 5.0,
    borderRadius: 30,
    pointsPerCorner: 45
  },
  // Level 2: Slightly rounded
  2: {
    smoothing: 5.5, 
    borderRadius: 42,
    pointsPerCorner: 47
  },
  // Level 3: Slightly geometric
  3: {
    smoothing: 6.5,
    borderRadius: 55,
    pointsPerCorner: 55
  },
  // Level 4: Most geometric/squared, least round
  4: {
    smoothing: 7.8,
    borderRadius: 65,
    pointsPerCorner: 70
  }
};

/**
 * Generates an SVG path for a squircle with iOS-style corner smoothing
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
      // We use object rest destructuring to ignore these parameters
      // since we get values from roundnessLevel instead
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
      roundnessLevel = 1, // Default to level 1 (most round)
      as: Component = 'div',
      debug = false,
      // Collect unused props without naming them
      ...rest
    },
    ref
  ) => {
    // Border settings
    const hasBorder = border !== false;
    const borderWidth = typeof border === 'number' ? border : (border ? 2 : 0);
    const useHoverEffect = hoverEffect !== false;
    
    // Apply roundness level settings if provided
    const levelSettings = ROUNDNESS_LEVELS[roundnessLevel] || ROUNDNESS_LEVELS[1];
    const finalBorderRadius = levelSettings.borderRadius;
    const finalCornerSmoothing = levelSettings.smoothing;
    const finalPointsPerCorner = levelSettings.pointsPerCorner;
    
    // State for dimensions and hover
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Handle ref forwarding
    const combinedRef = useMergedRef(ref, containerRef);
    
    // Function to handle dimensions updates
    const updateDimensions = useCallback(() => {
      if (!wrapperRef.current) return;
      
      const rect = wrapperRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    }, []);
    
    // Set up resize observer and event handlers
    useEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
        // Use RAF to debounce and ensure rendering is complete
        requestAnimationFrame(updateDimensions);
      });
      
      if (wrapperRef.current) {
        resizeObserver.observe(wrapperRef.current);
        // Use a slight delay for initial measurement to ensure the DOM is fully rendered
        setTimeout(updateDimensions, 10);
        
        // Add hover event listeners if needed
        if (useHoverEffect && borderStyle === 'solid') {
          const handleMouseEnter = () => setIsHovered(true);
          const handleMouseLeave = () => setIsHovered(false);
          
          containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
          containerRef.current?.addEventListener('mouseleave', handleMouseLeave);
          
          return () => {
            containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
            containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
            resizeObserver.disconnect();
          };
        }
      }
      
      return () => {
        resizeObserver.disconnect();
      };
    }, [updateDimensions, useHoverEffect, borderStyle]);
    
    // Calculate paths based on current dimensions
    const widthInPx = dimensions.width > 0 ? dimensions.width : 0;
    const heightInPx = dimensions.height > 0 ? dimensions.height : 0;
    
    // Only generate paths if we have valid dimensions
    const outerSquirclePath = widthInPx > 0 && heightInPx > 0 
      ? generateSquirclePath(
          widthInPx, 
          heightInPx, 
          finalBorderRadius,
          borderRadiusTopLeft,
          borderRadiusTopRight,
          borderRadiusBottomRight,
          borderRadiusBottomLeft,
          finalCornerSmoothing,
          finalPointsPerCorner
        )
      : '';
    
    // Inner path for bordered squircle
    const innerSquirclePath = widthInPx > 0 && heightInPx > 0 && hasBorder && borderWidth > 0 && borderStyle === 'solid'
      ? generateSquirclePath(
          widthInPx - borderWidth * 2,
          heightInPx - borderWidth * 2,
          Math.max(0, finalBorderRadius - borderWidth),
          borderRadiusTopLeft !== undefined ? Math.max(0, borderRadiusTopLeft - borderWidth) : undefined,
          borderRadiusTopRight !== undefined ? Math.max(0, borderRadiusTopRight - borderWidth) : undefined,
          borderRadiusBottomRight !== undefined ? Math.max(0, borderRadiusBottomRight - borderWidth) : undefined,
          borderRadiusBottomLeft !== undefined ? Math.max(0, borderRadiusBottomLeft - borderWidth) : undefined,
          finalCornerSmoothing,
          finalPointsPerCorner
        )
      : '';
    
    // Function to get color with opacity for hover effects
    const getColorWithOpacity = (color: string, opacity: number): string => {
      if (!/^#[0-9a-fA-F]{6}$/.test(color)) return `rgba(0, 0, 0, ${opacity / 100})`;
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    };
    
    // Set up dimension styles for width/height
    const dimensionStyles: React.CSSProperties = {
      width: width === 'full' ? '100%' : (typeof width === 'number' ? `${width}px` : width),
      // Only set fixed height if not auto
      ...(height !== 'auto' && {
        height: height === 'full' ? '100%' : (typeof height === 'number' ? `${height}px` : height)
      }),
    };
    
    // Convert padding string/number to CSS value
    const paddingValue = typeof padding === 'number' ? `${padding}px` : padding;
    
    // Wrapper styles for measurement
    const wrapperStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      // Don't enforce height: 100% when using auto height
      ...(height !== 'auto' ? { height: '100%' } : {}),
      display: height === 'auto' ? 'inline-block' : 'block',
      ...dimensionStyles,
    };
    
    // Base styles for the container
    const containerStyles: React.CSSProperties = {
      position: height === 'auto' ? 'relative' : 'absolute',
      ...(height !== 'auto' && { top: 0, left: 0 }),
      width: '100%',
      ...(height !== 'auto' && { height: '100%' }),
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...style,
    };
    
    // Add clip path if available
    if (outerSquirclePath) {
      containerStyles.clipPath = `path('${outerSquirclePath}')`;
      containerStyles.WebkitClipPath = `path('${outerSquirclePath}')`;
    } else {
      containerStyles.borderRadius = `${finalBorderRadius}px`;
    }
    
    // Add debug outline
    if (debug) {
      containerStyles.outline = '1px dashed red';
    }
    
    // For solid borders, add background color
    if (borderStyle === 'solid' && hasBorder && borderWidth > 0) {
      containerStyles.backgroundColor = useHoverEffect
        ? getColorWithOpacity(borderColor, isHovered ? hoverOpacity : initialOpacity)
        : borderColor;
      
      if (useHoverEffect) {
        containerStyles.transition = `background-color ${hoverTransition}`;
      }
      
      // Content styles for bordered version
      const contentStyles: React.CSSProperties = {
        position: height === 'auto' ? 'relative' : 'absolute',
        ...(height !== 'auto' && { top: borderWidth, left: borderWidth, right: borderWidth, bottom: borderWidth }),
        ...(height === 'auto' && { margin: borderWidth }),
        padding: paddingValue,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        flex: 1,
      };
      
      // Add inner clip path if available
      if (innerSquirclePath) {
        contentStyles.clipPath = `path('${innerSquirclePath}')`;
        contentStyles.WebkitClipPath = `path('${innerSquirclePath}')`;
      } else {
        contentStyles.borderRadius = `${Math.max(0, finalBorderRadius - borderWidth)}px`;
      }
      
      if (debug) {
        contentStyles.outline = '1px dotted blue';
      }
      
      return (
        <Component
          ref={combinedRef}
          style={wrapperStyles}
          data-roundness-level={roundnessLevel}
          data-dimension-width={widthInPx}
          data-dimension-height={heightInPx}
          {...rest}
        >
          <div 
            ref={wrapperRef} 
            style={{ 
              position: 'relative', 
              width: '100%', 
              display: height === 'auto' ? 'inline-block' : 'block',
              ...(height !== 'auto' ? { height: '100%' } : {})
            }}
          >
            <div style={containerStyles}>
              <div ref={contentRef} className={className} style={contentStyles}>
                {children}
                {debug && (
                  <div style={{ position: 'absolute', bottom: 2, right: 2, fontSize: '8px', color: 'red', background: 'rgba(255,255,255,0.7)', padding: '1px 3px' }}>
                    {widthInPx}x{heightInPx}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Component>
      );
    }
    
    // For no border or non-solid borders
    else {
      // Add border if using dashed/dotted
      if (hasBorder && (borderStyle === 'dashed' || borderStyle === 'dotted')) {
        containerStyles.border = `${borderWidth}px ${borderStyle} ${borderColor}`;
      }
      
      // Content styles for no-border version
      const contentStyles: React.CSSProperties = {
        padding: paddingValue,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        flex: 1,
      };
      
      if (debug) {
        contentStyles.outline = '1px dotted green';
      }
      
      return (
        <Component
          ref={combinedRef}
          style={wrapperStyles}
          data-roundness-level={roundnessLevel}
          data-dimension-width={widthInPx}
          data-dimension-height={heightInPx}
          {...rest}
        >
          <div 
            ref={wrapperRef} 
            style={{ 
              position: 'relative', 
              width: '100%', 
              display: height === 'auto' ? 'inline-block' : 'block',
              ...(height !== 'auto' ? { height: '100%' } : {})
            }}
          >
            <div style={containerStyles}>
              <div ref={contentRef} className={className} style={contentStyles}>
                {children}
                {debug && (
                  <div style={{ position: 'absolute', bottom: 2, right: 2, fontSize: '8px', color: 'red', background: 'rgba(255,255,255,0.7)', padding: '1px 3px' }}>
                    {widthInPx}x{heightInPx}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Component>
      );
    }
  }
);

// Helper to merge refs
function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]) {
  return useCallback((element: T) => {
    refs.forEach(ref => {
      if (!ref) return;
      
      if (typeof ref === 'function') {
        ref(element);
      } else {
        (ref as React.MutableRefObject<T>).current = element;
      }
    });
  }, [refs]);
}

SimpleSquircle.displayName = 'SimpleSquircle';
export const BorderedSquircle = SimpleSquircle;
export default SimpleSquircle;