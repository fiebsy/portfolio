'use client';

import { Sheet, SheetStack, createComponentId } from '@silk-hq/components';
import { useEffect, useRef, useState } from 'react';
import ListSheetContent from './list-sheet-content';
import ProjectSheetContent from './project-sheet-content';
import { projects } from './projects-data';

// Create component IDs
const sheetStackId = createComponentId();
const listSheetId = createComponentId();
const projectSheetId = createComponentId();

// Define sheet detents - using absolute units instead of viewport-relative units

// Add a stylesheet to handle special sheet configurations
const sheetStyles = `
.sheet-view {
  z-index: 1;
  top: 0;
  bottom: initial;
  height: calc(var(--silk-100-lvh-dvh-pct) + 60px);
}

.sheet-content {
  height: calc(100% - max(env(safe-area-inset-top), 6px));
  /* Remove fixed max-width to allow component-level styling */
  background-color: transparent;
}

/* Add backdrop styling for Safari fix - but allow opacity animation */
[data-sheet-backdrop] {
  background-color: rgba(0, 0, 0, 1) !important;
}

@media (min-width: 800px) {
  .sheet-content {
    height: calc(100% - max(env(safe-area-inset-top), 5vh));
  }
}
`;

export default function WorksComponent() {
  const [activeSheets, setActiveSheets] = useState<string[]>([]);
  const [projectSheetDetent, setProjectSheetDetent] = useState(1);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const sheetVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);

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

  // Calculate if the list sheet should be scaled down (when project sheets are active)
  const isListSheetScaled =
    activeSheets.includes('project-sheet') || activeSheets.includes('second-project-sheet');

  useEffect(() => {
    // Ensure "list-sheet" is open if project sheets are active
    if (
      (activeSheets.includes('project-sheet') || activeSheets.includes('second-project-sheet')) &&
      !activeSheets.includes('list-sheet')
    ) {
      setActiveSheets((prev) => ['list-sheet', ...prev.filter((s) => s !== 'list-sheet')]);
    }
  }, [activeSheets]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <style>{sheetStyles}</style>

      <button
        onClick={() => openSheet('list-sheet')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg text-lg transition-colors duration-200"
      >
        View My Work
      </button>

      <SheetStack.Root componentId={sheetStackId}>
        <SheetStack.Outlet>
          <div></div>
        </SheetStack.Outlet>

        {/* List Sheet - Bottom Sheet */}
        <Sheet.Root
          componentId={listSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive('list-sheet')}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet('list-sheet');
          }}
        >
          <Sheet.Portal>
            <Sheet.View
              contentPlacement="bottom"
              swipeTrap={true}
              swipeOvershoot={false}
              swipeDismissal={true}
              swipe={true}
              enteringAnimationSettings={{
                easing: 'spring',
                stiffness: 480,
                damping: 45,
                mass: 1.5,
              }}
            >
              <Sheet.Backdrop
                data-sheet-backdrop
                travelAnimation={{
                  opacity: ({ progress }) => Math.min(progress * 0.0, 0.0),
                }}
              />
              <ListSheetContent
                projects={projects}
                videoRefs={videoRefs}
                isListSheetScaled={isListSheetScaled}
                setActiveVideoIndex={setActiveVideoIndex}
                openSheet={openSheet}
                activeVideoIndex={activeVideoIndex}
                isProjectSheetActive={isSheetActive('project-sheet')}
              />
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>

        {/* Project Sheet */}
        <Sheet.Root
          componentId={projectSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive('project-sheet')}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet('project-sheet');
          }}
          activeDetent={projectSheetDetent}
          onActiveDetentChange={setProjectSheetDetent}
        >
          <Sheet.Portal>
            <Sheet.View
              className="sheet-view"
              contentPlacement="bottom"
              detents="max(env(safe-area-inset-bottom, 0px) + 46px, 500px)"
              swipeTrap={true}
              swipeOvershoot={false}
              swipeDismissal={true}
              swipe={true}
            >
              <Sheet.Backdrop
                data-sheet-backdrop
                travelAnimation={{
                  opacity: ({ progress }) => Math.min(progress * 0.33, 0.33),
                }}
              />
              <ProjectSheetContent
                activeVideoIndex={activeVideoIndex}
                projects={projects}
                sheetVideoRefs={sheetVideoRefs}
              />
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>
      </SheetStack.Root>
    </div>
  );
}
