import React from 'react';
import Bios from './bio';
import Badge from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="w-full py-16">
      <div className="flex flex-col gap-4 mb-6">
        <div className="mb-2">
          <div className="flex text-2xl items-baseline gap-2 text-gray-9">
            <span className="text-gray-5">Feebs</span>
          </div>
        </div>
        <h2 className="text-xl hidden text-gray-5 font-medium">Product Designer / UI Engineer</h2>

        <Bios highlighting={true} length="short" fontSize="text-xl" />
      </div>
      <div className="flex items-center gap-4 mt-2 mb-4">
        <Badge variant="surface" leftIcon={MapPin} size="sm" className="text-gray-10">
          Minneapolis, MN
        </Badge>
      </div>
    </section>
  );
};

export default Hero;
