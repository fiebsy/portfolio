'use client';

import { Sheet, SheetStack, createComponentId } from '@silk-hq/components';
import { useEffect, useState } from 'react';

// Create component IDs
const sheetStackId = createComponentId();
const firstSheetId = createComponentId();
const secondSheetId = createComponentId();
const thirdSheetId = createComponentId();

// Define sheet detents - using absolute units instead of viewport-relative units
const sheetDetents = [
  'calc(var(--silk-100-lvh-dvh-pct) * 0.3)', // 30% of full viewport
  'calc(var(--silk-100-lvh-dvh-pct) * 0.6)', // 60% of full viewport
  'calc(var(--silk-100-lvh-dvh-pct) * 0.9)', // 90% of full viewport
];

// Generate sample content for testing
const generateSampleParagraphs = (count: number) => {
  return Array.from(
    { length: count },
    (_, i) =>
      `This is paragraph ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  );
};

const sampleContent = generateSampleParagraphs(15);

export default function StackingTest() {
  const [activeSheets, setActiveSheets] = useState<string[]>([]);
  const [secondSheetDetent, setSecondSheetDetent] = useState(1); // Start at 30%
  const [thirdSheetDetent, setThirdSheetDetent] = useState(1); // Start at 30%

  const openSheet = (sheetName: string) => {
    if (!activeSheets.includes(sheetName)) {
      setActiveSheets((prev) => [...prev, sheetName]);
    }
  };

  const closeSheet = (sheetName: string) => {
    setActiveSheets((prev) => {
      const index = prev.indexOf(sheetName);
      if (index === -1) return prev;
      return prev.slice(0, index);
    });
  };

  const isSheetActive = (sheetName: string) => {
    return activeSheets.includes(sheetName);
  };

  // Calculate if the first sheet should be scaled down (when second or third sheet is active)
  const isFirstSheetScaled = activeSheets.includes('second') || activeSheets.includes('third');

  useEffect(() => {
    // Ensure "first" sheet is open if second or third is active
    if (
      (activeSheets.includes('second') || activeSheets.includes('third')) &&
      !activeSheets.includes('first')
    ) {
      setActiveSheets((prev) => ['first', ...prev.filter((s) => s !== 'first')]);
    }
  }, [activeSheets]);

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold mb-4">Sheet Stacking Test</h1>

      <button
        onClick={() => openSheet('first')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
      >
        Open Test Sheets
      </button>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <p className="text-center">
          Active Sheets: {activeSheets.length > 0 ? activeSheets.join(' → ') : 'None'}
        </p>
        {isSheetActive('second') && (
          <p className="text-center mt-2">
            Sheet A Height:{' '}
            {secondSheetDetent === 1 ? '30%' : secondSheetDetent === 2 ? '60%' : '90%'}
          </p>
        )}
        {isSheetActive('third') && (
          <p className="text-center mt-2">
            Sheet B Height:{' '}
            {thirdSheetDetent === 1 ? '30%' : thirdSheetDetent === 2 ? '60%' : '90%'}
          </p>
        )}
      </div>

      <SheetStack.Root componentId={sheetStackId}>
        <SheetStack.Outlet>
          <div></div>
        </SheetStack.Outlet>

        {/* First Sheet - Root Sheet */}
        <Sheet.Root
          componentId={firstSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive('first')}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet('first');
          }}
        >
          <Sheet.Portal>
            <Sheet.View contentPlacement="bottom">
              <Sheet.Backdrop themeColorDimming="auto" />
              <Sheet.Content
                className="bg-blue-50 rounded-t-2xl p-4 flex flex-col gap-4 w-full max-w-screen-md mx-auto"
                style={{
                  transform: isFirstSheetScaled ? 'translateY(-10px) scale(0.933)' : 'none',
                  transformOrigin: '50% 0',
                  transition: 'transform 0.3s ease 0.05s',
                }}
              >
                <Sheet.BleedingBackground className="bg-blue-50" />
                <Sheet.Handle>Handle</Sheet.Handle>

                <Sheet.Title className="text-xl font-bold">Portfolio List</Sheet.Title>
                <Sheet.Description className="text-gray-600">
                  Select an item to view details.
                </Sheet.Description>

                <div className="mt-4 flex flex-col gap-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm divide-y divide-gray-100">
                    <button
                      onClick={() => openSheet('second')}
                      className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-md flex-shrink-0 mr-3"></div>
                      <div>
                        <h3 className="font-medium">Project A</h3>
                        <p className="text-sm text-gray-600">Interactive design prototype</p>
                      </div>
                      <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </button>

                    <button
                      onClick={() => openSheet('third')}
                      className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-md flex-shrink-0 mr-3"></div>
                      <div>
                        <h3 className="font-medium">Project B</h3>
                        <p className="text-sm text-gray-600">Mobile app redesign</p>
                      </div>
                      <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>

                  <Sheet.Trigger
                    action="dismiss"
                    className="mt-4 bg-gray-100 py-2 px-4 rounded-lg text-center"
                  >
                    Close List
                  </Sheet.Trigger>
                </div>
              </Sheet.Content>
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>

        {/* Second Sheet - Project A */}
        <Sheet.Root
          componentId={secondSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive('second')}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet('second');
          }}
          activeDetent={secondSheetDetent}
          onActiveDetentChange={setSecondSheetDetent}
          defaultActiveDetent={1}
        >
          <Sheet.Portal>
            <Sheet.View
              contentPlacement="bottom"
              detents={sheetDetents}
              swipeTrap={true}
              swipeOvershoot={true}
              swipeDismissal={true}
              swipe={true}
            >
              <Sheet.Backdrop themeColorDimming="auto" />
              <Sheet.Content className="bg-green-50 rounded-t-2xl flex flex-col w-full max-w-screen-sm mx-auto overflow-hidden">
                <Sheet.BleedingBackground className="bg-green-50" />

                {/* Fixed Header Section */}
                <div className="p-4 border-b border-gray-200">
                  <Sheet.Handle className="mb-4" />
                  <Sheet.Title className="text-xl font-bold">Project A</Sheet.Title>
                  <Sheet.Description className="text-gray-600 mt-1">
                    Interactive design prototype details
                  </Sheet.Description>
                </div>

                {/* Scrollable Content Section */}
                <div className="flex-1">
                  <div className="p-4 space-y-6">
                    {/* Height Controls */}
                    <div className="space-y-2 sticky top-0 bg-green-50 py-2 border-b border-gray-200">
                      <button
                        onClick={() => setSecondSheetDetent(1)}
                        className={`w-full px-4 py-2 rounded-md ${
                          secondSheetDetent === 1 ? 'bg-green-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        30% Height
                      </button>
                      <button
                        onClick={() => setSecondSheetDetent(2)}
                        className={`w-full px-4 py-2 rounded-md ${
                          secondSheetDetent === 2 ? 'bg-green-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        60% Height
                      </button>
                      <button
                        onClick={() => setSecondSheetDetent(3)}
                        className={`w-full px-4 py-2 rounded-md ${
                          secondSheetDetent === 3 ? 'bg-green-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        90% Height
                      </button>
                    </div>

                    {/* Sample Content */}
                    <div className="space-y-8">
                      {/* Stats Section */}
                      <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-green-600">{(i + 1) * 25}%</div>
                            <div className="text-sm text-gray-600">Metric {i + 1}</div>
                          </div>
                        ))}
                      </div>

                      {/* Image Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
                        ))}
                      </div>

                      {/* Text Content */}
                      {sampleContent.slice(0, 8).map((paragraph, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
                          <p className="text-gray-600">{paragraph}</p>
                        </div>
                      ))}
                    </div>

                    {/* Close Button */}
                    <Sheet.Trigger
                      action="dismiss"
                      className="w-full bg-gray-100 py-2 px-4 rounded-lg text-center mt-8"
                    >
                      Close Sheet
                    </Sheet.Trigger>
                  </div>
                </div>
              </Sheet.Content>
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>

        {/* Third Sheet - Project B */}
        <Sheet.Root
          componentId={thirdSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive('third')}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet('third');
          }}
          activeDetent={thirdSheetDetent}
          onActiveDetentChange={setThirdSheetDetent}
          defaultActiveDetent={1}
        >
          <Sheet.Portal>
            <Sheet.View
              contentPlacement="bottom"
              detents={sheetDetents}
              swipeTrap={true}
              swipeOvershoot={true}
              swipeDismissal={true}
              swipe={true}
            >
              <Sheet.Backdrop themeColorDimming="auto" />
              <Sheet.Content className="bg-blue-50 rounded-t-2xl flex flex-col w-full max-w-screen-sm mx-auto overflow-hidden">
                <Sheet.BleedingBackground className="bg-blue-50" />

                {/* Fixed Header Section */}
                <div className="p-4 border-b border-gray-200">
                  <Sheet.Handle className="mb-4" />
                  <Sheet.Title className="text-xl font-bold">Project B</Sheet.Title>
                  <Sheet.Description className="text-gray-600 mt-1">
                    Mobile app redesign details
                  </Sheet.Description>
                </div>

                {/* Scrollable Content Section */}
                <div className="flex-1">
                  <div className="p-4 space-y-6">
                    {/* Height Controls */}
                    <div className="space-y-2 sticky top-0 bg-blue-50 py-2 border-b border-gray-200">
                      <button
                        onClick={() => setThirdSheetDetent(1)}
                        className={`w-full px-4 py-2 rounded-md ${
                          thirdSheetDetent === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        30% Height
                      </button>
                      <button
                        onClick={() => setThirdSheetDetent(2)}
                        className={`w-full px-4 py-2 rounded-md ${
                          thirdSheetDetent === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        60% Height
                      </button>
                      <button
                        onClick={() => setThirdSheetDetent(3)}
                        className={`w-full px-4 py-2 rounded-md ${
                          thirdSheetDetent === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        90% Height
                      </button>
                    </div>

                    {/* Sample Content */}
                    <div className="space-y-8">
                      {/* Stats Section */}
                      <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-600">{(i + 1) * 25}%</div>
                            <div className="text-sm text-gray-600">Metric {i + 1}</div>
                          </div>
                        ))}
                      </div>

                      {/* Image Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
                        ))}
                      </div>

                      {/* Text Content */}
                      {sampleContent.slice(8).map((paragraph, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                          <h3 className="text-lg font-semibold mb-2">Section {index + 9}</h3>
                          <p className="text-gray-600">{paragraph}</p>
                        </div>
                      ))}
                    </div>

                    {/* Close Button */}
                    <Sheet.Trigger
                      action="dismiss"
                      className="w-full bg-gray-100 py-2 px-4 rounded-lg text-center mt-8"
                    >
                      Close Sheet
                    </Sheet.Trigger>
                  </div>
                </div>
              </Sheet.Content>
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>
      </SheetStack.Root>
    </div>
  );
}
