import React from 'react';

interface Imodal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children, }: Imodal) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">

          {children}

          <div className="mt-4">
            <button
              className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl flex items-center"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
