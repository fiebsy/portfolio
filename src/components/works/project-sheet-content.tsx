'use client';

import { ArrowUpRight, BadgeCheck, CodeXml, Palette } from 'lucide-react';
import { Scroll, Sheet, VisuallyHidden } from '@silk-hq/components';
import { RefObject, useEffect, useRef, useState } from 'react';
import SimpleSquircle from '@/components/ui/simple-squircle';
import SquircleBadge from '@/components/ui/squircle-badge';
import { CloseButton } from '@/components/ui/close-button';
import { getVideoUrlFromBlob } from '@/app/actions/videos';
import type { Project } from './projects-data';
import { sheetStyles } from './sheet-styles';
import Image from 'next/image';

// Map tech stack names to their SVG paths
const techLogos: Record<string, string> = {
  React: '/svg/logos/react-color.svg',
  'Next.js': '/svg/logos/nextjs.svg',
  TypeScript: '/svg/logos/ts-color.svg',
  'Tailwind CSS': '/svg/logos/tailwind-color.svg',
  GraphQL: '/svg/logos/graphql-color.svg',
  Firebase: '/svg/logos/firebase-color.svg',
  BigQuery: '/svg/logos/bigquery-color.svg',
  'OpenAI API': '/svg/logos/openai.svg',
  'Nevo Charts': '/svg/logos/framer-color.svg',
  Figma: '/svg/logos/figma-color.svg',
  Lottie: '/svg/logos/lottie.svg',
};

interface ProjectSheetContentProps {
  activeProjectIndex: number | null;
  projects: Project[];
  sheetVideoRefs: RefObject<Array<HTMLVideoElement | null>>;
}

