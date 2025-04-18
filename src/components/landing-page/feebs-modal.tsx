'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { type ChevronRightIconHandle } from '../ui/chevron-right';
import { SimpleSquircle } from '../ui/simple-squircle';

interface FeebsModalProps {
  className?: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
}

export const FeebsModal: React.FC<FeebsModalProps> = ({
  className = '',
  onButtonClick,
  isLoading = false,
}) => {
  const chevronRef = useRef<ChevronRightIconHandle>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (isLoading) return;
    setIsHovering(true);
    chevronRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    if (isLoading) return;
    setIsHovering(false);
    chevronRef.current?.completeAnimation();
  };

  const handleClick = () => {
    if (isLoading) return;
    chevronRef.current?.resetAnimation();
    onButtonClick?.();
  };

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
      <SimpleSquircle
        className={`w-full  ${isLoading ? 'bg-gray-10' : isHovering ? 'bg-gray-13' : 'bg-gray-15'} transition-colors duration-200 ease-out`}
        roundnessLevel={1}
        height="auto"
        width="100%"
        padding={0}
        hoverEffect={!isLoading}
        hoverOpacity={60}
        initialOpacity={100}
        hoverTransition="0.2s ease-out"
        style={{
          transition: 'transform 0.3s ease-out, background-color 0.2s ease-out',
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="w-full flex items-center justify-center text-white font-semibold px-4 py-3 relative">
          {isLoading && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          <div className="flex items-center justify-center font-display text-xl">
            <span
              className="transition-transform duration-200 ease-out"
              style={{ transform: isHovering && !isLoading ? 'translateY(-1px)' : 'translateY(0)' }}
            >
              {isLoading ? 'Loading...' : 'View my work'}
            </span>
          </div>
        </div>
      </SimpleSquircle>
    </SimpleSquircle>
  );
};

export default FeebsModal;
