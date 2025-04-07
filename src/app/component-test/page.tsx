'use client';

import Badge from '@/components/ui/badge';
import { Github, Star, ChevronRight } from 'lucide-react';

// Using local Lottie animation
const LOCATION_LOTTIE = '/lotties/location.json';

export default function ComponentTest() {
  return (
    <main className="min-h-screen bg-gray-17 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-5 mb-12">Component Testing</h1>

        {/* Badge Component */}
        <section className="space-y-6 mb-16">
          <h2 className="text-xl font-medium text-gray-5 mb-8">Badge Component</h2>
          
          {/* Text Only */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Text Only</h3>
            <div className="flex gap-4 items-center">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>

          {/* Left Icon */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Left Icon</h3>
            <div className="flex gap-4 items-center">
              <Badge size="sm" leftIcon={Github}>Github</Badge>
              <Badge size="md" leftIcon={Star}>Star</Badge>
              <Badge size="lg" leftIcon={ChevronRight}>Next</Badge>
            </div>
          </div>

          {/* Right Icon */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Right Icon</h3>
            <div className="flex gap-4 items-center">
              <Badge size="sm" rightIcon={Github}>Github</Badge>
              <Badge size="md" rightIcon={Star}>Star</Badge>
              <Badge size="lg" rightIcon={ChevronRight}>Next</Badge>
            </div>
          </div>

          {/* Icon Only */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Icon Only</h3>
            <div className="flex gap-4 items-center">
              <Badge size="sm" leftIcon={Github} iconOnly />
              <Badge size="md" leftIcon={Star} iconOnly />
              <Badge size="lg" leftIcon={ChevronRight} iconOnly />
            </div>
          </div>

          {/* Outline Variant */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Outline Variant</h3>
            <div className="flex gap-4 items-center">
              <Badge size="sm" variant="outline">Small</Badge>
              <Badge size="md" variant="outline" leftIcon={Star}>Star</Badge>
              <Badge size="lg" variant="outline" rightIcon={ChevronRight}>Next</Badge>
            </div>
          </div>

          {/* Lottie Animation */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Lottie Animation</h3>
            <div className="flex gap-4 items-center">
              <Badge size="md" leftIcon={LOCATION_LOTTIE}>Location</Badge>
              <Badge size="lg" leftIcon={LOCATION_LOTTIE} iconOnly />
            </div>
          </div>

          {/* Corner Rounding */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Corner Rounding</h3>
            <div className="flex gap-4 items-center flex-wrap">
              <Badge rounded="none">No Rounding</Badge>
              <Badge rounded="sm">Small Radius</Badge>
              <Badge rounded="md">Medium Radius</Badge>
              <Badge rounded="lg">Large Radius</Badge>
              <Badge rounded="full">Full Radius</Badge>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              <Badge rounded="none" leftIcon={Star}>With Icon None</Badge>
              <Badge rounded="sm" leftIcon={Star}>With Icon SM</Badge>
              <Badge rounded="md" leftIcon={Star}>With Icon MD</Badge>
              <Badge rounded="lg" leftIcon={Star}>With Icon LG</Badge>
              <Badge rounded="full" leftIcon={Star}>With Icon Full</Badge>
            </div>
            <div className="flex gap-4 items-center">
              <Badge rounded="none" leftIcon={Star} iconOnly />
              <Badge rounded="sm" leftIcon={Star} iconOnly />
              <Badge rounded="md" leftIcon={Star} iconOnly />
              <Badge rounded="lg" leftIcon={Star} iconOnly />
              <Badge rounded="full" leftIcon={Star} iconOnly />
            </div>
          </div>

          {/* Surface Variant */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Surface Variant</h3>
            <div className="flex gap-6 items-center">
              <Badge variant="surface" leftIcon={Star}>Surface Badge</Badge>
              <Badge variant="surface" rightIcon={ChevronRight}>Next Step</Badge>
              <Badge variant="surface" leftIcon={Github} rightIcon={ChevronRight}>View Code</Badge>
            </div>
            <div className="flex gap-6 items-center">
              <Badge size="sm" variant="surface" leftIcon={Star}>Small</Badge>
              <Badge size="md" variant="surface" leftIcon={Star}>Medium</Badge>
              <Badge size="lg" variant="surface" leftIcon={Star}>Large</Badge>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 