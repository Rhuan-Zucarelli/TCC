import Link from 'next/link';
import React from 'react';
import { PiSunHorizon } from 'react-icons/Pi';
import { PiSunDim } from 'react-icons/Pi';
import { PiMoonStarsLight } from 'react-icons/Pi';


export default function Food() {

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-4">
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white  px-4 py-2 rounded-2xl p-1 flex items-center">
            <PiSunHorizon size={30} color='#fff' />
            <span className="ml-2">Café da manhã</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center">
            <PiSunDim size={30} color='#fff' />
            <span className="ml-2">Almoço</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center ">
            <PiMoonStarsLight size={30} color='#fff' />
            <span className="ml-2">Jantar</span>
          </button>
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

