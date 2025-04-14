'use client';

import { Sheet, SheetStack, createComponentId } from '@silk-hq/components';
import { useEffect, useRef, useState } from 'react';

// Create component IDs
const sheetStackId = createComponentId();
const listSheetId = createComponentId();
const projectSheetId = createComponentId();
const secondProjectSheetId = createComponentId();

// Define sheet detents - using absolute units instead of viewport-relative units
const sheetDetents = [
  'calc(var(--silk-100-lvh-dvh-pct) * 0.3)', // 30% of full viewport
  'calc(var(--silk-100-lvh-dvh-pct) * 0.6)', // 60% of full viewport
  'calc(var(--silk-100-lvh-dvh-pct) * 0.9)', // 90% of full viewport
];

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
  max-width: 800px;
  background-color: transparent;
}

@media (min-width: 800px) {
  .sheet-content {
    height: calc(100% - max(env(safe-area-inset-top), 5vh));
  }
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

const sampleContent = generateSampleParagraphs(15);

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Leaderboards',
    company: 'Whop',
    year: '2025',
    thumbnail: '/videos/thumbnail-numberflow.mp4',
  },
  {
    id: 2,
    title: 'Content rewards',
    company: 'Whop',
    year: '2025',
    thumbnail: '/videos/thumbnail-numberflow.mp4',
  },
  {
    id: 3,
    title: 'Social dashboard',
    company: 'Nomad',
    year: '2024',
    thumbnail: '/videos/thumbnail-numberflow.mp4',
  },
  {
    id: 4,
    title: 'Video editor',
    company: 'Acme',
    year: '2023',
    thumbnail: '/videos/thumbnail-numberflow.mp4',
  },
];

