'use client';

import { Sheet } from '@silk-hq/components';
import { useRef } from 'react';
import { Project, StackingAnimation } from './types';

interface ProjectListContentProps {
  projects: Project[];
  onProjectSelect: (index: number) => void;
  stackingAnimation?: StackingAnimation;
  className?: string;
}

export default function ProjectListContent({
  projects,
  onProjectSelect,
  stackingAnimation,
  className = '',
}: ProjectListContentProps) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // Define content animation for entrance and exit
  const contentAnimation = {
    transform: 'translateY(100%) => translateY(0)',
    opacity: '0 => 1',
  };

  return (
    <Sheet.Content
      className={`CustomSheet-content ${className}`}
      stackingAnimation={stackingAnimation}
      travelAnimation={contentAnimation}
    >
      <div className="CustomSheet-innerContent">
        <div className="CustomSheet-header">
          <Sheet.Handle className="mx-auto w-24 h-1.5 bg-gray-5 rounded-full my-3">
            Handle for thumbnails
          </Sheet.Handle>
          <Sheet.Title className="CustomSheet-title">Recent projects</Sheet.Title>
        </div>

        <div className="CustomSheet-body">
          <div className="project-list space-y-4 pb-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card bg-gray-1 border border-gray-4 rounded-xl overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => onProjectSelect(index)}
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
                    <h3 className="text-lg font-medium text-gray-16">{project.title}</h3>
                    <p className="text-sm text-gray-11">
                      {project.company} • {project.year}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="project-arrow p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-9"
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
  );
}
