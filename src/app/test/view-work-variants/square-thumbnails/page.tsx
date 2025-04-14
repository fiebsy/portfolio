'use client';

import { Sheet, SheetStack, createComponentId } from '@silk-hq/components';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import './styles.css'; // We'll add this CSS file separately

// Create component IDs
const sheetStackId = createComponentId();
const thumbnailSheetId = createComponentId();

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

export default function SheetTest() {
  const [activeSheets, setActiveSheets] = useState<string[]>([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const sheetVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [videoSheetDetent, setVideoSheetDetent] = useState(1); // Start at 30%

  // Force bottom placement regardless of viewport size
  const contentPlacement = 'bottom';

  const openSheet = (sheetName: string) => {
    // Add the sheet to the active sheets if it's not already active
    if (!activeSheets.includes(sheetName)) {
      setActiveSheets((prev) => [...prev, sheetName]);
    }
  };

  const closeSheet = (sheetName: string) => {
    // Remove this sheet and any sheets that would be above it
    setActiveSheets((prev) => {
      const index = prev.indexOf(sheetName);
      if (index === -1) return prev;
      return prev.slice(0, index);
    });
  };

  // Check if a sheet is active (presented)
  const isSheetActive = useCallback(
    (sheetName: string) => {
      return activeSheets.includes(sheetName);
    },
    [activeSheets]
  );

  // Open a specific video sheet
  const openVideoSheet = (index: number) => {
    setActiveVideoIndex(index);
    openSheet('video');
  };

  // When closing video sheet, reset the active video index
  useEffect(() => {
    if (!isSheetActive('video')) {
      setActiveVideoIndex(null);
    }
  }, [isSheetActive]);

  // Make sure thumbnails sheet is open when video sheet is open
  useEffect(() => {
    if (isSheetActive('video') && !isSheetActive('thumbnails')) {
      setActiveSheets((prev) => ['thumbnails', ...prev.filter((s) => s !== 'thumbnails')]);
    }
  }, [isSheetActive]);

  // Define stacking animations for bottom placement
  const thumbnailsStackingAnimation = {
    translateY: ({ progress }: { progress: number }) =>
      progress <= 1 ? progress * -10 + 'px' : `calc(-12.5px + 2.5px * ${progress})`,
    scale: [1, 0.933] as [number, number],
    transformOrigin: '50% 0',
  };

  // Define video sheet detents - 30%, 60%, 90%
  const videoSheetDetents = ['30vh', '60vh', '90vh'];

  return (
    <>
      <Head>
        {/* Theme color must be in RGB format for themeColorDimming to work properly */}
        <meta name="theme-color" content="rgb(255, 255, 255)" />
      </Head>
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Sheet Test</h1>

        <button
          onClick={() => openSheet('thumbnails')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          View My Work
        </button>

        <SheetStack.Root componentId={sheetStackId}>
          <SheetStack.Outlet
            stackingAnimation={{
              scale: [1, 0.92],
              translateY: ['0px', '20px'],
              opacity: [1, 0.8],
            }}
          >
            <div></div>
          </SheetStack.Outlet>

          {/* Thumbnails Sheet */}
          <Sheet.Root
            componentId={thumbnailSheetId}
            license="commercial"
            forComponent={sheetStackId}
            presented={isSheetActive('thumbnails')}
            onPresentedChange={(presented) => {
              if (!presented) closeSheet('thumbnails');
            }}
          >
            <Sheet.Portal>
              <Sheet.View
                className="CustomSheet-view"
                contentPlacement={contentPlacement}
                nativeEdgeSwipePrevention={true}
              >
                <Sheet.Backdrop
                  className="CustomSheet-backdrop"
                  travelAnimation={{ opacity: [0, 0.33] }}
                  themeColorDimming={false}
                />
                <Sheet.Content
                  className="CustomSheet-content"
                  stackingAnimation={thumbnailsStackingAnimation}
                >
                  <div className="CustomSheet-innerContent">
                    <div className="CustomSheet-header">
                      <Sheet.Handle className="CustomSheet-handle">
                        Handle for thumbnails
                      </Sheet.Handle>
                      <Sheet.Title className="CustomSheet-title">Recent projects</Sheet.Title>
                    </div>

                    <div className="CustomSheet-body">
                      <div className="project-list space-y-4 pb-4">
                        {projects.map((project, index) => (
                          <div
                            key={project.id}
                            className="project-card bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                            onClick={() => openVideoSheet(index)}
                          >
                            <div className="flex items-center">
                              {/* Thumbnail */}
                              <div
                                className="project-thumbnail w-20 h-20 m-2 relative flex-shrink-0"
                                onMouseEnter={() => {
                                  const video = videoRefs.current[index];
                                  if (video) {
                                    video.play().catch((error) => {
                                      console.error('Error playing video:', error);
                                    });
                                  }
                                }}
                                onMouseLeave={() => {
                                  const video = videoRefs.current[index];
                                  if (video) {
                                    video.pause();
                                    video.currentTime = 0;
                                  }
                                }}
                              >
                                <video
                                  ref={(el) => {
                                    videoRefs.current[index] = el;
                                  }}
                                  src={project.thumbnail}
                                  muted
                                  playsInline
                                  loop
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Content */}
                              <div className="project-content flex-1 p-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {project.company} • {project.year}
                                </p>
                              </div>

                              {/* Arrow */}
                              <div className="project-arrow p-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Sheet.Content>
              </Sheet.View>
            </Sheet.Portal>
          </Sheet.Root>

          {/* Video Sheet */}
          <Sheet.Root
            license="commercial"
            forComponent={sheetStackId}
            presented={isSheetActive('video') && activeVideoIndex !== null}
            onPresentedChange={(presented) => {
              if (!presented) closeSheet('video');
            }}
            activeDetent={videoSheetDetent}
            onActiveDetentChange={setVideoSheetDetent}
            defaultActiveDetent={1} // Start at 30%
          >
            <Sheet.Portal>
              <Sheet.View
                className="CustomSheet-view"
                contentPlacement={contentPlacement}
                nativeEdgeSwipePrevention={true}
                detents={videoSheetDetents}
                swipeTrap={true}
                swipeOvershoot={true}
                swipeDismissal={true}
                swipe={true}
              >
                <Sheet.Backdrop
                  className="CustomSheet-backdrop"
                  travelAnimation={{
                    opacity: ({ progress }) => {
                      // Set the opacity to 0.33 as soon as we reach 30% progress (first detent)
                      // The first detent is at 30% height
                      if (progress >= 0.3) {
                        return 0.33;
                      }
                      // For progress between 0 and 30%, scale linearly
                      return (progress / 0.3) * 0.33;
                    },
                  }}
                  themeColorDimming="auto"
                />
                <Sheet.Content className="CustomSheet-content bg-white rounded-t-[24px] shadow-sm border-t border-gray-200">
                  <Sheet.BleedingBackground className="bg-white border-t border-gray-200 rounded-t-[24px] shadow-sm" />

                  <Sheet.Handle className="CustomSheet-handle">Drag to resize</Sheet.Handle>

                  {activeVideoIndex !== null && (
                    <div className="px-6 pt-2">
                      <Sheet.Title className="CustomSheet-title">
                        {projects[activeVideoIndex].title}
                      </Sheet.Title>
                      <Sheet.Description className="CustomSheet-description">
                        {projects[activeVideoIndex].company} • {projects[activeVideoIndex].year}
                      </Sheet.Description>
                    </div>
                  )}

                  <div className="CustomSheet-body px-6">
                    {activeVideoIndex !== null && (
                      <div
                        className="video-container flex items-center justify-center aspect-video mt-4"
                        onMouseEnter={() => {
                          if (activeVideoIndex !== null) {
                            const video = sheetVideoRefs.current[activeVideoIndex];
                            if (video) {
                              video.play().catch((error) => {
                                console.error('Error playing sheet video:', error);
                              });
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

                    {/* Detent control buttons */}
                    <div className="space-y-2 my-6">
                      <button
                        onClick={() => setVideoSheetDetent(1)}
                        className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        30% Height
                      </button>
                      <button
                        onClick={() => setVideoSheetDetent(2)}
                        className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        60% Height
                      </button>
                      <button
                        onClick={() => setVideoSheetDetent(3)}
                        className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        90% Height (Full)
                      </button>
                    </div>

                    <Sheet.Trigger
                      action="dismiss"
                      className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg text-center w-full hover:bg-gray-600"
                    >
                      Close
                    </Sheet.Trigger>
                  </div>
                </Sheet.Content>
              </Sheet.View>
            </Sheet.Portal>
          </Sheet.Root>
        </SheetStack.Root>
      </div>
    </>
  );
}
