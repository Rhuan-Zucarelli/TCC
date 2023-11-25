import React, { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface Imodal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: Imodal) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.querySelector('.modal');
      if (modal && event.target instanceof Node && !modal.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md modal relative">
          {children}
          <div className="absolute top-0 right-0">
            <button
              className="cursor-pointer focus:outline-none hover:bg-red-600 hover:bg-opacity-100 rounded-full p-1 hover:scale-110"
              onClick={onClose}
            >
              <AiOutlineCloseCircle className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}  
