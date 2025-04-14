'use client';

import React, { useEffect, useRef } from 'react';

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const WorkModal: React.FC<WorkModalProps> = ({ isOpen, onClose, title = 'Project Details' }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-18 bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gray-16 border border-gray-14 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto"
      >
        <div className="flex justify-between items-center border-b border-gray-14 p-4">
          <h3 className="text-lg font-medium text-gray-5">{title}</h3>
          <button onClick={onClose} className="text-gray-9 hover:text-gray-5 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-7">Hello World</p>
        </div>
      </div>
    </div>
  );
};

export default WorkModal;
