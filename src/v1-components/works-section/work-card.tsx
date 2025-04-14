'use client';

import React from 'react';

interface WorkCardProps {
  company: string;
  period: string;
  onClick: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ company, period, onClick }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 text-gray-9 mb-4">
        <span className="text-gray-5">{company}</span>
        <span>/</span>
        <span className="text-gray-9">{period}</span>
      </div>

      <div
        onClick={onClick}
        className="w-full aspect-video bg-gray-15 rounded-lg overflow-hidden cursor-pointer transition-all hover:opacity-90 hover:translate-y-[-2px] border border-gray-14"
      >
        {/* Stylized placeholder with company name */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-15 to-gray-17 p-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-14 mx-auto mb-4 flex items-center justify-center">
              <span className="text-xl font-medium text-gray-9">{company.charAt(0)}</span>
            </div>
            <p className="text-gray-9 font-mono text-sm">{company.toLowerCase()}.preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
