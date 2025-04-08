'use client';

import Hero from '@/components/hero-section';
import Works from '@/components/works-section';
import Skills from '@/components/skills-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-17">
      <div className="max-w-xl mx-auto px-4 mt-[60px]">
        <Hero />
        <Works />
        <div className=" flex-col hidden gap-8">
          <Skills />
        </div>
      </div>
    </main>
  );
}
