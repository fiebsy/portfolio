'use client';

import Badge from '@/components/ui/badge';
import { ChevronRightIcon, type ChevronRightIconHandle } from '@/components/ui/chevron-right';
import { CloseButton } from '@/components/ui/close-button';
import SimpleSquircle from '@/components/ui/simple-squircle';
import { Scroll, Sheet, VisuallyHidden, createComponentId } from '@silk-hq/components';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';

// Create component IDs
const sheetId = createComponentId();

// Sample project data
interface Project {
  id: number;
  title: string;
  company: string;
  year: string;
  thumbnail: string;
  fullVideo: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'User leaderboards',
    company: 'Whop',
    year: '2025',
    thumbnail: '/videos/leaderboard/thumbnail-numberflow.mp4',
    fullVideo: '/videos/leaderboard/numberflow.mp4',
  },
  {
    id: 2,
    title: 'Submissions flow',
    company: 'Whop',
    year: '2025',
    thumbnail: '/videos/content-rewards/thumbnail-card-2.mp4',
    fullVideo: '/videos/content-rewards/full-flow.mp4',
  },
  {
    id: 3,
    title: 'Crypto analytics',
    company: 'Stride',
    year: '2024',
    thumbnail: '/videos/Bnocs/thumbnail-flow2.mp4',
    fullVideo: '/videos/Bnocs/bnocs-flow.mp4',
  },
  {
    id: 4,
    title: 'Staking dashboard',
    company: 'Züs',
    year: '2024',
    thumbnail: '/videos/zcn.fun/thumbnail-chart-2.mp4',
    fullVideo: '/videos/zcn.fun/zcnfun-flow.mp4',
  },
];

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
    padding: 20px 20px 0px 20px;
  }

  .long-sheet-content {
    height: calc(100% - max(env(safe-area-inset-top), 20px));
    max-width: 384px;
    background-color: var(--color-gray-3);
    border-radius: 40px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }

  /* Safari-specific fixes */
  @supports (-webkit-touch-callout: none) {
    .safari-flex-fix {
      /* These fixes only apply to Safari */
      height: 100% !important;
      flex: 1 1 auto !important;
      min-height: 0 !important;
    }

    .safari-video-fix {
      /* Safari video fixes */
      object-fit: cover !important;
      height: 100% !important;
      width: 100% !important;
    }
  }
