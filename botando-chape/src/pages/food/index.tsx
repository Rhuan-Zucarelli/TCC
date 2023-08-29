import { Modal } from 'next/components/layout/modal';
import Link from 'next/link';
import React, { useState } from 'react';
import { PiSunHorizon } from 'react-icons/Pi';
import { PiSunDim } from 'react-icons/Pi';
import { PiMoonStarsLight } from 'react-icons/Pi';


export default function Food() {
  const [openBreackFast, setOpenBreackFast] = useState(false);
  const [openLunch, setOpenLunch] = useState(false);
  const [openDinner, setOpenDinner] = useState(false);



  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-4">
          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white  px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={() => setOpenBreackFast(!openBreackFast)}
          >
            <PiSunHorizon size={30} color='#fff' />
            <span className="ml-2">Café da manhã</span>
          </button>
          <Modal isOpen={openBreackFast} onClose={() => setOpenBreackFast(!openBreackFast)}>

          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={() => setOpenLunch(!openLunch)}
          >
            <PiSunDim size={30} color='#fff' />
            <span className="ml-2">Almoço</span>
          </button>
          <Modal isOpen={openLunch} onClose={() => setOpenLunch(!openLunch)}>

          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center "
            onClick={() => setOpenDinner(!openDinner)}
          >
            <PiMoonStarsLight size={30} color='#fff' />
            <span className="ml-2">Jantar</span>
          </button>
          <Modal isOpen={openDinner} onClose={() => setOpenDinner(!openDinner)}>

          </Modal>

        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
        <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 mr-4">
          Cadastro de comidas
        </button>
        <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 ">
          Lista de comidas cadastradas
        </button>
      </div>

    </>
  );
};

