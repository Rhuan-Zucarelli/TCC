import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

interface Imodal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  button: bCreat | bList;
}

type bCreat = {
  type: 'BCreat';
  label: string;
};

type bList = {
  type: 'BList';
  label: string;
};

export function Modal({ isOpen, onClose, children, button }: Imodal) {
  if (!isOpen) {
    return null;
  }

  let buttonContent;

  if (button.type === 'BCreat') {
    buttonContent = (
      <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl flex items-center">
        {button.label}
      </button>
    );
  } else if (button.type === 'BList') {
    buttonContent = (
      <form className="flex gap-2">
          <input
            className="flex-grow px-3 py-2 border rounded-md"
            placeholder="Buscar"
          />
          <button className="bg-gray-200 p-2 rounded-md">
            <a href="#">
              <BiSearchAlt2 size={20} color="gray" />
            </a>
          </button>
        </form>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">

        {children}

        {buttonContent}

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
  );
}
