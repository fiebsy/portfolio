'use client';

import { useEffect, useRef, useState } from 'react';
import { SimpleSquircle } from '@/components/ui/simple-squircle';

// Extended CSSStyleDeclaration interface for Safari-specific properties
interface ExtendedCSSStyleDeclaration extends CSSStyleDeclaration {
  webkitClipPath?: string;
}

// Define roundness levels (1=most round, 4=least round)
const ROUNDNESS_LEVELS = {
  // Level 1: Most rounded (previously Level 4)
  LEVEL_1: {
    name: 'Level 1 - Rounded',
    smoothing: 5.0,
    borderRadius: 30,
    pointsPerCorner: 45
  },
  // Level 2: Slightly rounded (previously Level 3) 
  LEVEL_2: {
    name: 'Level 2 - Slightly Rounded',
    smoothing: 5.5, 
    borderRadius: 42,
    pointsPerCorner: 47
  },
  // Level 3: Slightly geometric (previously Level 2)
  LEVEL_3: {
    name: 'Level 3 - Slightly Geometric',
    smoothing: 6.5,
    borderRadius: 50,
    pointsPerCorner: 48
  },
  // Level 4: Most geometric/squared, least round (previously Level 1)
  LEVEL_4: {
    name: 'Level 4 - Geometric',
    smoothing: 7.5,
    borderRadius: 70,
    pointsPerCorner: 50
  }
};

