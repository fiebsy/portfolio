'use client';

import { CloseButton } from '@/components/ui/close-button';
import SquircleBadge from '@/components/ui/squircle-badge';
import { Scroll, Sheet, VisuallyHidden } from '@silk-hq/components';
import { ArrowUpRight } from 'lucide-react';
import { RefObject, useRef, useState } from 'react';
import { ChevronRightIcon, type ChevronRightIconHandle } from '../ui/chevron-right';
import SimpleSquircle from '../ui/simple-squircle';
import type { Project } from './projects-data';
import { sheetStyles } from './sheet-styles';

interface ListItemProps {
  project: Project;
  index: number;
  videoRefs: RefObject<Array<HTMLVideoElement | null>>;
  setActiveProjectIndex: (index: number) => void;
  openSheet: (sheetName: string) => void;
  isActive: boolean;
  videoUrls: Record<string, string>;
  isLoading: boolean;
}

function ListItem({
  project,
  index,
  videoRefs,
  setActiveProjectIndex,
  openSheet,
  isActive,
  videoUrls,
  isLoading,
}: ListItemProps) {
  const chevronRef = useRef<ChevronRightIconHandle>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoUrl = videoUrls[project.thumbnail] || project.thumbnail;

  const handleMouseEnter = () => {
    setIsHovering(true);
    chevronRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    chevronRef.current?.completeAnimation();
  };

  const handleClick = () => {
    chevronRef.current?.resetAnimation();
    setActiveProjectIndex(index);
    openSheet('project-sheet');
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <SimpleSquircle
      className={`w-full ${isActive ? 'bg-gray-4' : isHovering ? 'bg-gray-3' : 'bg-gray-2'} transition-colors duration-100 ease-out`}
      roundnessLevel={4}
      height="auto"
      padding={0}
      borderColor="#e9e9e9"
      border={1}
      style={{
        transform: isActive ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      <button
        key={project.id}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full flex items-center text-left gap-2 relative cursor-pointer"
      >
        {isActive && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full hidden bg-green-500 shadow-sm animate-pulse"></div>
        )}
        <div className="w-[92px] h-[80px] relative flex-shrink-0 mr-3 overflow-hidden border-r border-gray-3">
          {isLoading ? (
            <div className="w-full h-full bg-gray-5 animate-pulse"></div>
          ) : (
            <>
              {!isVideoLoaded && <div className="absolute inset-0 bg-gray-5 z-10"></div>}
              <video
                ref={(el) => {
                  if (videoRefs.current) videoRefs.current[index] = el;
                }}
                muted
                playsInline
                loop
                autoPlay
                onLoadedData={handleVideoLoaded}
                className={`w-[92px] h-full object-cover object-center safari-video-fix transition-opacity duration-300 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  display: 'block' /* Forces block display for Safari */,
                  minHeight: '100%' /* Ensures minimum height in Safari */,
                  maxWidth: '100%' /* Prevents overflow in Safari */,
                }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </>
          )}
        </div>
        <div
          className="transition-transform duration-200 ease-out space-y-0.5"
          style={{ transform: isHovering ? 'translateY(-2px)' : 'translateY(0)' }}
        >
          <h3 className="font-bold font-display text-lg sm:text-xl text-gray-13">
            {project.title}
          </h3>
          <p className="font-display  text-xs text-gray-10">
            {project.company} • {project.year}
          </p>
        </div>
        <ChevronRightIcon ref={chevronRef} className="ml-auto text-gray-13 pr-4" size={28} />
      </button>
    </SimpleSquircle>
  );
}

interface ListSheetContentProps {
  projects: Project[];
  videoRefs: RefObject<Array<HTMLVideoElement | null>>;
  isListSheetScaled: boolean;
  setActiveProjectIndex: (index: number) => void;
  openSheet: (sheetName: string) => void;
  activeProjectIndex: number | null;
  isProjectSheetActive: boolean;
  videoUrls: Record<string, string>;
  isLoading: boolean;
}

export default function ListSheetContent({
  projects,
  videoRefs,
  isListSheetScaled,
  setActiveProjectIndex,
  openSheet,
  activeProjectIndex,
  isProjectSheetActive,
  videoUrls,
  isLoading,
}: ListSheetContentProps) {
  return (
    <>
      <style jsx>{sheetStyles}</style>
      <Sheet.Content
        className="universal-sheet-content"
        style={{
          maxWidth: '420px',
          transform: isListSheetScaled ? 'translateY(-10px) scale(0.933)' : 'none',
          transformOrigin: '50% 0',
          transition: 'transform 0.3s ease 0.05s',
        }}
      >
        <Sheet.BleedingBackground className="bleeding-background" />

        {/* Close Button */}
        <div className="absolute top-5 right-5 z-20">
          <Sheet.Trigger action="dismiss" asChild>
            <CloseButton
              size={24}
              style={{
                opacity: isProjectSheetActive && activeProjectIndex !== null ? 0 : 1,
                transition: 'opacity 0.2s ease',
              }}
            />
          </Sheet.Trigger>
        </div>

        {/* Handle at the top */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
          <div className="w-16 h-2 bg-gray-5 rounded-full"></div>
        </div>

        <Scroll.Root
          className="h-auto rounded-t-[40px] overflow-hidden bg-gray-3 border-3 border-gray-6 border-b-0"
          style={{ background: 'transparent' }}
        >
          <div className="absolute top-0 left-0 w-full z-10 h-[60px] opacity-0">
            <Sheet.Handle>
              <VisuallyHidden.Root>Drag to move sheet</VisuallyHidden.Root>
            </Sheet.Handle>
          </div>

          <Scroll.View className="universal-sheet-scroll-view" scrollGestureTrap={true}>
            <Scroll.Content className="list-sheet-scroll-content">
              {/* Header with title */}
              <Sheet.Title className="text-2xl pt-[40px] mb-6 font-display text-gray-10">
                Recent projects
              </Sheet.Title>

              {/* Project List */}
              <div className="space-y-6">
                {/* Projects List */}
                <div className="flex flex-col gap-2">
                  {projects.map((project, index) => (
                    <ListItem
                      key={project.id}
                      project={project}
                      index={index}
                      videoRefs={videoRefs}
                      setActiveProjectIndex={setActiveProjectIndex}
                      openSheet={openSheet}
                      isActive={isProjectSheetActive && activeProjectIndex === index}
                      videoUrls={videoUrls}
                      isLoading={isLoading}
                    />
                  ))}
                </div>

                {/* Quick Links Section */}
                <div className="hidden pt-6 border-t border-gray-4">
                  <h3 className="text-gray-10 text-xs font-bold mb-3 uppercase tracking-widest">
                    Quick links
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <SquircleBadge
                      size="sm"
                      variant="outline"
                      rightIcon={ArrowUpRight}
                      roundnessLevel={3}
                      url="https://bnocs.com"
                    >
                      bnocs.com
                    </SquircleBadge>
                    <SquircleBadge
                      size="sm"
                      variant="outline"
                      rightIcon={ArrowUpRight}
                      roundnessLevel={3}
                      url="https://zcn.fun"
                    >
                      zcn.fun
                    </SquircleBadge>
                    <SquircleBadge
                      size="sm"
                      variant="default"
                      rightIcon={ArrowUpRight}
                      roundnessLevel={3}
                      url="https://beratrack.com"
                    >
                      beratrack.com
                    </SquircleBadge>
                    <SquircleBadge
                      size="sm"
                      variant="default"
                      rightIcon={ArrowUpRight}
                      roundnessLevel={3}
                      url="https://whop.pickaxe.it"
                    >
                      whop.pickaxe.it
                    </SquircleBadge>
                    <SquircleBadge
                      size="sm"
                      variant="default"
                      rightIcon={ArrowUpRight}
                      roundnessLevel={3}
                      url="https://pickaxe.it"
                    >
                      pickaxe.it
                    </SquircleBadge>
                    <SquircleBadge
                      size="sm"
                      variant="default"
                      rightIcon={ArrowUpRight}
                      roundnessLevel={3}
                      url="https://droppy.info"
                    >
                      droppy.info
                    </SquircleBadge>
                  </div>
                  {/* Bottom padding for safe area */}
                  <div className="h-8" />
                </div>
              </div>
            </Scroll.Content>
          </Scroll.View>
        </Scroll.Root>
      </Sheet.Content>
    </>
  );
}
