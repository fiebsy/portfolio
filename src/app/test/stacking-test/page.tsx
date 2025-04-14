'use client';

import { Sheet, SheetStack, createComponentId, type SheetContentProps } from '@silk-hq/components';
import { useEffect, useState } from 'react';

// Create component IDs
const sheetStackId = createComponentId();
const firstSheetId = createComponentId();
const secondSheetId = createComponentId();

// Define stacking animation
const stackingAnimation: SheetContentProps['stackingAnimation'] = {
  translateY: ({ progress }: { progress: number }) =>
    progress <= 1 ? progress * -10 + 'px' : `calc(-12.5px + 2.5px * ${progress})`,
  scale: [1, 0.933] as [number, number],
  transformOrigin: '50% 0',
};

// Define sheet detents for second sheet
const sheetDetents = ['30vh', '60vh', '90vh'];

export default function StackingTest() {
  const [activeSheets, setActiveSheets] = useState<string[]>([]);
  const [secondSheetDetent, setSecondSheetDetent] = useState(1); // Start at 30%

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

  useEffect(() => {
    if (activeSheets.includes('second') && !activeSheets.includes('first')) {
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
            Second Sheet Height:{' '}
            {secondSheetDetent === 1 ? '30%' : secondSheetDetent === 2 ? '60%' : '90%'}
          </p>
        )}
      </div>

      <SheetStack.Root componentId={sheetStackId}>
        <SheetStack.Outlet>
          <div></div>
        </SheetStack.Outlet>

        {/* First Sheet */}
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
                stackingAnimation={stackingAnimation}
              >
                <Sheet.BleedingBackground className="bg-blue-50" />
                <Sheet.Handle>Handle</Sheet.Handle>

                <Sheet.Title className="text-xl font-bold">Test Sheet</Sheet.Title>
                <Sheet.Description className="text-gray-600">
                  Click the button below to open a sheet with expandable height.
                </Sheet.Description>

                <div className="mt-4 flex flex-col gap-4">
                  <button
                    onClick={() => openSheet('second')}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Open Expandable Sheet
                  </button>

                  <Sheet.Trigger
                    action="dismiss"
                    className="mt-4 bg-gray-100 py-2 px-4 rounded-lg text-center"
                  >
                    Close Sheet
                  </Sheet.Trigger>
                </div>
              </Sheet.Content>
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>

        {/* Second Sheet */}
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
              <Sheet.Content
                className="bg-green-50 rounded-t-2xl p-4 flex flex-col gap-4 w-full max-w-screen-sm mx-auto"
                stackingAnimation={stackingAnimation}
              >
                <Sheet.BleedingBackground className="bg-green-50" />
                <Sheet.Handle>Handle</Sheet.Handle>

                <Sheet.Title className="text-xl font-bold">Expandable Sheet</Sheet.Title>
                <Sheet.Description className="text-gray-600">
                  Drag up or use the buttons below to expand this sheet.
                </Sheet.Description>

                <div className="space-y-2 mt-4">
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

                <Sheet.Trigger
                  action="dismiss"
                  className="mt-4 bg-gray-100 py-2 px-4 rounded-lg text-center"
                >
                  Close Sheet
                </Sheet.Trigger>
              </Sheet.Content>
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>
      </SheetStack.Root>
    </div>
  );
}
