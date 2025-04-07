import React from 'react';

interface SkillBarProps {
  skill: string;
  level: number; // 1-5 scale
  years: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, level, years }) => {
  // Create an array of 5 elements to represent skill level
  const dots = Array.from({ length: 5 }, (_, i) => i < level);
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-5 font-medium">{skill}</span>
        <span className="text-gray-9 text-sm">{years}</span>
      </div>
      <div className="flex gap-1">
        {dots.map((filled, index) => (
          <div 
            key={index} 
            className={`h-1.5 flex-1 rounded-full ${filled ? 'bg-fuego-7' : 'bg-gray-14'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillBar; 