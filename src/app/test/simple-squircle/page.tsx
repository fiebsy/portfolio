'use client';

import { SimpleSquircle, SimpleSquircleProps } from '@/components/ui/simple-squircle';
import React, { useEffect, useRef, useState } from 'react';

// Debug component to display raw dimension data
const DebugInfo = ({
  width,
  height,
  className = '',
}: {
  width: string | number | undefined;
  height: string | number | undefined;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    clientWidth: 0,
    clientHeight: 0,
    offsetWidth: 0,
    offsetHeight: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    getBoundingClientRect: { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 },
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setDimensions({
          clientWidth: ref.current.clientWidth,
          clientHeight: ref.current.clientHeight,
          offsetWidth: ref.current.offsetWidth,
          offsetHeight: ref.current.offsetHeight,
          scrollWidth: ref.current.scrollWidth,
          scrollHeight: ref.current.scrollHeight,
          getBoundingClientRect: {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
          },
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      const currentRef = ref.current;
      if (currentRef) resizeObserver.unobserve(currentRef);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`text-xs font-mono bg-gray-800 text-white p-2 mt-2 rounded overflow-auto ${className}`}
    >
      <div className="mb-1 pb-1 border-b border-gray-700">
        <span className="text-yellow-400">Props:</span> width={JSON.stringify(width)}, height=
        {JSON.stringify(height)}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div>
            <span className="text-green-400">client:</span> {dimensions.clientWidth}×
            {dimensions.clientHeight}
          </div>
          <div>
            <span className="text-green-400">offset:</span> {dimensions.offsetWidth}×
            {dimensions.offsetHeight}
          </div>
          <div>
            <span className="text-green-400">scroll:</span> {dimensions.scrollWidth}×
            {dimensions.scrollHeight}
          </div>
        </div>
        <div>
          <div>
            <span className="text-blue-400">rect.width:</span>{' '}
            {dimensions.getBoundingClientRect.width}
          </div>
          <div>
            <span className="text-blue-400">rect.height:</span>{' '}
            {dimensions.getBoundingClientRect.height}
          </div>
          <div>
            <span className="text-blue-400">position:</span> {dimensions.getBoundingClientRect.left}
            ,{dimensions.getBoundingClientRect.top}
          </div>
        </div>
      </div>
    </div>
  );
};

// New component to debug the internal layout of SimpleSquircle
const SquircleDebugOverlay = ({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: string | number | undefined;
  height: string | number | undefined;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [actualDimensions, setActualDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setActualDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 z-10 bg-black bg-opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-1">
            Props: {width}×{height}
          </div>
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1">
            Actual: {Math.round(actualDimensions.width)}×{Math.round(actualDimensions.height)}
          </div>
          <div className="absolute inset-0 border-2 border-red-500 pointer-events-none"></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default function Home() {
  // State for toast notification
  const [showToast, setShowToast] = useState(false);

  // Dimensions
  const [width, setWidth] = useState<string | number>('auto');
  const [height, setHeight] = useState<string | number>('auto');
  const [useFixedDimensions, setUseFixedDimensions] = useState(false);

  // Roundness level
  const [roundnessLevel, setRoundnessLevel] = useState<1 | 2 | 3 | 4>(1);

  // Border settings
  const [hasBorder, setHasBorder] = useState(true);
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderColor, setBorderColor] = useState('#3b82f6');

  // Debug mode
  const [debugMode, setDebugMode] = useState(true);

  // Content
  const content = 'This is a SimpleSquircle component with iOS-style corner smoothing.';

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
    width: useFixedDimensions ? parseInt(width as string) : width,
    height: useFixedDimensions ? parseInt(height as string) : height,
    className: 'bg-white',
    padding: '1.5rem',
    border: hasBorder ? borderWidth : false,
    borderColor: borderColor,
    borderStyle: 'solid',
    roundnessLevel: roundnessLevel,
    debug: debugMode,
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">SimpleSquircle Debug</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md space-y-6 h-min">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">Control Panel</h2>

          {/* Quick Presets */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">
              Test Cases
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setUseFixedDimensions(false);
                  setWidth('auto');
                  setHeight('auto');
                  setHasBorder(true);
                }}
                className={`px-3 py-1 ${width === 'auto' && height === 'auto' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'} text-xs rounded hover:bg-blue-200`}
              >
                Auto Width/Height
              </button>
              <button
                onClick={() => {
                  setUseFixedDimensions(false);
                  setWidth('full');
                  setHeight('auto');
                  setHasBorder(true);
                }}
                className={`px-3 py-1 ${width === 'full' && height === 'auto' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'} text-xs rounded hover:bg-blue-200`}
              >
                100% Width / Auto Height
              </button>
              <button
                onClick={() => {
                  setUseFixedDimensions(true);
                  setWidth('400');
                  setHeight('200');
                  setHasBorder(true);
                }}
                className={`px-3 py-1 ${useFixedDimensions ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'} text-xs rounded hover:bg-blue-200`}
              >
                Fixed Dimensions
              </button>
            </div>
          </div>

          {/* Debug Mode */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">
              Debug Tools
            </h3>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="debug-toggle"
                checked={debugMode}
                onChange={() => setDebugMode(!debugMode)}
                className="mr-2"
              />
              <label htmlFor="debug-toggle" className="text-sm font-medium">
                Enable Debug Mode
              </label>
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">
              Dimensions
            </h3>

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
                    <option value="50%">50%</option>
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
                    <option value="50%">50%</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Roundness Levels */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">
              Roundness Level
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setRoundnessLevel(1)}
                className={`p-2 ${roundnessLevel === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg text-sm flex items-center justify-center`}
              >
                Level 1 <br />
                (Most Round)
              </button>
              <button
                onClick={() => setRoundnessLevel(2)}
                className={`p-2 ${roundnessLevel === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg text-sm flex items-center justify-center`}
              >
                Level 2
              </button>
              <button
                onClick={() => setRoundnessLevel(3)}
                className={`p-2 ${roundnessLevel === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg text-sm flex items-center justify-center`}
              >
                Level 3
              </button>
              <button
                onClick={() => setRoundnessLevel(4)}
                className={`p-2 ${roundnessLevel === 4 ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg text-sm flex items-center justify-center`}
              >
                Level 4 <br />
                (Least Round)
              </button>
            </div>
          </div>

          {/* Border */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 uppercase tracking-wider">Border</h3>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="border-toggle"
                checked={hasBorder}
                onChange={() => setHasBorder(!hasBorder)}
                className="mr-2"
              />
              <label htmlFor="border-toggle" className="text-sm font-medium">
                Show Border
              </label>
            </div>

            {hasBorder && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Border Width (px)</label>
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
                  <label className="block text-sm font-medium mb-1">Border Color</label>
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
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Preview and Code Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Preview</h2>

            <div className="w-full bg-gray-100 flex items-center justify-center p-8 rounded-md h-[400px] relative">
              <div
                className="relative"
                style={{
                  border: '1px dashed blue',
                  padding: '20px',
                  width: '100%',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#000',
                    color: '#fff',
                    padding: '2px 4px',
                    fontSize: '10px',
                  }}
                >
                  Container
                </div>
                <SimpleSquircle {...squircleProps}>
                  <div className="text-center">{content}</div>
                </SimpleSquircle>
              </div>
            </div>

            <DebugInfo width={squircleProps.width} height={squircleProps.height} className="mt-4" />
          </div>

          {/* Current Properties */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Component Properties</h2>

            <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
              {JSON.stringify(squircleProps, null, 2)}
            </pre>
          </div>

          {/* Width & Height Test Cases */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Width & Height Test Cases</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium">Auto Width & Height</h3>
                <div className="border border-dashed border-gray-300 p-4 bg-gray-50 relative">
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#000',
                      color: '#fff',
                      padding: '2px 4px',
                      fontSize: '10px',
                    }}
                  >
                    Container
                  </div>
                  <SimpleSquircle
                    width="auto"
                    height="auto"
                    className="bg-green-100"
                    debug={debugMode}
                  >
                    <div className="p-4 whitespace-nowrap">
                      <h4 className="font-bold text-lg">Auto Width Content</h4>
                      <p>This text should force the component to expand horizontally</p>
                      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full">
                        Long Button Text That Expands Width
                      </button>
                    </div>
                  </SimpleSquircle>
                  <DebugInfo width="auto" height="auto" />
                </div>
              </div>

              <div>
                <h3 className="font-medium">100% Width</h3>
                <div className="border border-dashed border-gray-300 p-4 bg-gray-50 relative">
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#000',
                      color: '#fff',
                      padding: '2px 4px',
                      fontSize: '10px',
                    }}
                  >
                    Container
                  </div>
                  <SquircleDebugOverlay width="full" height="auto">
                    <SimpleSquircle
                      width="full"
                      height="auto"
                      className="bg-yellow-100"
                      debug={debugMode}
                    >
                      <div className="p-4">100% width, auto height content</div>
                    </SimpleSquircle>
                  </SquircleDebugOverlay>
                  <DebugInfo width="full" height="auto" />
                </div>
              </div>

              <div>
                <h3 className="font-medium">50% Width</h3>
                <div className="border border-dashed border-gray-300 p-4 bg-gray-50 relative">
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#000',
                      color: '#fff',
                      padding: '2px 4px',
                      fontSize: '10px',
                    }}
                  >
                    Container
                  </div>
                  <SimpleSquircle
                    width="50%"
                    height="auto"
                    className="bg-purple-100"
                    debug={debugMode}
                  >
                    <div className="p-4">50% width, auto height content</div>
                  </SimpleSquircle>
                  <DebugInfo width="50%" height="auto" />
                </div>
              </div>

              <div>
                <h3 className="font-medium">Fixed Width & Height</h3>
                <div className="border border-dashed border-gray-300 p-4 bg-gray-50 relative">
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#000',
                      color: '#fff',
                      padding: '2px 4px',
                      fontSize: '10px',
                    }}
                  >
                    Container
                  </div>
                  <SimpleSquircle width={300} height={100} className="bg-red-100" debug={debugMode}>
                    <div className="flex items-center justify-center h-full">300px × 100px</div>
                  </SimpleSquircle>
                  <DebugInfo width={300} height={100} />
                </div>
              </div>

              <div>
                <h3 className="font-medium">100% Width & 100% Height</h3>
                <div className="border border-dashed border-gray-300 p-4 bg-gray-50 relative h-[800px]">
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#000',
                      color: '#fff',
                      padding: '2px 4px',
                      fontSize: '10px',
                    }}
                  >
                    Container (h-64)
                  </div>
                  <SimpleSquircle
                    width="100%"
                    height="auto"
                    className="bg-blue-100"
                    debug={debugMode}
                  >
                    <div className="flex items-center justify-center h-full">
                      100% width & height
                    </div>
                  </SimpleSquircle>
                  <DebugInfo width="full" height="full" />
                </div>
              </div>
            </div>
          </div>

          {/* Forced Content Tests */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Extra Test Cases</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-medium">Auto Width with Long Content</h3>
                <div className="border border-dashed border-gray-300 p-4 bg-gray-50">
                  <SimpleSquircle
                    width="auto"
                    height="auto"
                    className="bg-blue-100"
                    debug={debugMode}
                  >
                    <div className="p-4 whitespace-nowrap">
                      <span className="font-bold">
                        This is a very long piece of content that should force the auto width to
                        expand significantly beyond normal text length
                      </span>
                      <div className="mt-2">
                        <button className="px-4 py-2 bg-red-500 text-white rounded">
                          Extra Wide Button
                        </button>
                      </div>
                    </div>
                  </SimpleSquircle>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Auto Height with Tall Content</h3>
                <div className="border border-dashed border-gray-300 p-4 bg-gray-50">
                  <SimpleSquircle
                    width={200}
                    height="auto"
                    className="bg-pink-100"
                    debug={debugMode}
                  >
                    <div className="p-4">
                      Line 1<br />
                      Line 2<br />
                      Line 3<br />
                      Line 4<br />
                      Line 5<br />
                    </div>
                  </SimpleSquircle>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Full Width with Minimum Height</h3>
                <div className="border border-dashed border-gray-300 p-4 bg-gray-50">
                  <SimpleSquircle
                    width="full"
                    height={40}
                    padding="0.5rem"
                    className="bg-orange-100"
                    debug={debugMode}
                  >
                    <div className="flex items-center justify-center">Fixed height bar</div>
                  </SimpleSquircle>
                </div>
              </div>
            </div>
          </div>

          {/* Full Width & Height Tests */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Full Width & Height Tests</h2>

            <div className="space-y-6">
              {/* Basic Full Width Test */}
              <div>
                <h3 className="font-medium">Basic Full Width Test</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Container: 100% width of parent, auto height
                </p>
                <div className="border border-dashed border-blue-300 p-4 bg-gray-50 relative">
                  <SquircleDebugOverlay width="full" height="auto">
                    <SimpleSquircle
                      width="full"
                      height="auto"
                      className="bg-yellow-100"
                      debug={debugMode}
                    >
                      <div className="p-4">Full width with auto height content</div>
                    </SimpleSquircle>
                  </SquircleDebugOverlay>
                </div>
              </div>

              {/* Fixed Height Container with Full Width/Height Squircle */}
              <div>
                <h3 className="font-medium">Full Width & Height in Fixed Container</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Container: 100% width with fixed 200px height
                </p>
                <div className="border border-dashed border-blue-300 p-4 bg-gray-50 relative h-52">
                  <div className="absolute top-0 right-0 bg-black text-white text-xs px-1">
                    Container: h-52 (208px)
                  </div>
                  <SquircleDebugOverlay width="full" height="full">
                    <SimpleSquircle
                      width="full"
                      height="full"
                      className="bg-blue-100"
                      debug={debugMode}
                    >
                      <div className="flex items-center justify-center h-full">
                        100% width & height filling container
                      </div>
                    </SimpleSquircle>
                  </SquircleDebugOverlay>
                </div>
              </div>

              {/* Nested Container Test */}
              <div>
                <h3 className="font-medium">Nested Full Width/Height</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Container: 50% width of parent with fixed 150px height
                </p>
                <div className="border border-dashed border-blue-300 p-4 bg-gray-50 relative">
                  <div className="w-1/2 h-36 border border-dashed border-red-300 relative">
                    <div className="absolute top-0 right-0 bg-black text-white text-xs px-1">
                      50% × 150px
                    </div>
                    <SquircleDebugOverlay width="full" height="full">
                      <SimpleSquircle
                        width="full"
                        height="full"
                        className="bg-green-100"
                        debug={debugMode}
                      >
                        <div className="flex items-center justify-center h-full">
                          100% of 50% container
                        </div>
                      </SimpleSquircle>
                    </SquircleDebugOverlay>
                  </div>
                </div>
              </div>

              {/* Flex Layout Test */}
              <div>
                <h3 className="font-medium">Full Width/Height in Flex Layout</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Container: Flex parent with fixed height
                </p>
                <div className="border border-dashed border-blue-300 p-4 bg-gray-50 relative">
                  <div className="flex h-40 space-x-4">
                    <div className="w-1/2 relative">
                      <div className="absolute top-0 right-0 bg-black text-white text-xs px-1">
                        50% width
                      </div>
                      <SquircleDebugOverlay width="full" height="full">
                        <SimpleSquircle
                          width="full"
                          height="full"
                          className="bg-purple-100"
                          debug={debugMode}
                        >
                          <div className="flex items-center justify-center h-full p-4">
                            Left Column
                          </div>
                        </SimpleSquircle>
                      </SquircleDebugOverlay>
                    </div>
                    <div className="w-1/2 relative">
                      <div className="absolute top-0 right-0 bg-black text-white text-xs px-1">
                        50% width
                      </div>
                      <SquircleDebugOverlay width="full" height="full">
                        <SimpleSquircle
                          width="full"
                          height="full"
                          className="bg-pink-100"
                          debug={debugMode}
                        >
                          <div className="flex items-center justify-center h-full p-4">
                            Right Column
                          </div>
                        </SimpleSquircle>
                      </SquircleDebugOverlay>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {showToast && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
              Code copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
