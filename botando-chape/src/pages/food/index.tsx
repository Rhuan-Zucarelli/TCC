import { Modal } from 'next/components/layout/modal';
import Link from 'next/link';
import React, { useState } from 'react';
import { PiSunHorizon } from 'react-icons/Pi';
import { PiSunDim } from 'react-icons/Pi';
import { PiMoonStarsLight } from 'react-icons/Pi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Food() {
  const [openBreackFast, setOpenBreackFast] = useState(false);
  const [openLunch, setOpenLunch] = useState(false);
  const [openDinner, setOpenDinner] = useState(false);
  const [openRegisFood, setOpenRegisFood] = useState(false);
  const [openListFood, setOpenListFood] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border p-2 rounded-lg mt-4"
          dateFormat="dd/MM/yyyy"
        />
        <div className="flex flex-col space-y-4 mt-4">
          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={() => setOpenBreackFast(!openBreackFast)}
          >
            <PiSunHorizon size={30} color='#fff' />
            <span className="ml-2">Café da manhã</span>
          </button>
          <Modal /* type={BreackFast} */ isOpen={openBreackFast} onClose={() => setOpenBreackFast(!openBreackFast)} button={{ type: 'BList', label: '' }}>
            {/* Conteúdo do modal */}
          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={() => setOpenLunch(!openLunch)}
          >
            <PiSunDim size={30} color='#fff' />
            <span className="ml-2">Almoço</span>
          </button>
          <Modal isOpen={openLunch} onClose={() => setOpenLunch(!openLunch)} button={{ type: 'BList', label: '' }}>
            {/* Conteúdo do modal */}
          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center "
            onClick={() => setOpenDinner(!openDinner)}
          >
            <PiMoonStarsLight size={30} color='#fff' />
            <span className="ml-2">Jantar</span>
          </button>
          <Modal isOpen={openDinner} onClose={() => setOpenDinner(!openDinner)} button={{ type: 'BList', label: '' }}>
            {/* Conteúdo do modal */}
          </Modal>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
        <button
          className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 mr-4"
          onClick={() => setOpenRegisFood(!openRegisFood)}
        >
          Cadastro de comidas
        </button>
        <Modal isOpen={openRegisFood} onClose={() => setOpenRegisFood(!openRegisFood)} button={{ type: 'BCreatFood', label: '' }}>

        </Modal>
        <button
          className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 "
          onClick={() => setOpenListFood(!openListFood)}
        >
          Lista de comidas
        </button>
        <Modal isOpen={openListFood} onClose={() => setOpenListFood(!openListFood)} button={{ type: 'BList', label: '' }}>

        </Modal>
      </div>

    </>
  );
};