export default function SquircleSafariDebugPage() {
  const [isSafari, setIsSafari] = useState(false);
  const squircleRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });
  const [showPath, setShowPath] = useState(false);
  const [clipPathData, setClipPathData] = useState<string>('');
  
  // Selected roundness level (using Level 3 as default)
  const [roundnessLevel, setRoundnessLevel] = useState<keyof typeof ROUNDNESS_LEVELS>('LEVEL_3');
  
  // Background and border
  const [showBackground, setShowBackground] = useState(true);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.3);
  const [backgroundRadius, setBackgroundRadius] = useState(16);
  const [showBorder, setShowBorder] = useState(false);
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderColor, setBorderColor] = useState('#3b82f6');
  
  // Color settings
  const [bgColor, setBgColor] = useState('bg-blue-500');
  const [bgColorHex, setBgColorHex] = useState('#3b82f6');
  const colors = [
    { name: 'Blue', class: 'bg-blue-500', hex: '#3b82f6' },
    { name: 'Green', class: 'bg-green-500', hex: '#22c55e' },
    { name: 'Red', class: 'bg-red-500', hex: '#ef4444' },
    { name: 'Purple', class: 'bg-purple-500', hex: '#a855f7' },
    { name: 'Black', class: 'bg-black', hex: '#000000' },
  ];

  useEffect(() => {
    // Check if browser is Safari
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafariBrowser = 
      /safari/.test(userAgent) && 
      !/chrome/.test(userAgent) &&
      !/firefox/.test(userAgent) &&
      !/edg/.test(userAgent);
    
    setIsSafari(isSafariBrowser);
    
    // Extract clip path data if available (just for reference, not used in rendering)
    if (squircleRef.current) {
      const style = window.getComputedStyle(squircleRef.current) as ExtendedCSSStyleDeclaration;
      const clipPath = style.clipPath || style.webkitClipPath || '';
      const pathMatch = clipPath.match(/path\(['"]([^'"]+)['"]\)/);
      
      if (pathMatch && pathMatch[1]) {
        setClipPathData(pathMatch[1]);
      }
    }
    
    // Set border color when bgColor changes
    const colorObj = colors.find(c => c.class === bgColor);
    if (colorObj) {
      setBorderColor(colorObj.hex);
    }
    
  }, [dimensions, roundnessLevel, bgColor, colors]);

  // Handle changing color
  const handleColorChange = (colorClass: string, hexColor: string) => {
    setBgColor(colorClass);
    setBgColorHex(hexColor);
    setBorderColor(hexColor);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">SimpleSquircle Roundness Levels</h1>
      
      {isSafari && (
        <div className="mb-6 p-4 bg-amber-100 rounded-md border border-amber-300">
          <p className="font-semibold">Safari Detected!</p>
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-4">Roundness Level</h3>
            <div className="flex flex-col space-y-3">
              {(Object.keys(ROUNDNESS_LEVELS) as Array<keyof typeof ROUNDNESS_LEVELS>).map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    checked={roundnessLevel === level}
                    onChange={() => setRoundnessLevel(level)}
                    className="mr-2"
                  />
                  <span className="mr-2">{ROUNDNESS_LEVELS[level].name}</span>
                  <span className="text-xs text-gray-500">
                    (Smoothing: {ROUNDNESS_LEVELS[level].smoothing}, 
                     Radius: {ROUNDNESS_LEVELS[level].borderRadius}px)
                  </span>
                </label>
              ))}
            </div>
            
            <h4 className="text-sm font-medium mt-6 mb-2">Color</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              {colors.map(color => (
                <button 
                  key={color.class}
                  onClick={() => handleColorChange(color.class, color.hex)}
                  className={`w-8 h-8 rounded ${color.class} ${bgColor === color.class ? 'ring-2 ring-offset-2 ring-blue-600' : ''}`}
                  title={color.name}
                ></button>
              ))}
            </div>
            
            <h4 className="text-sm font-medium mt-4 mb-2">Dimensions</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="width" className="block text-sm mb-1">Width:</label>
                <input 
                  id="width"
                  type="number" 
                  value={dimensions.width} 
                  onChange={(e) => setDimensions({...dimensions, width: parseInt(e.target.value) || 0})}
                  className="border border-gray-300 p-1 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm mb-1">Height:</label>
                <input 
                  id="height"
                  type="number" 
                  value={dimensions.height} 
                  onChange={(e) => setDimensions({...dimensions, height: parseInt(e.target.value) || 0})}
                  className="border border-gray-300 p-1 rounded w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-3">Additional Options</h3>
            
            <h4 className="text-sm font-medium mt-4 mb-2">Border</h4>
            <div className="flex items-center gap-2 mb-3">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={showBorder} 
                  onChange={(e) => setShowBorder(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Show Border</span>
              </label>
            </div>
            
            {showBorder && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="borderWidth" className="block text-xs mb-1">Width: {borderWidth}px</label>
                  <input 
                    id="borderWidth"
                    type="range" 
                    min="1" 
                    max="10" 
                    value={borderWidth} 
                    onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="borderColor" className="block text-xs mb-1">Color:</label>
                  <input 
                    id="borderColor"
                    type="color" 
                    value={borderColor} 
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-full h-8"
                  />
                </div>
              </div>
            )}
            
            <h4 className="text-sm font-medium mt-4 mb-2">Background</h4>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={showBackground} 
                    onChange={(e) => setShowBackground(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Show Background</span>
                </label>
                <span className="text-sm text-gray-500">Opacity: {backgroundOpacity.toFixed(1)}</span>
              </div>
              {showBackground && (
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.1"
                  value={backgroundOpacity} 
                  onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
                  className="w-full mt-2"
                />
              )}
            </div>
            
            {showBackground && (
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <label htmlFor="bgRadius" className="text-sm">Background Radius: {backgroundRadius}px</label>
                  <span className="text-sm text-gray-500">(0-50)</span>
                </div>
                <input 
                  id="bgRadius"
                  type="range" 
                  min="0" 
                  max="50" 
                  value={backgroundRadius} 
                  onChange={(e) => setBackgroundRadius(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={showPath} 
                  onChange={(e) => setShowPath(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Show Raw Path Data</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="grid grid-cols-1 gap-8">
          <div className="relative flex justify-center items-center p-12 bg-gray-50 border border-gray-200 rounded-md">
            {/* Background conventional container */}
            {showBackground && (
              <div 
                className="absolute bg-gray-300"
                style={{
                  width: `${dimensions.width + 20}px`,
                  height: `${dimensions.height + 20}px`,
                  borderRadius: `${backgroundRadius}px`,
                  opacity: backgroundOpacity,
                  zIndex: 0
                }}
              />
            )}
            
            {/* SimpleSquircle Component using the selected roundness level */}
            <SimpleSquircle
              ref={squircleRef}
              width={dimensions.width}
              height={dimensions.height}
              cornerSmoothing={ROUNDNESS_LEVELS[roundnessLevel].smoothing}
              borderRadius={ROUNDNESS_LEVELS[roundnessLevel].borderRadius}
              pointsPerCorner={ROUNDNESS_LEVELS[roundnessLevel].pointsPerCorner}
              border={showBorder ? borderWidth : false}
              borderColor={borderColor}
              borderStyle="solid"
              style={{
                backgroundColor: bgColorHex,
              }}
            >
              <div className="flex items-center justify-center h-full text-white font-medium">
                {ROUNDNESS_LEVELS[roundnessLevel].name}
              </div>
            </SimpleSquircle>
            
            <div className="absolute top-2 right-2 bg-white bg-opacity-80 text-xs px-2 py-1 rounded-md">
              Roundness: {roundnessLevel.replace('LEVEL_', '')}
            </div>
          </div>
          
          {showPath && (
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-medium mb-2">Raw Path Data</h3>
              <pre className="text-xs bg-gray-200 p-2 rounded-md overflow-auto max-h-32">
                {clipPathData || "No path data available"}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md text-sm mt-8">
        <h2 className="text-lg font-medium mb-2">Roundness Levels Explained</h2>
        <p className="mb-3">SimpleSquircle provides four predefined roundness levels that control the appearance of corners:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="border border-gray-200 rounded-md p-3">
            <h3 className="font-medium">Level 1 - Rounded</h3>
            <p className="text-xs text-gray-600 mt-1">Most rounded corners, closer to a standard rounded rectangle. Good for buttons and interactive elements.</p>
          </div>
          
          <div className="border border-gray-200 rounded-md p-3">
            <h3 className="font-medium">Level 2 - Slightly Rounded</h3>
            <p className="text-xs text-gray-600 mt-1">Default level with a more rounded appearance while maintaining the squircle shape. Good for most UI elements.</p>
          </div>
          
          <div className="border border-gray-200 rounded-md p-3">
            <h3 className="font-medium">Level 3 - Slightly Geometric</h3>
            <p className="text-xs text-gray-600 mt-1">A balanced appearance with slightly squared corners. Good for cards and containers.</p>
          </div>
          
          <div className="border border-gray-200 rounded-md p-3">
            <h3 className="font-medium">Level 4 - Geometric</h3>
            <p className="text-xs text-gray-600 mt-1">Most geometric/squared, least round. Good for UI elements that need a more structured look.</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-xs">Each level combines specific values for border radius, corner smoothing, and points per corner to achieve a consistent look across different sizes.</p>
        </div>
      </div>
    </div>
  );
} 