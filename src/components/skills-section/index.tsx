import React from 'react';
import SkillBar from './skill-bar';
import TechStack from './tech-stack';

const skillsData = [
  { skill: 'product design', level: 5, years: '5y' },
  { skill: 'engineering', level: 3, years: '1.5y' },
];

const Skills = () => {
  return (
    <section className="w-full py-16">
      <h2 className="text-xl font-medium text-gray-5 mb-8">Skills</h2>
      
      <div className="max-w-md">
        {skillsData.map((skill, index) => (
          <SkillBar
            key={index}
            skill={skill.skill}
            level={skill.level}
            years={skill.years}
          />
        ))}
      </div>
      
      <TechStack />
    </section>
  );
};

export default Skills; 