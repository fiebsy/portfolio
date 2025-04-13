'use client';

import { Sheet, SheetStack, createComponentId } from '@silk-hq/components';
import { useCallback, useEffect, useState } from 'react';
import ProjectListContent from './project-list-content';
import './styles.css';
import { DetentSize, Project, SheetName } from './types';

// Create component IDs
const sheetStackId = createComponentId();
const projectListSheetId = createComponentId();
const projectDetailSheetId = createComponentId();

// Basic ProjectContent component
function ProjectContent({
  project,
  detentSize,
  onDetentChange,
}: {
  project: Project | null;
  detentSize: DetentSize;
  onDetentChange: (detent: DetentSize) => void;
}) {
  if (!project) return null;

  return (
    <div className="p-6">
      <h3 className="text-xl font-medium mb-2">{project.title}</h3>
      <p className="text-gray-11 mb-4">
        {project.company} • {project.year}
      </p>

      <div className="video-container aspect-video mb-6 rounded-lg overflow-hidden">
        <video
          src={project.thumbnail}
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-3 my-6">
        <button
          onClick={() => onDetentChange(DetentSize.Small)}
          className={`w-full py-2 rounded-md hover:bg-gray-5 text-gray-16 ${
            detentSize === DetentSize.Small ? 'bg-gray-5 font-medium' : 'bg-gray-4'
          }`}
        >
          Small View (40%)
        </button>
        <button
          onClick={() => onDetentChange(DetentSize.Medium)}
          className={`w-full py-2 rounded-md hover:bg-gray-5 text-gray-16 ${
            detentSize === DetentSize.Medium ? 'bg-gray-5 font-medium' : 'bg-gray-4'
          }`}
        >
          Medium View (60%)
        </button>
        <button
          onClick={() => onDetentChange(DetentSize.Large)}
          className={`w-full py-2 rounded-md hover:bg-gray-5 text-gray-16 ${
            detentSize === DetentSize.Large ? 'bg-gray-5 font-medium' : 'bg-gray-4'
          }`}
        >
          Full View (90%)
        </button>
      </div>

      <Sheet.Trigger
        action="dismiss"
        className="mt-4 bg-gray-13 text-gray-1 py-2 px-4 rounded-lg text-center w-full hover:bg-gray-14"
      >
        Close
      </Sheet.Trigger>
    </div>
  );
}

// Sample project data
const projects: Project[] = [
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

export default function RecentWorks() {
  const [activeSheets, setActiveSheets] = useState<string[]>([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [projectDetailDetent, setProjectDetailDetent] = useState<DetentSize>(DetentSize.Small);

  // Force bottom placement regardless of viewport size
  const contentPlacement = 'bottom';

  const openSheet = (sheetName: SheetName) => {
    // Add the sheet to the active sheets if it's not already active
    if (!activeSheets.includes(sheetName)) {
      setActiveSheets((prev) => [...prev, sheetName]);
    }
  };

  const closeSheet = (sheetName: SheetName) => {
    // Remove this sheet and any sheets that would be above it
    setActiveSheets((prev) => {
      const index = prev.indexOf(sheetName);
      if (index === -1) return prev;
      return prev.slice(0, index);
    });
  };

  // Check if a sheet is active (presented)
  const isSheetActive = useCallback(
    (sheetName: SheetName) => {
      return activeSheets.includes(sheetName);
    },
    [activeSheets]
  );

  // Open a specific project detail sheet
  const openProjectDetail = (index: number) => {
    setSelectedProjectIndex(index);
    openSheet(SheetName.ProjectDetail);
  };

  // When closing project detail sheet, reset the selected project index
  useEffect(() => {
    if (!isSheetActive(SheetName.ProjectDetail)) {
      setSelectedProjectIndex(null);
    }
  }, [isSheetActive]);

  // Make sure project list sheet is open when project detail sheet is open
  useEffect(() => {
    if (isSheetActive(SheetName.ProjectDetail) && !isSheetActive(SheetName.ProjectList)) {
      setActiveSheets((prev) => [
        SheetName.ProjectList,
        ...prev.filter((s) => s !== SheetName.ProjectList),
      ]);
    }
  }, [isSheetActive]);

  // Define project detail sheet detents - 40%, 60%, 90%
  const projectDetailDetents = ['40vh', '60vh', '90vh'];

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-16">Recent Works</h1>

      <button
        onClick={() => openSheet(SheetName.ProjectList)}
        className="bg-gray-13 hover:bg-gray-14 text-gray-1 font-medium py-2 px-4 rounded-lg"
      >
        View My Work
      </button>

      <SheetStack.Root componentId={sheetStackId}>
        <SheetStack.Outlet>
          <div></div>
        </SheetStack.Outlet>

        {/* Project List Sheet */}
        <Sheet.Root
          componentId={projectListSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive(SheetName.ProjectList)}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet(SheetName.ProjectList);
          }}
        >
          <Sheet.Portal>
            <Sheet.View
              className="CustomSheet-view"
              contentPlacement={contentPlacement}
              nativeEdgeSwipePrevention={true}
            >
              <Sheet.Backdrop className="CustomSheet-backdrop" themeColorDimming={false} />
              <ProjectListContent
                projects={projects}
                onProjectSelect={openProjectDetail}
                className="project-list-content"
              />
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>

        {/* Project Detail Sheet */}
        <Sheet.Root
          componentId={projectDetailSheetId}
          license="commercial"
          forComponent={sheetStackId}
          presented={isSheetActive(SheetName.ProjectDetail) && selectedProjectIndex !== null}
          onPresentedChange={(presented) => {
            if (!presented) closeSheet(SheetName.ProjectDetail);
          }}
          activeDetent={projectDetailDetent}
          onActiveDetentChange={setProjectDetailDetent}
          defaultActiveDetent={DetentSize.Small}
        >
          <Sheet.Portal>
            <Sheet.View
              className="CustomSheet-view"
              contentPlacement={contentPlacement}
              nativeEdgeSwipePrevention={true}
              detents={projectDetailDetents}
              swipeTrap={true}
              swipeOvershoot={true}
              swipeDismissal={true}
              swipe={true}
            >
              <Sheet.Backdrop className="CustomSheet-backdrop" themeColorDimming="auto" />
              <Sheet.Content className="CustomSheet-content project-detail-content bg-gray-1 rounded-t-[24px] shadow-sm border-t border-gray-4">
                <ProjectContent
                  project={selectedProjectIndex !== null ? projects[selectedProjectIndex] : null}
                  detentSize={projectDetailDetent}
                  onDetentChange={setProjectDetailDetent}
                />
              </Sheet.Content>
            </Sheet.View>
          </Sheet.Portal>
        </Sheet.Root>
      </SheetStack.Root>
    </div>
  );
}
