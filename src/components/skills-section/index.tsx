import React from 'react';
import SkillCategory from './skill-category';
import { skillsData } from './skills-data';

const Skills = () => {
  return (
    <section className="w-full py-16">
      <h2 className="text-xl font-medium text-gray-5 hidden mb-8 ">Skills</h2>
      
      <div className="w-full flex flex-col gap-8">
        {skillsData.map((category, index) => (
          <SkillCategory
            key={index}
            category={category}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills; 