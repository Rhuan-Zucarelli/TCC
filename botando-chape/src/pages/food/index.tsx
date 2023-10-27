import { Modal } from 'next/components/UI/modal/Modal';
import Link from 'next/link';
import React, { useState } from 'react';
import { PiSunHorizon } from 'react-icons/Pi';
import { PiSunDim } from 'react-icons/Pi';
import { PiMoonStarsLight } from 'react-icons/Pi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListFood from 'next/components/UI/listFood/ListFood';
import CreateFood from 'next/components/UI/createFood/CreateFood';


type StateType = {
  openBreackFast: boolean,
  openLunch: boolean,
  openDinner: boolean,
  openRegisFood: boolean,
  openListFood: boolean,
}

export enum MealType {
  CAFEDAMANHA = 'CAFEDAMANHA',
  ALMOCO = 'ALMOCO',
  JANTAR = 'JANTAR',
}

export default function Food() {
  const [state, setState] = useState<StateType>({
    openBreackFast: false,
    openLunch: false,
    openDinner: false,
    openRegisFood: false,
    openListFood: false,
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const toggleState = (key: keyof StateType) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleDateChange = (date: Date | null) => {
    // Limpe as refeições existentes (ou execute qualquer lógica apropriada para redefinir as refeições)
    setMeals([]); // Certifique-se de ter um estado para armazenar as refeições (meals) e uma função para atualizar esse estado (setMeals).

    // Atualize a data selecionada
    setSelectedDate(date);
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border p-2 rounded-lg mt-4"
          dateFormat="dd/MM/yyyy"
        />
        <div className="flex flex-col space-y-4 mt-4">
          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={() => toggleState('openBreackFast')}
          >
            <PiSunHorizon size={30} color='#fff' />
            <span className="ml-2">Café da manhã</span>
          </button>
          <Modal isOpen={state.openBreackFast} onClose={() => toggleState('openBreackFast')}>
            <ListFood type="" mealType={MealType.CAFEDAMANHA} />
          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={() => toggleState('openLunch')}
          >
            <PiSunDim size={30} color='#fff' />
            <span className="ml-2">Almoço</span>
          </button>
          <Modal isOpen={state.openLunch} onClose={() => toggleState('openLunch')} >
            <ListFood type="" mealType={MealType.ALMOCO} />
          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center "
            onClick={() => toggleState('openDinner')}
          >
            <PiMoonStarsLight size={30} color='#fff' />
            <span className="ml-2">Jantar</span>
          </button>
          <Modal isOpen={state.openDinner} onClose={() => toggleState('openDinner')} >
            <ListFood type="" mealType={MealType.JANTAR} />
          </Modal>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
        <button
          className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 mr-4"
          onClick={() => toggleState('openRegisFood')}
        >
          Cadastro de comidas
        </button>
        <Modal isOpen={state.openRegisFood} onClose={() => toggleState('openRegisFood')}>
          <CreateFood type='' onClose={() => toggleState('openRegisFood')} id='' />
        </Modal>
        <button
          className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 "
          onClick={() => toggleState('openListFood')}
        >
          Lista de comidas
        </button>
        <Modal isOpen={state.openListFood} onClose={() => toggleState('openListFood')} >
          <ListFood type="BCreatedBy" />
        </Modal>
      </div>

    </>
  );
};

