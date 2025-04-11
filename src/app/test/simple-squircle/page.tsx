'use client';

import React, { useState, useEffect } from 'react';
import { SimpleSquircle, SimpleSquircleProps } from '@/components/ui/simple-squircle';

export default function Home() {
  // State for toast notification
  const [showToast, setShowToast] = useState(false);
  
  // Dimensions
  const [width, setWidth] = useState<string | number>('400');
  const [height, setHeight] = useState<string | number>('300');
  const [useFixedDimensions, setUseFixedDimensions] = useState(true);
  
  // Border radius
  const [borderRadius, setBorderRadius] = useState(24);
  const [usePerCornerRadius, setUsePerCornerRadius] = useState(false);
  const [borderRadiusTopLeft, setBorderRadiusTopLeft] = useState(24);
  const [borderRadiusTopRight, setBorderRadiusTopRight] = useState(24);
  const [borderRadiusBottomRight, setBorderRadiusBottomRight] = useState(24);
  const [borderRadiusBottomLeft, setBorderRadiusBottomLeft] = useState(24);
  
  // Colors - REMOVED
  // const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  
  // Padding
  const [padding, setPadding] = useState('1.5rem');
  
  // Styling
  const [customClassName, setCustomClassName] = useState('bg-white'); // Default bg, border set by props below
  
  // Restored Border state (for solid borders)
  const [hasBorder, setHasBorder] = useState(true);
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderColor, setBorderColor] = useState('#3b82f6');
  const [borderStyle, setBorderStyle] = useState<'solid' | 'dashed' | 'dotted'>('solid');
  
  // Restored Hover border settings state (for solid borders)
  const [useHoverBorder, setUseHoverBorder] = useState(false);
  const [hoverBorderOpacity, setHoverBorderOpacity] = useState(100);
  const [initialBorderOpacity, setInitialBorderOpacity] = useState(0);
  const [hoverTransitionDuration, setHoverTransitionDuration] = useState(0.3);
  
  // Content
  const content = "This is a SimpleSquircle component with iOS-style corner smoothing.";

  // Handle toast dismiss after timeout
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  
  // Generate props for SimpleSquircle
  const squircleProps: SimpleSquircleProps = {
    width: useFixedDimensions ? parseInt(width as string) : width === 'full' ? 'full' : 'auto',
    height: useFixedDimensions ? parseInt(height as string) : height === 'full' ? 'full' : 'auto',
    borderRadius: borderRadius,
    ...(usePerCornerRadius && {
      borderRadiusTopLeft,
      borderRadiusTopRight,
      borderRadiusBottomRight,
      borderRadiusBottomLeft
    }),
    className: customClassName,
    padding: padding,
    // Restored border props
    border: hasBorder ? borderWidth : false,
    borderColor: borderColor,
    borderStyle: borderStyle,
    // Restored hover props
    ...(useHoverBorder && borderStyle === 'solid' && {
      hoverEffect: true,
      hoverOpacity: hoverBorderOpacity,
      initialOpacity: initialBorderOpacity,
      hoverTransition: `${hoverTransitionDuration}s ease`
    }),
  };

  // Generate code string
  const generateCode = () => {
    const props = { ...squircleProps };
    
    // Format dimensions for display
    if (typeof props.width === 'number') {
      props.width = `${props.width}`;
    }
    if (typeof props.height === 'number') {
      props.height = `${props.height}`;
    }
    
    // Remove undefined props
    Object.keys(props).forEach(key => {
      if (props[key as keyof typeof props] === undefined) {
        delete props[key as keyof typeof props];
      }
    });

    // Format each prop properly for JSX
    const formattedProps = Object.entries(props).map(([key, value]) => {
      // Format string values
      if (typeof value === 'string') {
        // Special handling for 'full' and 'auto' values
        if (key === 'className' || value === 'full' || value === 'auto') {
          return `${key}="${value}"`;
        }
        return `${key}="${value}"`;
      }
      // Format numeric values
      if (typeof value === 'number') {
        return `${key}={${value}}`;
      }
      // Format boolean values
      if (typeof value === 'boolean') {
        return value ? `${key}` : null;
      }
      // Format object values
      if (typeof value === 'object' && value !== null) {
        return `${key}={${JSON.stringify(value)}}`;
      }
      return `${key}={${JSON.stringify(value)}}`;
    }).filter(Boolean).join('\n  ');
    
    return `import { SimpleSquircle } from '@/components/ui/simple-squircle';

<SimpleSquircle
  ${formattedProps}
>
  {children}
</SimpleSquircle>`;
  };

  // Function to copy code to clipboard
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setShowToast(true);
  };

  // Group props by category for better display
  const groupProps = () => {
    const props = { ...squircleProps };
    const result: Record<string, Record<string, string | number | boolean | undefined>> = {
      'Dimensions': {},
      'Border Radius': {},
      'Appearance': {},
      'Border (Solid)': {},
      'Hover (Solid Border)': {},
      'Classes (Tailwind)': {}
    };
    
    // Add dimensions
    result['Dimensions'] = {
      width: props.width,
      height: props.height
    };
    
    // Add border radius
    if (usePerCornerRadius) {
      result['Border Radius'] = {
        borderRadiusTopLeft,
        borderRadiusTopRight,
        borderRadiusBottomRight,
        borderRadiusBottomLeft
      };
    } else {
      result['Border Radius'] = {
        borderRadius: props.borderRadius
      };
    }
    
    // Add appearance
    result['Appearance'] = {
      padding: props.padding
    };
    
    // Add Classes
    result['Classes (Tailwind)'] = {
      className: props.className
    };
    
    // Restored border group logic (conditional)
    if (props.border) {
        result['Border (Solid)'] = {
          border: props.border,
          borderStyle: props.borderStyle,
          borderColor: props.borderColor
        };
    }
    
    // Restored hover group logic (conditional)
    if (props.hoverEffect) {
      result['Hover (Solid Border)'] = {
        hoverEffect: props.hoverEffect,
        hoverOpacity: props.hoverOpacity,
        initialOpacity: props.initialOpacity,
        hoverTransition: props.hoverTransition
      };
    }
    
    return result;
  };

  const groupedProps = groupProps();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">SimpleSquircle Demo</h1>
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md space-y-6 h-min">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">Control Panel</h2>
          
          {/* Quick Presets */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">Quick Presets</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => {
                  setUseFixedDimensions(false);
                  setWidth('full');
                  setHeight('auto');
                  setBorderRadius(16);
                  setCustomClassName('bg-white p-6'); // Control bg/padding via className if desired, or use props
                  setPadding('1.5rem');
                  setHasBorder(true); // Use border props for solid border
                  setBorderWidth(2);
                  setBorderColor('#3b82f6');
                  setBorderStyle('solid');
                  setUseHoverBorder(false);
                }} 
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded hover:bg-blue-200"
              >
                Card
              </button>
              <button 
                onClick={() => {
                  setUseFixedDimensions(false);
                  setWidth('auto');
                  setHeight('auto');
                  setBorderRadius(8);
                  setCustomClassName('bg-black text-white px-5 py-2.5 hover:bg-gray-800 transition-colors'); // Use className for bg, text, padding, hover bg
                  setPadding('0'); // Padding controlled by className
                  setHasBorder(false); // No solid border needed
                  setBorderStyle('solid'); // Reset style
                  setUseHoverBorder(false);
                }} 
                className="px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700"
              >
                Button
              </button>
              <button 
                onClick={() => {
                  setUseFixedDimensions(false);
                  setWidth('full');
                  setHeight('auto');
                  setBorderRadius(16);
                  setCustomClassName('bg-transparent border border-dashed border-gray-300 hover:border-blue-500 transition-colors p-4'); // Use className for ALL styling including dashed border
                  setPadding('0'); // Padding controlled by className
                  setHasBorder(false); // Do not use solid border props
                  setBorderStyle('dashed'); // Set style for clarity, but className controls rendering
                  setUseHoverBorder(false);
                }} 
                className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded hover:bg-gray-200"
              >
                Drop Zone
              </button>
            </div>
          </div>
          
          {/* Dimensions */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">Dimensions</h3>
            
            <div className="flex items-center mb-2">
              <input 
                type="checkbox" 
                id="fixed-toggle" 
                checked={useFixedDimensions} 
                onChange={() => setUseFixedDimensions(!useFixedDimensions)}
                className="mr-2"
              />
              <label htmlFor="fixed-toggle" className="text-sm font-medium">
                Use Fixed Dimensions
              </label>
            </div>
            
            {useFixedDimensions ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Width (px)</label>
                  <input 
                    type="range" 
                    min="100" 
                    max="600" 
                    value={width as string} 
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span className="text-xs">{width}px</span>
                    <button 
                      onClick={() => setWidth('400')}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Height (px)</label>
                  <input 
                    type="range" 
                    min="50" 
                    max="500" 
                    value={height as string} 
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between">
                    <span className="text-xs">{height}px</span>
                    <button 
                      onClick={() => setHeight('300')}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Width</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={width as string}
                    onChange={(e) => setWidth(e.target.value)}
                  >
                    <option value="full">full (100%)</option>
                    <option value="auto">auto</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Height</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={height as string}
                    onChange={(e) => setHeight(e.target.value)}
                  >
                    <option value="full">full (100%)</option>
                    <option value="auto">auto</option>
                  </select>
                </div>
              </>
            )}
          </div>
          
          {/* Border Radius */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">Border Radius</h3>
            
            <div className="flex items-center mb-2">
              <input 
                type="checkbox" 
                id="per-corner-toggle" 
                checked={usePerCornerRadius} 
                onChange={() => setUsePerCornerRadius(!usePerCornerRadius)}
                className="mr-2"
              />
              <label htmlFor="per-corner-toggle" className="text-sm font-medium">
                Use Per-Corner Border Radius
              </label>
            </div>
            
            {usePerCornerRadius ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Top Left (px)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={borderRadiusTopLeft}
                    onChange={(e) => setBorderRadiusTopLeft(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{borderRadiusTopLeft}px</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Top Right (px)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={borderRadiusTopRight}
                    onChange={(e) => setBorderRadiusTopRight(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{borderRadiusTopRight}px</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bottom Right (px)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={borderRadiusBottomRight}
                    onChange={(e) => setBorderRadiusBottomRight(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{borderRadiusBottomRight}px</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bottom Left (px)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={borderRadiusBottomLeft}
                    onChange={(e) => setBorderRadiusBottomLeft(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{borderRadiusBottomLeft}px</span>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      setBorderRadiusTopLeft(borderRadius);
                      setBorderRadiusTopRight(borderRadius);
                      setBorderRadiusBottomRight(borderRadius);
                      setBorderRadiusBottomLeft(borderRadius);
                    }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Reset All to {borderRadius}px
                  </button>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1">Uniform Radius (px)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={borderRadius}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setBorderRadius(value);
                    setBorderRadiusTopLeft(value);
                    setBorderRadiusTopRight(value);
                    setBorderRadiusBottomRight(value);
                    setBorderRadiusBottomLeft(value);
                  }}
                  className="w-full"
                />
                <span className="text-xs">{borderRadius}px</span>
              </div>
            )}
          </div>
          
          {/* Styling */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">Styling</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">ClassName (Tailwind)</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded font-mono text-sm"
                placeholder="e.g., bg-red-500 border border-red-700 hover:bg-red-600"
                value={customClassName}
                onChange={(e) => setCustomClassName(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Apply Tailwind classes for background, text color, non-solid borders (dashed/dotted), and their hover states. Solid borders use the props below.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Padding</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., 10px 20px"
                value={padding}
                onChange={(e) => setPadding(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use CSS padding syntax (e.g., &ldquo;10px&rdquo;, &ldquo;10px 20px&rdquo;, &ldquo;10px 15px 20px 15px&rdquo;)
              </p>
            </div>
          </div>
          
          {/* Restored Border Section (for Solid Borders) */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">Border (Solid Only)</h3>
            
            <div className="flex items-center mb-2">
              <input 
                type="checkbox" 
                id="border-toggle" 
                checked={hasBorder} 
                onChange={() => setHasBorder(!hasBorder)}
                className="mr-2"
              />
              <label htmlFor="border-toggle" className="text-sm font-medium">
                Show Solid Border (Uses Props)
              </label>
            </div>
            
            {hasBorder && (
              <>
                 <div>
                   <label className="block text-sm font-medium mb-1">Border Style (Must be Solid for Props)</label>
                   <select 
                     className="w-full p-2 border border-gray-300 rounded"
                     value={borderStyle}
                     onChange={(e) => setBorderStyle(e.target.value as 'solid' | 'dashed' | 'dotted')}
                   >
                     <option value="solid">Solid (Uses Props)</option>
                     <option value="dashed">Dashed (Use className)</option>
                     <option value="dotted">Dotted (Use className)</option>
                   </select>
                   {borderStyle !== 'solid' && <p className="text-xs text-orange-600 mt-1">Apply dashed/dotted styles via className.</p>}
                 </div>

                {borderStyle === 'solid' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Solid Border Width (px)</label>
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          value={borderWidth}
                          onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                          className="w-full"
                        />
                        <span className="text-xs">{borderWidth}px</span>
                      </div>
            
                      <div>
                        <label className="block text-sm font-medium mb-1">Solid Border Color</label>
                        <div className="flex items-center">
                          <input 
                            type="color" 
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="w-8 h-8 mr-2"
                          />
                          <input
                            type="text"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            className="border border-gray-300 p-1 rounded w-24 text-sm"
                          />
                          <button 
                            onClick={() => setBorderColor('#3b82f6')}
                            className="ml-2 text-xs text-blue-600 hover:underline"
                          >
                            Reset
                          </button>
                        </div>
                      </div>

                      {/* Hover border controls for solid border */} 
                      <div className="flex items-center mb-2 mt-4">
                        <input 
                          type="checkbox" 
                          id="hover-border-toggle" 
                          checked={useHoverBorder} 
                          onChange={() => setUseHoverBorder(!useHoverBorder)}
                          className="mr-2"
                        />
                        <label htmlFor="hover-border-toggle" className="text-sm font-medium">
                          Use Hover Effect (Solid Border Props)
                        </label>
                      </div>
                      
                      {useHoverBorder && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-1">Initial Opacity ({initialBorderOpacity}%)</label>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={initialBorderOpacity}
                              onChange={(e) => setInitialBorderOpacity(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Hover Opacity ({hoverBorderOpacity}%)</label>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={hoverBorderOpacity}
                              onChange={(e) => setHoverBorderOpacity(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Transition Duration ({hoverTransitionDuration}s)</label>
                            <input 
                              type="range" 
                              min="0" 
                              max="2" 
                              step="0.1"
                              value={hoverTransitionDuration}
                              onChange={(e) => setHoverTransitionDuration(parseFloat(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </>
                      )}
                    </>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Preview and Code Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Preview</h2>
            
            <div className="w-full bg-gray-100 flex items-center justify-center p-8 rounded-md min-h-[400px]">
              <SimpleSquircle {...squircleProps}>
                <div className="text-center">{content}</div>
              </SimpleSquircle>
            </div>
          </div>
          
          {/* Current Properties */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Current Properties</h2>
            
            <div className="space-y-4">
              {Object.entries(groupedProps).map(([category, props]) => (
                <div key={category} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider mb-2">{category}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(props).map(([key, value]) => (
                      <div key={key} className="flex items-start">
                        <span className="text-sm font-medium text-gray-600 mr-2">{key}:</span>
                        <span className="text-sm text-gray-800 font-mono overflow-hidden text-ellipsis">
                          {typeof value === 'object' ? JSON.stringify(value) : value?.toString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Code */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Code</h2>
            
            <div className="relative">
              <pre className="bg-gray-800 text-white p-4 rounded-md overflow-auto text-sm">
                <code>{generateCode()}</code>
              </pre>
              <button 
                onClick={copyCodeToClipboard}
                className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs"
              >
                Copy
              </button>
            </div>
          </div>
          
          {/* Toast Notification */}
          {showToast && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
              Code copied to clipboard!
            </div>
          )}
          
          {/* Examples */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Examples</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Example (Solid Border via Props) */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Card (Solid Border via Props)</p>
                <SimpleSquircle
                  width="full"
                  height="auto"
                  borderRadius={16}
                  padding="1.5rem"
                  className="bg-white" // Background via className
                  // Solid border via props
                  border={2} 
                  borderColor="#3b82f6"
                  borderStyle="solid"
                >
                  <h3 className="font-bold text-lg mb-2">Card Title</h3>
                  <p className="text-gray-600 text-sm">
                    Solid border follows shape (uses props).
                  </p>
                </SimpleSquircle>
              </div>

              {/* Image Container (Border via Tailwind - Rectangular) */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Image (Border via Tailwind - Rectangular)</p>
                <SimpleSquircle
                  width="full"
                  height="auto"
                  borderRadius={16}
                  padding="0" // No internal padding needed
                  className="bg-white border-2 border-emerald-500" // Tailwind controls border (rect)
                >
                  <img 
                    src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="Nature landscape"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">Beautiful Nature</h3>
                    <p className="text-gray-600 text-sm">
                      Border applied via className (rectangular).
                    </p>
                  </div>
                </SimpleSquircle>
              </div>

              {/* Button Group (Borders via Tailwind - Rectangular) */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Buttons (Borders via Tailwind - Rectangular)</p>
                <div className="flex gap-4">
                  {/* Primary Button (No Border) */}
                  <SimpleSquircle
                    as="button" // Render as button
                    width="auto"
                    height="auto"
                    borderRadius={12}
                    padding="0" // Control padding via className
                    className="bg-indigo-600 text-white font-medium px-5 py-2.5 hover:bg-indigo-700 transition-colors" // No border classes
                  >
                    Primary
                  </SimpleSquircle>
                  
                  {/* Secondary Button (Border via Tailwind) */} 
                  <SimpleSquircle
                    as="button"
                    width="auto"
                    height="auto"
                    borderRadius={12}
                    padding="0"
                    className="bg-white text-indigo-600 font-medium px-5 py-2.5 border border-indigo-600 hover:bg-indigo-50 transition-colors" // Tailwind controls border (rect)
                  >
                    Secondary
                  </SimpleSquircle>
                </div>
              </div>

              {/* Hover Border Example (via Tailwind - Rectangular) */} 
              <div className="space-y-2">
                <p className="text-sm font-medium">Hover Border (via Tailwind - Rectangular)</p>
                <SimpleSquircle
                  width="full"
                  height="auto"
                  borderRadius={16}
                  padding="1.5rem"
                  className="bg-slate-50 border-2 border-transparent hover:border-blue-500 transition-colors duration-300 ease-in-out" // Tailwind hover controls border (rect)
                >
                  <h3 className="font-bold text-lg mb-2">Hover to see border</h3>
                  <p className="text-gray-600 text-sm">
                    Border appears on hover via className (rectangular).
                  </p>
                </SimpleSquircle>
              </div>
              
              {/* Dashed Border Example (via Tailwind - Rectangular) */}
              <div className="space-y-2">
                  <p className="text-sm font-medium">Dashed Border (via Tailwind - Rectangular)</p>
                  <SimpleSquircle
                      width="full"
                      height="auto"
                      borderRadius={20}
                      padding="1.5rem"
                      className="bg-amber-50 border-2 border-dashed border-amber-500" // Tailwind controls dashed border (rect)
                  >
                      <p className="text-center text-amber-800">Dashed border applied via className (rectangular).</p>
                  </SimpleSquircle>
              </div>

              {/* Solid Border via Props + Hover */}
              <div className="space-y-2">
                  <p className="text-sm font-medium">Solid Border + Hover (via Props - Follows Shape)</p>
                  <SimpleSquircle
                      width="full"
                      height="auto"
                      borderRadius={20}
                      padding="1.5rem"
                      className="bg-fuchsia-100" // Background via className
                      // Solid border + Hover via props
                      border={4}
                      borderColor="#d946ef" // Fuchsia 500
                      borderStyle="solid"
                      hoverEffect={true}
                      initialOpacity={20} // Slightly visible initially
                      hoverOpacity={100} // Fully opaque on hover
                      hoverTransition="0.2s ease-out"
                  >
                      <p className="text-center text-fuchsia-900">Solid border hover effect (uses props, follows shape).</p>
                  </SimpleSquircle>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
