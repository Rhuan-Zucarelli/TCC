import React from 'react';

export default function Training() {

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-4">
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center">
            <span className="ml-2">Segunda-Feira </span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center">
            <span className="ml-2">Terça-Feira</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center ">
            <span className="ml-2">Quarta-Feira</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center ">
            <span className="ml-2">Quinta-Feira</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center ">
            <span className="ml-2">Sexta-Feira</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center ">
            <span className="ml-2">Sabado</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center ">
            <span className="ml-2">Domingo</span>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
        <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 mr-4">
          Cadastro de Exercícios
        </button>
        <button className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 ">
          Lista de Exercícios cadastradas
        </button>
      </div>
    </>
  )
}