import React from 'react';

const Hero = () => {
  return (
    <section className="w-full py-16">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-9 mb-2">
          <span className="text-gray-5">Feebs</span>
          <span>/</span>
          <span className="text-gray-9">Derick Fiebiger</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-9">
        <span className="text-gray-5">Product Designer</span>
        <span>/</span>
        <span className="text-gray-5">UI Engineer</span>
        </div>
        
        <p className="text-gray-7 max-w-2xl">
          I build clean, intuitive dashboards and real-time tools that make data useful—
          especially in crypto and creator platforms.
        </p>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-9">Minneapolis, MN</span>
        </div>
      </div>
    </section>
  );
};

export default Hero; 