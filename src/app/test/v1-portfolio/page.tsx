'use client';

import Hero from '@/v1-components/hero-section';
import Works from '@/v1-components/works-section';
import Skills from '@/v1-components/skills-section';

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gray-17">
      <div className="max-w-xl mx-auto px-4">
        <Hero />
        <Works />
        <div className=" flex-col hidden gap-8">
          <Skills />
        </div>
      </div>
    </main>
  );
}
