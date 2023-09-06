import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import CreateExercise from '../createExercise/CreateExercise';
import CreateFood from '../createFood/CreateFood';

interface Imodal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  button: ;
}



export function Modal({ isOpen, onClose, children, button }: Imodal) {
  if (!isOpen) {
    return null;
  }

  let buttonContent;

  if (button.type === 'BCreatExercise') {
    buttonContent = (
      <>
        <CreateExercise onClose={onClose} />
      </>
    );
  }


  return (
    <>
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
    </>
  );
}