export default function PortfolioSheetDemo() {
  const [activeSheets, setActiveSheets] = useState<string[]>([]);
  const [projectSheetDetent, setProjectSheetDetent] = useState(1);
  const [secondProjectSheetDetent, setSecondProjectSheetDetent] = useState(1);
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
    <div className="p-6 flex flex-col items-center gap-4">
      <style>{sheetStyles}</style>
      <h1 className="text-3xl font-bold mb-4">Portfolio Sheet Demo</h1>

      <button
        onClick={() => openSheet('list-sheet')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
      >
        View My Work
      </button>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <p className="text-center">
          Active Sheets: {activeSheets.length > 0 ? activeSheets.join(' → ') : 'None'}
        </p>
        {isSheetActive('project-sheet') && (
          <p className="text-center mt-2">
            Project Sheet Height:{' '}
            {projectSheetDetent === 1 ? '30%' : projectSheetDetent === 2 ? '60%' : '90%'}
          </p>
        )}
        {isSheetActive('second-project-sheet') && (
          <p className="text-center mt-2">
            Second Project Sheet Height:{' '}
            {secondProjectSheetDetent === 1
              ? '30%'
              : secondProjectSheetDetent === 2
                ? '60%'
                : '90%'}
          </p>
        )}
      </div>

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
            <Sheet.View contentPlacement="bottom">
              <Sheet.Backdrop themeColorDimming="auto" />
              <Sheet.Content
                className="bg-blue-50 rounded-t-2xl p-4 flex flex-col gap-4 w-full max-w-screen-md mx-auto"
                style={{
                  transform: isListSheetScaled ? 'translateY(-10px) scale(0.933)' : 'none',
                  transformOrigin: '50% 0',
                  transition: 'transform 0.3s ease 0.05s',
                  height: 'auto',
                  maxHeight: 'calc(var(--silk-100-lvh-dvh-pct) * 0.85)',
                }}
              >
                <Sheet.BleedingBackground className="bg-blue-50" />
                <Sheet.Handle>Handle</Sheet.Handle>

                <Sheet.Title className="text-xl font-bold">Recent projects</Sheet.Title>

                <div className="mt-4 flex-1 flex flex-col gap-4 overflow-auto">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm divide-y divide-gray-100 flex-grow">
                    {projects.map((project, index) => (
                      <button
                        key={project.id}
                        onClick={() => {
                          setActiveVideoIndex(index);
                          openSheet('project-sheet');
                        }}
                        className="w-full flex items-center px-4 py-3 hover:bg-gray-50 text-left"
                      >
                        <div className="w-12 h-12 relative flex-shrink-0 mr-3 overflow-hidden rounded-md">
                          <video
                            ref={(el) => {
                              videoRefs.current[index] = el;
                            }}
                            src={project.thumbnail}
                            muted
                            playsInline
                            loop
                            className="w-full h-full object-cover"
                            onMouseEnter={() => {
                              const video = videoRefs.current[index];
                              if (video) {
                                video.play().catch(console.error);
                              }
                            }}
                            onMouseLeave={() => {
                              const video = videoRefs.current[index];
                              if (video) {
                                video.pause();
                                video.currentTime = 0;
                              }
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-gray-600">
                            {project.company} • {project.year}
                          </p>
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
                    ))}
                  </div>
                </div>

                <Sheet.Trigger
                  action="dismiss"
                  className="mt-auto bg-gray-100 py-2 px-4 rounded-lg text-center"
                >
                  Close List
                </Sheet.Trigger>
              </Sheet.Content>
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
          defaultActiveDetent={1}
        >
          <Sheet.Portal>
            <Sheet.View
              className="sheet-view"
              contentPlacement="bottom"
              detents={sheetDetents}
              swipeTrap={true}
              swipeOvershoot={false}
              swipeDismissal={true}
              swipe={true}
            >
              <Sheet.Backdrop themeColorDimming="auto" />
              <Sheet.Content className="sheet-content bg-green-50 rounded-t-2xl flex flex-col w-full max-w-screen-sm mx-auto">
                <Sheet.BleedingBackground className="bg-green-50" />

                {/* Fixed Header Section */}
                <div className="p-4 border-b border-gray-200">
                  <Sheet.Handle className="mb-4" />
                  {activeVideoIndex !== null && (
                    <>
                      <Sheet.Title className="text-xl font-bold">
                        {projects[activeVideoIndex].title}
                      </Sheet.Title>
                      <Sheet.Description className="text-gray-600 mt-1">
                        {projects[activeVideoIndex].company} • {projects[activeVideoIndex].year}
                      </Sheet.Description>
                    </>
                  )}
                </div>

                {/* Scrollable Content Section with everything inside */}
                <div className="flex-1 overflow-auto">
                  <div className="p-4 space-y-6">
                    {/* Height Controls */}
                    <div className="space-y-2 bg-green-50 py-2 border-b border-gray-200 mb-4">
                      <button
                        onClick={() => setProjectSheetDetent(1)}
                        className={`w-full px-4 py-2 rounded-md ${
                          projectSheetDetent === 1 ? 'bg-green-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        30% Height
                      </button>
                      <button
                        onClick={() => setProjectSheetDetent(2)}
                        className={`w-full px-4 py-2 rounded-md ${
                          projectSheetDetent === 2 ? 'bg-green-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        60% Height
                      </button>
                      <button
                        onClick={() => setProjectSheetDetent(3)}
                        className={`w-full px-4 py-2 rounded-md ${
                          projectSheetDetent === 3 ? 'bg-green-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        90% Height
                      </button>
                    </div>

                    {/* Video Container */}
                    {activeVideoIndex !== null && (
                      <div
                        className="video-container flex items-center justify-center aspect-video mb-6"
                        onMouseEnter={() => {
                          if (activeVideoIndex !== null) {
                            const video = sheetVideoRefs.current[activeVideoIndex];
                            if (video) {
                              video.play().catch(console.error);
                            }
                          }
                        }}
                        onMouseLeave={() => {
                          if (activeVideoIndex !== null) {
                            const video = sheetVideoRefs.current[activeVideoIndex];
                            if (video) {
                              video.pause();
                              video.currentTime = 0;
                            }
                          }
                        }}
                      >
                        <video
                          ref={(el) => {
                            if (activeVideoIndex !== null) {
                              sheetVideoRefs.current[activeVideoIndex] = el;
                            }
                          }}
                          src={projects[activeVideoIndex].thumbnail}
                          muted
                          playsInline
                          loop
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}

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

        {/* Second Project Sheet */}
        <Sheet.Root
          componentId={secondProjectSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive('second-project-sheet')}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet('second-project-sheet');
          }}
          activeDetent={secondProjectSheetDetent}
          onActiveDetentChange={setSecondProjectSheetDetent}
          defaultActiveDetent={1}
        >
          <Sheet.Portal>
            <Sheet.View
              className="sheet-view"
              contentPlacement="bottom"
              detents={sheetDetents}
              swipeTrap={true}
              swipeOvershoot={false}
              swipeDismissal={true}
              swipe={true}
            >
              <Sheet.Backdrop themeColorDimming="auto" />
              <Sheet.Content className="sheet-content bg-blue-50 rounded-t-2xl flex flex-col w-full max-w-screen-sm mx-auto">
                <Sheet.BleedingBackground className="bg-blue-50" />

                {/* Fixed Header Section */}
                <div className="p-4 border-b border-gray-200">
                  <Sheet.Handle className="mb-4" />
                  <Sheet.Title className="text-xl font-bold">Project B</Sheet.Title>
                  <Sheet.Description className="text-gray-600 mt-1">
                    Mobile app redesign details
                  </Sheet.Description>
                </div>

                {/* Scrollable Content Section with everything inside */}
                <div className="flex-1 overflow-auto">
                  <div className="p-4 space-y-6">
                    {/* Height Controls */}
                    <div className="space-y-2 bg-blue-50 py-2 border-b border-gray-200 mb-4">
                      <button
                        onClick={() => setSecondProjectSheetDetent(1)}
                        className={`w-full px-4 py-2 rounded-md ${
                          secondProjectSheetDetent === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        30% Height
                      </button>
                      <button
                        onClick={() => setSecondProjectSheetDetent(2)}
                        className={`w-full px-4 py-2 rounded-md ${
                          secondProjectSheetDetent === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        60% Height
                      </button>
                      <button
                        onClick={() => setSecondProjectSheetDetent(3)}
                        className={`w-full px-4 py-2 rounded-md ${
                          secondProjectSheetDetent === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100'
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
