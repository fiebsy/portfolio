'use client';

import Badge from '@/components/ui/badge';
import { Github, Star, ChevronRight } from 'lucide-react';
import {
  TsNeutralLogo,
  TsColorLogo,
  ReactLogo,
  ReactColorLogo,
  TailwindLogo,
  TailwindColorLogo,
  FirebaseLogo,
  FirebaseColorLogo,
  FigmaLogo,
  FigmaColorLogo,
  FramerLogo,
  FramerColorLogo,
  BigqueryColorLogo,
  LottieLogo,
  NextjsLogo,
  WhopLogoBrandmarkOrangeLogo
} from '@/components/icons/logos';

// Using local Lottie animation
const LOCATION_LOTTIE = '/lotties/location.json';

export default function ComponentTest() {
  return (
    <main className="min-h-screen bg-gray-17 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-5 mb-12">Component Testing</h1>

        {/* Logo Components */}
        <section className="space-y-6 mb-16">
          <h2 className="text-xl font-medium text-gray-5 mb-8">Logo Components</h2>
          
          {/* Customizable Version */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Customizable Version (Inherited Color)</h3>
            <div className="flex gap-4 items-center flex-wrap text-gray-5">
              <div className="w-8 h-8"><TsNeutralLogo /></div>
              <div className="w-8 h-8"><ReactLogo /></div>
              <div className="w-8 h-8"><TailwindLogo /></div>
              <div className="w-8 h-8"><FirebaseLogo /></div>
              <div className="w-8 h-8"><FigmaLogo /></div>
              <div className="w-8 h-8"><FramerLogo /></div>
              <div className="w-8 h-8"><LottieLogo /></div>
              <div className="w-8 h-8"><NextjsLogo /></div>
              <div className="w-8 h-8"><WhopLogoBrandmarkOrangeLogo /></div>
            </div>
          </div>

          {/* Brand Colors Version */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Brand Colors Version</h3>
            <div className="flex gap-4 items-center flex-wrap">
              <div className="w-8 h-8"><TsColorLogo /></div>
              <div className="w-8 h-8"><ReactColorLogo /></div>
              <div className="w-8 h-8"><TailwindColorLogo /></div>
              <div className="w-8 h-8"><FirebaseColorLogo /></div>
              <div className="w-8 h-8"><FigmaColorLogo /></div>
              <div className="w-8 h-8"><FramerColorLogo /></div>
              <div className="w-8 h-8"><BigqueryColorLogo /></div>
            </div>
          </div>

          {/* With Custom Colors */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Custom Colors</h3>
            <div className="flex gap-4 items-center flex-wrap">
              <div className="w-8 h-8"><TsNeutralLogo color="#FF6B6B" /></div>
              <div className="w-8 h-8"><ReactLogo color="#4ECDC4" /></div>
              <div className="w-8 h-8"><TailwindLogo color="#96CEB4" /></div>
              <div className="w-8 h-8"><FirebaseLogo color="#FFEEAD" /></div>
              <div className="w-8 h-8"><FigmaLogo color="#D4A5A5" /></div>
              <div className="w-8 h-8"><FramerLogo color="#9B59B6" /></div>
              <div className="w-8 h-8"><LottieLogo color="#2ECC71" /></div>
              <div className="w-8 h-8"><NextjsLogo color="#F39C12" /></div>
              <div className="w-8 h-8"><WhopLogoBrandmarkOrangeLogo color="#E74C3C" /></div>
            </div>
          </div>

          {/* Different Sizes */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Different Sizes</h3>
            <div className="flex gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-9">Customizable</span>
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8"><TsNeutralLogo /></div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-9">Brand Colors</span>
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8"><TsColorLogo /></div>
                </div>
              </div>
            </div>
          </div>

          {/* In Badges */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">In Badges</h3>
            <div className="flex gap-4 items-center flex-wrap">
              <Badge size="md" leftIcon={() => <div className="w-8 h-8"><TsColorLogo /></div>}>
                TypeScript
              </Badge>
              <Badge size="md" leftIcon={() => <div className="w-8 h-8"><ReactColorLogo /></div>}>
                React
              </Badge>
              <Badge size="md" leftIcon={() => <div className="w-8 h-8"><TailwindColorLogo /></div>}>
                Tailwind
              </Badge>
            </div>
          </div>

          {/* Non-Colored Version (text-gray-1) */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-9">Non-Colored Version (text-gray-1)</h3>
            <div className="flex gap-4 items-center flex-wrap text-gray-1">
              <div className="w-8 h-8"><TsNeutralLogo /></div>
              <div className="w-8 h-8"><ReactLogo /></div>
              <div className="w-8 h-8"><TailwindLogo /></div>
              <div className="w-8 h-8"><FirebaseLogo /></div>
              <div className="w-8 h-8"><FigmaLogo /></div>
              <div className="w-8 h-8"><FramerLogo /></div>
              <div className="w-8 h-8"><LottieLogo /></div>
              <div className="w-8 h-8"><NextjsLogo /></div>
              <div className="w-8 h-8"><WhopLogoBrandmarkOrangeLogo /></div>
            </div>
          </div>
        </section>

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