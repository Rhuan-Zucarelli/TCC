import React from 'react';

interface Imodal {
  isOpen: Boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: Imodal) {
  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        {children}
        <button
          className="text-gray-500 hover:text-gray-700 mt-4"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div >
  );
}
