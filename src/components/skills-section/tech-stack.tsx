import React from 'react';

interface Tech {
  name: string;
  category?: string;
}

const techStack: Tech[] = [
  { name: 'React' },
  { name: 'Typescript' },
  { name: 'Firebase' },
  { name: 'Bigquery' },
  { name: 'Figma' },
  { name: 'Lottie' },
];

const categories: Tech[] = [
  { name: 'Data vis', category: 'skill' },
  { name: 'Animations', category: 'skill' },
  { name: 'Product design', category: 'skill' },
  { name: 'Front end', category: 'skill' },
];

const TechStack: React.FC = () => {
  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-3 mb-8">
        {techStack.map((tech, index) => (
          <div 
            key={index} 
            className="px-3 py-1.5 bg-gray-16 text-gray-5 rounded border border-gray-14 text-sm"
          >
            {tech.name}
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="px-3 py-1.5 bg-transparent text-gray-9 rounded border border-gray-14 text-sm"
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack; 