import React from 'react';
import Badge from '@/components/ui/badge';
import { SkillCategory as SkillCategoryType } from './skills-data';

interface SkillCategoryProps {
  category: SkillCategoryType;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ category }) => {
  // Calculate full bars and partial fill percentage
  const fullBars = Math.floor(category.level);
  const partialFill = category.level - fullBars;

  // Create an array representing the 5 bars
  const bars = Array.from({ length: 5 });

  return (
    <div className="mb-10">
      <div className="flex items-start mb-4 w-full">
        <div className="flex gap-1 mr-3 pt-1">
          {bars.map((_, index) => {
            let barContent;
            const isEmpty = index >= fullBars;
            const isPartial = index === fullBars && partialFill > 0;

            if (isPartial) {
              // Render partially filled bar
              barContent = (
                <div key={index} className="w-1 h-4 rounded-sm bg-gray-14 relative overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-gray-2"
                    style={{ height: `${partialFill * 100}%` }}
                  />
                </div>
              );
            } else {
              // Render full or empty bar
              barContent = (
                <div
                  key={index}
                  className={`w-1 h-4 rounded-sm ${isEmpty ? 'bg-gray-14' : 'bg-gray-2'}`}
                />
              );
            }
            return barContent;
          })}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="text-gray-5 font-medium leading-tight">{category.name}</span>
          <span className="text-gray-10 text-sm leading-tight">{category.years}</span>
        </div>
      </div>

      {/* Tech stack badges */}
      <div className="flex flex-wrap w-full gap-3 ml-12">
        {category.technologies.map((tech, index) => (
          <Badge
            key={index}
            size="sm"
            variant="outline"
            rounded="full"
            leftIcon={tech.icon}
            iconOnly={false}
            className="font-mono py-1.5 px-3"
          >
            {tech.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
