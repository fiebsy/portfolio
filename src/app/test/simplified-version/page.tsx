'use client';

import { Sheet, SheetStack, createComponentId } from '@silk-hq/components';
import { useEffect, useRef, useState } from 'react';
import './styles.css';

// Create component IDs
const sheetStackId = createComponentId();
const thumbnailSheetId = createComponentId();
const videoSheetId = createComponentId();

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

export default function SimplifiedVersion() {
  const [activeSheets, setActiveSheets] = useState<string[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [videoSheetDetent, setVideoSheetDetent] = useState(1); // Start at 30%
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const sheetVideoRef = useRef<HTMLVideoElement | null>(null);

  // Define video sheet detents - 30%, 60%, 90%
  const videoSheetDetents = ['30vh', '60vh', '90vh'];

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

    // If video sheet is being closed, reset the active project index
    if (sheetName === 'video') {
      setActiveProjectIndex(null);
    }
  };

  // Check if a sheet is active (presented)
  const isSheetActive = (sheetName: string) => {
    return activeSheets.includes(sheetName);
  };

  // Open a specific project in the video sheet
  const openProject = (index: number) => {
    setActiveProjectIndex(index);
    openSheet('video');
  };

  // Make sure thumbnail sheet is open when video sheet is open
  useEffect(() => {
    if (isSheetActive('video') && !isSheetActive('thumbnails')) {
      setActiveSheets((prev) => ['thumbnails', ...prev.filter((s) => s !== 'thumbnails')]);
    }
  }, [activeSheets]);

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold mb-4">Simplified Sheet Demo</h1>

      <button
        onClick={() => openSheet('thumbnails')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
      >
        View My Work
      </button>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <p className="text-center">
          Active Sheets: {activeSheets.length > 0 ? activeSheets.join(' → ') : 'None'}
        </p>
        {isSheetActive('video') && (
          <p className="text-center mt-2">
            Video Sheet Detent:{' '}
            {videoSheetDetent === 1 ? '30%' : videoSheetDetent === 2 ? '60%' : '90%'}
          </p>
        )}
      </div>

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
            <Sheet.View>
              <Sheet.Backdrop themeColorDimming="auto" />
              <Sheet.Content className="sheet-content">
                <Sheet.Handle className="sheet-handle" />
                <Sheet.Title className="sheet-title">Recent projects</Sheet.Title>

                <div className="mt-4">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="project-card flex items-center p-2"
                      onClick={() => openProject(index)}
                    >
                      {/* Thumbnail */}
                      <div
                        className="project-thumbnail w-20 h-20 flex-shrink-0"
                        onMouseEnter={() => {
                          const video = videoRefs.current[index];
                          if (video) video.play().catch((err) => console.error(err));
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
                      <div className="project-content ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-500">
                          {project.company} • {project.year}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="p-2">
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
                  ))}
                </div>

                <Sheet.Trigger
                  action="dismiss"
                  className="mt-4 bg-gray-100 py-2 px-4 rounded-lg text-center w-full"
                >
                  Close
                </Sheet.Trigger>
              </Sheet.Content>
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>

        {/* Video Sheet */}
        <Sheet.Root
          componentId={videoSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive('video')}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet('video');
          }}
          activeDetent={videoSheetDetent}
          onActiveDetentChange={setVideoSheetDetent}
          defaultActiveDetent={1} // Start at 30%
        >
          <Sheet.Portal>
            <Sheet.View
              detents={videoSheetDetents}
              swipeTrap={true}
              swipeOvershoot={true}
              swipeDismissal={true}
              swipe={true}
            >
              <Sheet.Backdrop themeColorDimming="auto" />
              <Sheet.Content className="sheet-content">
                <Sheet.Handle className="sheet-handle" />

                {activeProjectIndex !== null && (
                  <>
                    <Sheet.Title className="sheet-title">
                      {projects[activeProjectIndex].title}
                    </Sheet.Title>
                    <Sheet.Description className="sheet-description">
                      {projects[activeProjectIndex].company} • {projects[activeProjectIndex].year}
                    </Sheet.Description>

                    <div
                      className="video-container"
                      onMouseEnter={() => {
                        if (sheetVideoRef.current) {
                          sheetVideoRef.current.play().catch((err) => console.error(err));
                        }
                      }}
                      onMouseLeave={() => {
                        if (sheetVideoRef.current) {
                          sheetVideoRef.current.pause();
                          sheetVideoRef.current.currentTime = 0;
                        }
                      }}
                    >
                      <video
                        ref={sheetVideoRef}
                        src={projects[activeProjectIndex].thumbnail}
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Detent control buttons */}
                    <div className="space-y-2 my-6">
                      <button
                        onClick={() => setVideoSheetDetent(1)}
                        className={`w-full px-4 py-2 rounded-md ${
                          videoSheetDetent === 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        30% Height
                      </button>
                      <button
                        onClick={() => setVideoSheetDetent(2)}
                        className={`w-full px-4 py-2 rounded-md ${
                          videoSheetDetent === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        60% Height
                      </button>
                      <button
                        onClick={() => setVideoSheetDetent(3)}
                        className={`w-full px-4 py-2 rounded-md ${
                          videoSheetDetent === 3 ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                      >
                        90% Height (Full)
                      </button>
                    </div>
                  </>
                )}

                <Sheet.Trigger
                  action="dismiss"
                  className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg text-center w-full"
                >
                  Close
                </Sheet.Trigger>
              </Sheet.Content>
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>
      </SheetStack.Root>
    </div>
  );
}
