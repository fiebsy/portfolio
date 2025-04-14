'use client';

import Image from 'next/image';
import React from 'react';
import { SimpleSquircle } from '../ui/simple-squircle';
import { SquircleButton } from '../ui/squircle-button';

interface FeebsModalProps {
  className?: string;
  onButtonClick?: () => void;
}

export const FeebsModal: React.FC<FeebsModalProps> = ({ className = '', onButtonClick }) => {
  return (
    <SimpleSquircle
      className={`max-w-md mx-auto flex flex-col gap-8  bg-transparent ${className}`}
      padding="20px"
      roundnessLevel={2}
      width="auto"
    >
      {/* User Info Section */}
      <div className="flex items-center">
        <div className="relative">
          {/* Avatar as a circle instead of squircle */}
          <div className="relative w-14 h-14 overflow-hidden rounded-full">
            <Image
              alt="Feebs Avatar"
              className="object-cover w-full h-full"
              height={52}
              src="/images/feebs-avatar.png"
              width={52}
            />
          </div>
          {/* Green dot for active status */}
          <div className="absolute -bottom-0.5 -right-0.5 z-10 w-5 h-5 border-3 border-white rounded-full bg-[#46E826]" />
        </div>
        <div className="ml-3 font-display text-md flex flex-col text-gray-9 font-light">
          <div className="flex items-center">
            <span className=" text-gray-16 font-bold">Feebs</span>
            <span className="ml-2 ">5y</span>
          </div>
          <span className="">@minnesota_usa</span>
        </div>
      </div>

      {/* Text Section - Now using the updated font-display class */}
      <div className="font-display">
        <div className="text-3xl">
          <span className="text-gray-16">I design and engineer</span>
          <br />
          <span className="text-gray-7">social and data products</span>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex w-full font-semibold">
        <SquircleButton
          height="auto"
          padding="12px"
          roundnessLevel={1}
          variant="primary"
          width="100%"
          onClick={onButtonClick}
        >
          View my work
        </SquircleButton>
      </div>
    </SimpleSquircle>
  );
};

export default FeebsModal;
