'use client';

import { getVideoUrlFromBlob } from '@/app/actions/videos';
import { Sheet, SheetStack, createComponentId } from '@silk-hq/components';
import { useEffect, useRef, useState } from 'react';
import ListSheetContent from './list-sheet-content';
import ProjectSheetContent from './project-sheet-content';
import { projects } from './projects-data';
import { sheetStyles } from './sheet-styles';

// Create component IDs
const sheetStackId = createComponentId();
const listSheetId = createComponentId();
const projectSheetId = createComponentId();

// Preload component for videos
function VideoPreloader({ src }: { src: string }) {
  const [error, setError] = useState(false);

  // Handle loading events
  const handleError = () => setError(true);

  if (!src || error) return null;

  return (
    <video preload="auto" muted style={{ display: 'none' }} onError={handleError}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

// Directly export the Works component - now with a named export as well as default
export function Works() {
  const [activeSheets, setActiveSheets] = useState<string[]>([]);
  const [projectSheetDetent, setProjectSheetDetent] = useState(1);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const sheetVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [listSheetTravelEnded, setListSheetTravelEnded] = useState(false);

  // Store pre-fetched video URLs
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});
  // Track overall loading state for videos - used for preloading and initial state
  const [isLoading, setIsLoading] = useState(true);

  // Pre-fetch all video URLs when component mounts
  useEffect(() => {
    const fetchAllVideoUrls = async () => {
      setIsLoading(true);
      const urlMap: Record<string, string> = {};

      // First fetch thumbnail videos (highest priority)
      for (const project of projects) {
        if (project.thumbnail) {
          try {
            urlMap[project.thumbnail] = await getVideoUrlFromBlob(project.thumbnail);
          } catch (error) {
            console.error('Error loading thumbnail:', error);
            // Use original path as fallback
            urlMap[project.thumbnail] = project.thumbnail;
          }
        }
      }

      // Set initial URLs so thumbnails can start loading
      setVideoUrls({ ...urlMap });

      // Then fetch main project videos
      for (const project of projects) {
        if (project.fullVideo) {
          try {
            urlMap[project.fullVideo] = await getVideoUrlFromBlob(project.fullVideo);
          } catch (error) {
            console.error('Error loading full video:', error);
            urlMap[project.fullVideo] = project.fullVideo;
          }
        }
      }

      // Update with main videos
      setVideoUrls({ ...urlMap });

      // Finally fetch feature videos
      for (const project of projects) {
        if (project.featureVideo) {
          try {
            urlMap[project.featureVideo] = await getVideoUrlFromBlob(project.featureVideo);
          } catch (error) {
            console.error('Error loading feature video:', error);
            urlMap[project.featureVideo] = project.featureVideo;
          }
        }
      }

      // Final update with all videos
      setVideoUrls({ ...urlMap });
      setIsLoading(false);
    };

    fetchAllVideoUrls();
  }, []);

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
    <div className="w-full flex flex-col items-center justify-center">
      <style jsx>{sheetStyles}</style>

      <button
        onClick={() => openSheet('list-sheet')}
        disabled={isLoading}
        className={`text-white font-medium py-3 px-6 rounded-lg text-lg transition-colors duration-200 ${
          isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Loading...' : 'View My Work'}
      </button>

      {/* Hidden preload section for videos */}
      <div className="sr-only" aria-hidden="true">
        {Object.entries(videoUrls).map(([path, url]) => (
          <VideoPreloader key={path} src={url} />
        ))}
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
            <Sheet.View
              contentPlacement="bottom"
              swipeTrap={true}
              swipeOvershoot={false}
              swipeDismissal={true}
              swipe={true}
              enteringAnimationSettings={{
                easing: 'spring',
                stiffness: 520,
                damping: 45,
                mass: 1.5,
              }}
              exitingAnimationSettings={{
                easing: 'spring',
                stiffness: 380,
                damping: 55,
                mass: 2.0,
              }}
              onTravelEnd={() => {
                // Set travel ended to true when sheet finishes animating
                setListSheetTravelEnded(true);
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
                videoUrls={videoUrls}
                isListSheetScaled={isListSheetScaled}
                setActiveProjectIndex={setActiveProjectIndex}
                openSheet={openSheet}
                activeProjectIndex={activeProjectIndex}
                isProjectSheetActive={isSheetActive('project-sheet')}
                travelEnded={listSheetTravelEnded}
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
              className="universal-sheet-view"
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
                  opacity: ({ progress }) => Math.min(progress * 0.33, 0.33),
                }}
              />
              <ProjectSheetContent
                activeProjectIndex={activeProjectIndex}
                projects={projects}
                sheetVideoRefs={sheetVideoRefs}
                videoUrls={videoUrls}
              />
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>
      </SheetStack.Root>
    </div>
  );
}

// Keep default export for backward compatibility
export default Works;
