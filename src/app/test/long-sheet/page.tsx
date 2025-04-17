'use client';

import { Scroll, Sheet, VisuallyHidden, createComponentId } from '@silk-hq/components';
import { useState } from 'react';

// Create component IDs
const sheetId = createComponentId();

// Sheet styles for proper scrolling
const sheetStyles = `
  .long-sheet-view {
    z-index: 1;
    top: 0;
    bottom: initial;
    /* Adding 60px to make it fully visible below iOS Safari's bottom UI */
    height: calc(var(--silk-100-lvh-dvh-pct) + 60px);
    overflow: hidden;
  }

  .long-sheet-scroll-view {
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
  }

  .long-sheet-scroll-content {
    height: auto;
    min-height: 100%;
    padding: 60px 40px 0px 40px;
  }

  .long-sheet-content {
    height: calc(100% - max(env(safe-area-inset-top), 80px));
    max-width: 800px;
    background-color: var(--color-gray-10);
    border-radius: 40px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }

`;

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

const sampleContent = generateSampleParagraphs(20);

export default function LongSheetDemo() {
  const [isSheetPresented, setIsSheetPresented] = useState(false);

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <style>{sheetStyles}</style>
      <h1 className="text-3xl font-bold mb-4">Long Sheet with Scroll Demo</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setIsSheetPresented(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Open Sheet
        </button>
      </div>

      <Sheet.Root
        componentId={sheetId}
        license="commercial"
        presented={isSheetPresented}
        onPresentedChange={setIsSheetPresented}
      >
        <Sheet.Portal>
          <Sheet.View
            className="long-sheet-view"
            detents="max(env(safe-area-inset-bottom, 0px) + 46px, 400px)"
            contentPlacement="center"
            swipeOvershoot={false}
            swipeDismissal={true}
            nativeEdgeSwipePrevention={true}
            enteringAnimationSettings={{
              easing: 'spring',
              stiffness: 480,
              damping: 45,
              mass: 1.5,
            }}
            swipeTrap={true}
          >
            <Sheet.Backdrop className="bg-gray-12" />
            <Sheet.Content className="long-sheet-content ">
              <Sheet.BleedingBackground className="" />

              {/* Fixed Close Button - Absolutely positioned */}
              <div className="absolute top-4 right-4 z-10">
                <Sheet.Trigger
                  action="dismiss"
                  className="bg-gray-10 hover:bg-gray-12 text-white font-medium rounded-full w-10 h-10 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Sheet.Trigger>
              </div>

              {/* Scrollable Content - Key structure from example */}
              <Scroll.Root className="h-full rounded-t-4xl overflow-hidden bg-gray-1 border-3 border-gray-6  ">
                <div className="absolute top-0 left-0 w-full h-[400px] z-10 opacity-0">
                  <Sheet.Handle>
                    <VisuallyHidden.Root>Drag to move sheet</VisuallyHidden.Root>
                  </Sheet.Handle>
                </div>
                <Scroll.View className="long-sheet-scroll-view" scrollGestureTrap={true}>
                  <Scroll.Content className="long-sheet-scroll-content ">
                    <Sheet.Title className="text-2xl font-bold mb-2">
                      Long Scrollable Content
                    </Sheet.Title>
                    <Sheet.Description className="text-gray-11 mb-6">
                      This example shows a sheet with scrollable content and a fixed close button.
                    </Sheet.Description>

                    {/* Sample Content */}
                    <div className="space-y-6">
                      {/* Image Placeholder */}
                      <div className="w-full aspect-video bg-gray-3 rounded-lg flex items-center justify-center text-gray-10">
                        Image Placeholder
                      </div>

                      {/* Stats Section */}
                      <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="bg-white p-4 rounded-lg shadow-subtle-17">
                            <div className="text-2xl font-bold text-fuego-7">{(i + 1) * 25}%</div>
                            <div className="text-sm text-gray-11">Metric {i + 1}</div>
                          </div>
                        ))}
                      </div>

                      {/* Content Cards */}
                      {sampleContent.map((paragraph, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-subtle-17">
                          <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
                          <p className="text-gray-11">{paragraph}</p>
                        </div>
                      ))}

                      {/* Scroll controls */}
                      <div className="flex gap-2 pt-6 mb-6">
                        <Scroll.Trigger
                          action={{ type: 'scroll-to', progress: 0 }}
                          className="bg-gray-3 hover:bg-gray-4 px-4 py-2 rounded-md"
                        >
                          Scroll to Top
                        </Scroll.Trigger>
                        <Scroll.Trigger
                          action={{ type: 'scroll-to', progress: 1 }}
                          className="bg-gray-3 hover:bg-gray-4 px-4 py-2 rounded-md"
                        >
                          Scroll to Bottom
                        </Scroll.Trigger>
                      </div>

                      {/* Bottom padding to ensure content is scrollable past the safe area */}
                      <div className="h-24" />
                    </div>
                  </Scroll.Content>
                </Scroll.View>
              </Scroll.Root>
            </Sheet.Content>
          </Sheet.View>
        </Sheet.Portal>
      </Sheet.Root>
    </div>
  );
}
