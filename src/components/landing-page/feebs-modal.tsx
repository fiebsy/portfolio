'use client';

import React from 'react';
import Image from 'next/image';
import { SimpleSquircle } from '../ui/simple-squircle';
import { Button } from '../ui/button';
import Link from 'next/link';

interface FeebsModalProps {
  className?: string;
}

export const FeebsModal: React.FC<FeebsModalProps> = ({ className = '' }) => {
  return (
    <SimpleSquircle 
      className={`max-w-md mx-auto bg-white ${className}`}
      padding="2rem"
      borderRadius={20}
      width="auto"
    >
      {/* User Info Section */}
      <div className="flex items-center mb-8">
        <div className="relative">
          {/* Avatar as a circle instead of squircle */}
          <div className="w-16 h-16 rounded-full overflow-hidden relative">
            <Image 
              src="/images/feebs-avatar.png" 
              alt="Feebs Avatar" 
              width={64} 
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Green dot for active status */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full z-10 border-2 border-white" />
        </div>
        <div className="ml-3">
          <div className="flex items-center">
            <span className="text-gray-16 font-medium">Feebs</span>
            <span className="ml-2 text-gray-16">5y</span>
          </div>
          <span className="text-gray-10 text-sm">@minnesota_usa</span>
        </div>
      </div>

      {/* Text Section */}
      <div className="mb-8">
        <div className="text-3xl">
          <span className="text-gray-16 font-medium">I design and develop</span>
          <br />
          <span className="text-gray-12">social and data products.</span>
        </div>
      </div>

      {/* Button Section */}
      <div className="w-full">
        <Button
          className="bg-black text-white w-full"
          borderRadius={40}
          padding="0.75rem 1.5rem"
          width="100%"
          height="auto"
          border={4}
        >
          <Link href="#portfolio" className="flex items-center justify-center w-full h-full">
            View my work
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
        </Button>
      </div>

      {/* Direct SimpleSquircle Button Example */}
      <div className="flex w-full mt-4">
        <SimpleSquircle
          width="100%"
          height="auto"
          borderRadius={50}
          className="bg-gray-12"
          padding="12px"
          border={4}
          borderColor="#3bf7d1"
          borderStyle="solid"
          hoverEffect={true}
          hoverOpacity={100}
          initialOpacity={0}
          hoverTransition="0.5s ease"
          onClick={() => alert('Simple button clicked!')}
        >
            <div className="flex items-center justify-center">
          <span className="text-white flex items-center justify-center">
            Simplified Button
          </span>
          <span className="text-white flex items-center justify-center">
            Simplified Button
          </span>
          </div>
        </SimpleSquircle>
      </div>
    </SimpleSquircle>
  );
};

export default FeebsModal;