export default function ProjectSheetContent({
  activeProjectIndex,
  projects,
  sheetVideoRefs,
}: ProjectSheetContentProps) {
  const playAttemptRef = useRef<number>(0);
  const [mainVideoUrl, setMainVideoUrl] = useState<string>('');
  const [featureVideoUrl, setFeatureVideoUrl] = useState<string>('');

  // Fetch video URLs from Vercel Blob when the active project changes
  useEffect(() => {
    const fetchVideoUrls = async () => {
      if (activeProjectIndex !== null) {
        const project = projects[activeProjectIndex];
        const mainUrl = await getVideoUrlFromBlob(project.fullVideo);
        const featureUrl = await getVideoUrlFromBlob(project.featureVideo);

        setMainVideoUrl(mainUrl);
        setFeatureVideoUrl(featureUrl);
      }
    };

    fetchVideoUrls();
  }, [activeProjectIndex, projects]);

  // Safer approach to play video with retry logic
  const safelyPlayVideo = (videoElement: HTMLVideoElement | null) => {
    if (!videoElement) return;

    // Preload the video to ensure it's ready
    videoElement.preload = 'auto';

    // Only try to play if the video is properly loaded
    const attemptPlay = () => {
      // Check if video element still exists in the DOM
      if (!videoElement.isConnected) return;

      // Check if video is ready to play
      if (videoElement.readyState >= 2) {
        const playPromise = videoElement.play();

        // Handle the play promise properly
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // If autoplay was prevented (common on mobile)
            if (error.name === 'NotAllowedError') {
              console.log('Autoplay not allowed. User must interact first.');
            } else {
              console.log('Play error:', error.message);

              // Try again if video is still connected to DOM
              if (videoElement.isConnected && playAttemptRef.current < 3) {
                playAttemptRef.current++;
                setTimeout(attemptPlay, 300);
              }
            }
          });
        }
      } else {
        // If video isn't ready yet, wait for it
        setTimeout(attemptPlay, 100);
      }
    };

    // Start playback attempt
    attemptPlay();
  };

  // Auto-play the video when the component mounts or activeProjectIndex changes
  useEffect(() => {
    playAttemptRef.current = 0;

    if (activeProjectIndex !== null) {
      const video = sheetVideoRefs.current[activeProjectIndex];

      // Add event listeners for better playback control
      if (video) {
        // Handle video loading
        const handleCanPlay = () => {
          safelyPlayVideo(video);
        };

        // Setup listeners
        video.addEventListener('canplaythrough', handleCanPlay);
        video.addEventListener('loadeddata', handleCanPlay);

        // Initial play attempt (if already loaded)
        safelyPlayVideo(video);

        // Cleanup
        return () => {
          // Only run if video is still in DOM
          if (video.isConnected) {
            video.removeEventListener('canplaythrough', handleCanPlay);
            video.removeEventListener('loadeddata', handleCanPlay);

            // Try to safely pause
            try {
              video.pause();
              video.currentTime = 0;
            } catch {
              // Ignore errors from trying to pause
            }
          }
        };
      }
    }
  }, [activeProjectIndex, sheetVideoRefs, mainVideoUrl]);

  return (
    <>
      <style jsx>{sheetStyles}</style>
      <Sheet.Content
        className="long-sheet-content"
        style={{
          maxWidth: '800px',
        }}
      >
        <Sheet.BleedingBackground className="bleeding-background" />

        {/* Close Button */}
        <div className="absolute top-5 right-5 z-20">
          <Sheet.Trigger action="dismiss" asChild>
            <CloseButton size={24} />
          </Sheet.Trigger>
        </div>

        {/* Handle at the top */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
          <div className="w-16 h-2 bg-gray-5 rounded-full"></div>
        </div>

        <Scroll.Root
          className="h-full rounded-t-[40px] overflow-hidden bg-gray-1 border-3 border-gray-6 border-b-0"
          style={{ background: 'transparent' }}
        >
          <div className="absolute top-0 left-0 w-full z-10 h-[400px] opacity-0">
            <Sheet.Handle>
              <VisuallyHidden.Root>Drag to move sheet</VisuallyHidden.Root>
            </Sheet.Handle>
          </div>

          <Scroll.View className="long-sheet-scroll-view" scrollGestureTrap={true}>
            <Scroll.Content className="project-sheet-scroll-content">
              {activeProjectIndex !== null && (
                <div className="flex flex-col">
                  {/* Hero Section: Video + Title */}
                  <div className="mb-8">
                    <Sheet.Title asChild>
                      <div>
                        {/* Video */}
                        <div className="w-full overflow-hidden mb-12 ">
                          <video
                            ref={(el) => {
                              if (activeProjectIndex !== null) {
                                sheetVideoRefs.current[activeProjectIndex] = el;
                              }
                            }}
                            muted
                            playsInline
                            loop
                            preload="auto"
                            className="w-full safari-video-fix"
                            style={{
                              display: 'block',
                              width: '100%',
                              height: 'auto',
                            }}
                          >
                            <source
                              src={
                                mainVideoUrl ||
                                (activeProjectIndex !== null
                                  ? projects[activeProjectIndex].fullVideo
                                  : '')
                              }
                              type="video/mp4"
                            />
                            Your browser does not support HTML video.
                          </video>
                        </div>

                        {/* Title Content */}
                        <div className="mx-auto px-6" style={{ maxWidth: '600px' }}>
                          <div className="flex flex-col space-y-2">
                            <p className="text-md text-gray-11 font-medium">
                              <a
                                href={projects[activeProjectIndex].companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 hover:text-gray-13 transition-colors"
                              >
                                {projects[activeProjectIndex].company}
                              </a>{' '}
                              • {projects[activeProjectIndex].year}
                            </p>
                            <div className="flex items-center justify-between">
                              <h2 className="text-4xl font-display font-bold text-gray-16">
                                {projects[activeProjectIndex].title}
                              </h2>
                              <div className="flex flex-wrap gap-2 ml-4">
                                {projects[activeProjectIndex].roles.some((role) =>
                                  role.includes('Design')
                                ) && (
                                  <SquircleBadge
                                    size="sm"
                                    variant="default"
                                    leftIcon={Palette}
                                    roundnessLevel={3}
                                  >
                                    Designer
                                  </SquircleBadge>
                                )}
                                {projects[activeProjectIndex].roles.some((role) =>
                                  role.includes('Engineering')
                                ) && (
                                  <SquircleBadge
                                    size="sm"
                                    variant="default"
                                    leftIcon={CodeXml}
                                    roundnessLevel={3}
                                  >
                                    Engineer
                                  </SquircleBadge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Sheet.Title>
                  </div>

                  {/* Main Content Container */}
                  <div className="px-6 mx-auto w-full flex flex-col" style={{ maxWidth: '600px' }}>
                    {/* SECTION 2 (WAS 1): Project Summary */}
                    <section className="mb-32">
                      <SimpleSquircle
                        className="bg-gray-4 w-full relative overflow-hidden"
                        roundnessLevel={3}
                        padding="24px"
                        border={1}
                        borderColor="#e9e9e9"
                        height="320px"
                      >
                        {/* Dot pattern overlay */}
                        <div
                          className="absolute inset-0 opacity-5 pointer-events-none"
                          style={{
                            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                            backgroundSize: '16px 16px',
                          }}
                        ></div>
                        <div className="w-full h-full flex flex-col justify-between relative z-10">
                          <div className="absolute top-0 left-0">
                            <h3 className="uppercase tracking-widest text-xs font-bold text-gray-10/40 mb-0 hidden">
                              Overview
                            </h3>
                          </div>
                          {/* Centered text content */}
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="font-display text-2xl max-w-[80%] text-left">
                              {projects[activeProjectIndex].formattedSummary ? (
                                <>
                                  <span className="text-gray-16">
                                    {projects[activeProjectIndex].formattedSummary.firstPart}
                                  </span>{' '}
                                  <span className="text-gray-10">
                                    {projects[activeProjectIndex].formattedSummary.secondPart}
                                  </span>
                                </>
                              ) : (
                                <span className="text-gray-16">
                                  {projects[activeProjectIndex].summary}
                                </span>
                              )}
                            </p>
                          </div>
                          {/* Spacer div to push content up from bottom if needed */}
                          <div />
                        </div>
                      </SimpleSquircle>
                    </section>

                    {/* ADDED: Overview Section */}
                    {projects[activeProjectIndex]?.overviewSection && (
                      <section className="mb-12">
                        <h3 className="uppercase tracking-widest text-xs font-bold text-gray-10 mb-5">
                          Overview
                        </h3>
                        <p className="text-gray-11 leading-7 text-lg font-semibold">
                          {projects[activeProjectIndex].overviewSection}
                        </p>
                      </section>
                    )}

                    {/* SECTION 1 (WAS 2): Problem/Solution + Video + Role */}
                    <section className="mb-32">
                      {/* Problem & Solution Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <div>
                          <SimpleSquircle
                            className="bg-red-50/20 relative overflow-hidden"
                            roundnessLevel={3}
                            padding="24px"
                            border={1}
                            borderColor="#F0E8E8"
                            height="200px"
                          >
                            {/* Dot pattern overlay */}
                            <div
                              className="absolute inset-0 opacity-5 pointer-events-none"
                              style={{
                                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                                backgroundSize: '16px 16px',
                              }}
                            ></div>
                            <div className="w-full h-full flex flex-col justify-between relative z-10">
                              <div className="flex items-center gap-2">
                                <h3 className="uppercase tracking-widest text-xs font-bold text-red-800/30 mb-0">
                                  Problem
                                </h3>
                              </div>
                              <p className="font-semibold leading-7 max-w-[400px] text-red-900/90">
                                {projects[activeProjectIndex].problem}
                              </p>
                            </div>
                          </SimpleSquircle>
                        </div>

                        <div>
                          <SimpleSquircle
                            className="bg-green-50/10 relative overflow-hidden"
                            roundnessLevel={3}
                            padding="24px"
                            border={1}
                            borderColor="#E8F0E8"
                            height="200px"
                          >
                            {/* Dot pattern overlay */}
                            <div
                              className="absolute inset-0 opacity-5 pointer-events-none"
                              style={{
                                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                                backgroundSize: '16px 16px',
                              }}
                            ></div>
                            <div className="w-full h-full flex flex-col justify-between relative z-10">
                              <div className="flex items-center gap-2">
                                <h3 className="uppercase tracking-widest text-xs font-bold text-green-800/30 mb-0">
                                  Solution
                                </h3>
                              </div>
                              <p className="font-semibold leading-7 max-w-[400px] text-green-900/90">
                                {projects[activeProjectIndex].solution}
                              </p>
                            </div>
                          </SimpleSquircle>
                        </div>
                      </div>

                      {/* Feature Demo Video */}
                      <div className="mb-12">
                        <SimpleSquircle
                          className="bg-gray-5 w-full overflow-hidden"
                          roundnessLevel={3}
                          padding="0"
                          border={1}
                          borderColor="#e9e9e9"
                          height="320px"
                        >
                          <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            className="w-full h-full object-cover"
                          >
                            <source
                              src={
                                featureVideoUrl ||
                                (activeProjectIndex !== null
                                  ? projects[activeProjectIndex].featureVideo
                                  : '')
                              }
                              type="video/mp4"
                            />
                            Your browser does not support HTML video.
                          </video>
                        </SimpleSquircle>
                      </div>

                      {/* My Role in the Build */}
                      <div className="grid grid-cols-1 gap-8">
                        <div>
                          <h3 className="uppercase tracking-widest text-xs font-bold text-gray-15 mb-5">
                            My role in the build
                          </h3>
                          <p className="text-gray-11 leading-7 text-lg font-semibold">
                            {projects[activeProjectIndex].role}
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Subtle separator line */}
                    <div className="w-full h-px hidden bg-gray-6/50 mb-32" />

                    {/* SECTION 3: Technical Details (Reordered Internally) */}
                    <section className="flex flex-col gap-12">
                      {/* Impact & Metrics */}
                      <div>
                        <h3 className="uppercase tracking-widest text-xs font-bold text-gray-10 mb-3">
                          Impact & Metrics
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {projects[activeProjectIndex].metrics.map((metric, index) => (
                            <SimpleSquircle
                              key={index}
                              className="bg-gray-2 flex flex-col items-center justify-center text-center"
                              roundnessLevel={3}
                              padding="16px"
                              border={1}
                              borderColor="#e9e9e9"
                              height="100px"
                            >
                              <div className="text-2xl font-bold text-gray-15">{metric.value}</div>
                              <div className="text-sm text-gray-11 mt-1 font-medium">
                                {metric.label}
                              </div>
                            </SimpleSquircle>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="uppercase tracking-widest text-xs font-bold text-gray-10 mb-5">
                          Key Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                          {projects[activeProjectIndex].keyFeatures.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <BadgeCheck
                                size={14}
                                className="text-gray-13 mt-[6px] flex-shrink-0 stroke-[2.5]"
                              />
                              <p className="text-gray-13 text-sm font-medium">{feature}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Section */}
                      <div>
                        <h3 className="uppercase tracking-widest text-xs font-bold text-gray-10 mb-3">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {projects[activeProjectIndex].techStack.map((tech, index) => (
                            <SimpleSquircle
                              key={index}
                              className="bg-gray-2"
                              roundnessLevel={3}
                              padding="8px 12px"
                              border={1}
                              borderColor="#e9e9e9"
                            >
                              <div className="flex items-center">
                                {techLogos[tech] && (
                                  <div className="flex items-center justify-center w-6 h-6 mr-[6px]">
                                    <Image
                                      src={techLogos[tech]}
                                      alt={tech}
                                      width={20}
                                      height={20}
                                      className="h-4.5 w-4.5 object-contain"
                                    />
                                  </div>
                                )}
                                <span className="text-gray-13 font-medium text-sm">{tech}</span>
                              </div>
                            </SimpleSquircle>
                          ))}
                        </div>
                      </div>

                      {/* Live Links */}
                      {projects[activeProjectIndex].liveUrl && (
                        <div>
                          <h3 className="uppercase tracking-widest text-xs font-bold text-gray-10 mb-3">
                            View Live
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <SimpleSquircle
                              className="bg-gray-2"
                              roundnessLevel={3}
                              padding="10px 14px"
                              border={1}
                              borderColor="#e9e9e9"
                            >
                              <a
                                href={projects[activeProjectIndex].liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-13 font-medium text-sm"
                              >
                                {projects[activeProjectIndex].liveUrl.replace(/^https?:\/\//, '')}
                                <ArrowUpRight className="ml-1 w-4 h-4" />
                              </a>
                            </SimpleSquircle>
                          </div>
                        </div>
                      )}
                    </section>

                    {/* Bottom padding for safe area */}
                    <div className="h-16" />
                  </div>
                </div>
              )}
            </Scroll.Content>
          </Scroll.View>
        </Scroll.Root>
      </Sheet.Content>
    </>
  );
}
