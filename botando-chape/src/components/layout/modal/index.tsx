import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';


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
        <form>
          <div>
            <input placeholder='Buscar' />

            <button >
              <BiSearchAlt2 size={30} color='gray' />
            </button>
          </div>
        </form>
        <div>
          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={onClose}
          >
            Fechar
          </button></div>

      </div>
    </div >
  );
}