`;

// List Item component for project lists
function ListItem({
  project,
  index,
  videoRefs,
  setActiveVideoIndex,
  openSheet,
  isActive,
}: {
  project: Project;
  index: number;
  videoRefs: React.RefObject<Array<HTMLVideoElement | null>>;
  setActiveVideoIndex: (index: number) => void;
  openSheet: (sheetName: string) => void;
  isActive: boolean;
}) {
  const chevronRef = useRef<ChevronRightIconHandle>(null);

  const handleMouseEnter = () => {
    chevronRef.current?.startAnimation();
    const video = videoRefs.current?.[index];
    if (video) {
      video.play().catch(console.error);
    }
  };

  const handleMouseLeave = () => {
    chevronRef.current?.completeAnimation();
    const video = videoRefs.current?.[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleClick = () => {
    chevronRef.current?.resetAnimation();
    setActiveVideoIndex(index);
    openSheet('project-sheet');
  };

  return (
    <SimpleSquircle
      className="w-full bg-gray-2"
      roundnessLevel={4}
      height="auto"
      padding={0}
      borderColor="#e9e9e9"
      border={1}
    >
      <button
        key={project.id}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full flex items-center text-left gap-4 relative cursor-pointer"
      >
        {isActive && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 shadow-sm animate-pulse"></div>
        )}
        <div className="w-[92px] h-[80px] relative flex-shrink-0 mr-3 overflow-hidden border-r border-gray-3">
          <video
            ref={(el) => {
              if (videoRefs.current) videoRefs.current[index] = el;
            }}
            src={project.thumbnail}
            muted
            playsInline
            loop
            className="w-[92px] h-full object-cover object-center safari-video-fix"
            style={{
              display: 'block' /* Forces block display for Safari */,
              minHeight: '100%' /* Ensures minimum height in Safari */,
              maxWidth: '100%' /* Prevents overflow in Safari */,
            }}
          />
        </div>
        <div>
          <h3 className="font-display font-bold text-gray-16">{project.title}</h3>
          <p className="font-display font-bold text-xs text-gray-10">
            {project.company} • {project.year}
          </p>
        </div>
        <ChevronRightIcon ref={chevronRef} className="ml-auto text-gray-8 pr-4" size={28} />
      </button>
    </SimpleSquircle>
  );
}

export default function WorksDemo() {
  const [isSheetPresented, setIsSheetPresented] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isProjectSheetActive, setIsProjectSheetActive] = useState(false);

  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const openSheet = (sheetName: string) => {
    if (sheetName === 'project-sheet') {
      setIsProjectSheetActive(true);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <style>{sheetStyles}</style>
      <h1 className="text-3xl font-bold mb-4">Works List Sheet</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setIsSheetPresented(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Open Works Sheet
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
            contentPlacement="bottom"
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
            <Sheet.Backdrop className="bg-gray-12 opacity-0" />
            <Sheet.Content className="long-sheet-content max-h-[500px] ">
              <Sheet.BleedingBackground className="" />
              {/* Close Button */}
              <div className="absolute top-5 right-5 z-20 ">
                <Sheet.Trigger action="dismiss" asChild>
                  <CloseButton size={24} />
                </Sheet.Trigger>
              </div>
              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
                <div className="w-16 h-2 bg-gray-5 rounded-full"></div>
              </div>

              <Scroll.Root className="h-full rounded-t-4xl overflow-hidden bg-gray-1 border-3 border-gray-6  ">
                <div className="absolute top-0 left-0 w-full z-10 h-[40px] opacity-0">
                  <Sheet.Handle>
                    <VisuallyHidden.Root>Drag to move sheet</VisuallyHidden.Root>
                  </Sheet.Handle>
                </div>

                <Scroll.View className="long-sheet-scroll-view " scrollGestureTrap={true}>
                  <Scroll.Content className="long-sheet-scroll-content ">
                    {/* Header with title and close button */}
                    <Sheet.Title className="text-3xl pt-[20px] mb-6 font-display text-gray-16">
                      Recent projects
                    </Sheet.Title>

                    {/* Project List */}
                    <div className=" space-y-6">
                      {/* Projects List */}
                      <div className="flex flex-col gap-2">
                        {projects.map((project, index) => (
                          <ListItem
                            key={project.id}
                            project={project}
                            index={index}
                            videoRefs={videoRefs}
                            setActiveVideoIndex={setActiveVideoIndex}
                            openSheet={openSheet}
                            isActive={isProjectSheetActive && activeVideoIndex === index}
                          />
                        ))}
                      </div>

                      {/* Quick Links Section */}
                      <div className="pt-2">
                        <h3 className="text-gray-16 font-display font-bold mb-3">Quick links</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            size="sm"
                            variant="outline"
                            rightIcon={ArrowUpRight}
                            roundnessLevel={3}
                            url="https://bnocs.com"
                          >
                            bnocs.com
                          </Badge>
                          <Badge
                            size="sm"
                            variant="outline"
                            rightIcon={ArrowUpRight}
                            roundnessLevel={3}
                            url="https://zcn.fun"
                          >
                            zcn.fun
                          </Badge>
                          <Badge
                            size="sm"
                            variant="outline"
                            rightIcon={ArrowUpRight}
                            roundnessLevel={3}
                            url="https://beratrack.com"
                          >
                            beratrack.com
                          </Badge>
                          <Badge
                            size="sm"
                            variant="outline"
                            rightIcon={ArrowUpRight}
                            roundnessLevel={3}
                            url="https://whop.pickaxe.it"
                          >
                            whop.pickaxe.it
                          </Badge>
                          <Badge
                            size="sm"
                            variant="outline"
                            rightIcon={ArrowUpRight}
                            roundnessLevel={3}
                            url="https://pickaxe.it"
                          >
                            pickaxe.it
                          </Badge>
                          <Badge
                            size="sm"
                            variant="outline"
                            rightIcon={ArrowUpRight}
                            roundnessLevel={3}
                            url="https://droppy.info"
                          >
                            droppy.info
                          </Badge>
                        </div>
                        {/* Bottom padding for safe area */}
                        <div className="h-4" />
                      </div>
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
