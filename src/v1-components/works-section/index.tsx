'use client';

import React, { useState } from 'react';
import WorkCard from './work-card';
import WorkModal from './work-modal';
import useModal from '../../hooks/useModal';

const works = [
  {
    id: 1,
    company: 'Whop',
    period: 'Jan 2025 - April 2025',
  },
  {
    id: 2,
    company: 'Pickaxe',
    period: 'Jan 2022 - Present',
  },
  {
    id: 3,
    company: 'Zus',
    period: 'Jan 2022 - Present',
  },
];

const Works = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedWork, setSelectedWork] = useState<string | null>(null);

  const handleWorkClick = (company: string) => {
    setSelectedWork(company);
    openModal();
  };

  return (
    <section className="w-full py-12">
      <div className="grid grid-cols-1 gap-6">
        {works.map((work) => (
          <WorkCard
            key={work.id}
            company={work.company}
            period={work.period}
            onClick={() => handleWorkClick(work.company)}
          />
        ))}
      </div>

      <WorkModal
        isOpen={isOpen}
        onClose={closeModal}
        title={selectedWork ? `${selectedWork} Project` : 'Project Details'}
      />
    </section>
  );
};

export default Works;
