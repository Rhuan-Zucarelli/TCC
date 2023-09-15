import CreateExercise from 'next/components/UI/createExercise/CreateExercise';
import ListExercises from 'next/components/UI/listExercise/ListExercise';
import { Modal } from 'next/components/UI/modal/Modal';
import React, { useState } from 'react';

type StateType = {
  openMonday: boolean;
  openTuesday: boolean;
  openWednesday: boolean;
  openThursday: boolean;
  openFriday: boolean;
  openSaturday: boolean;
  openSunday: boolean;
  openRegisTrain: boolean;
  openListTrain: boolean;
};
 
enum TrainingDay {
  SEGUNDA= 'SEGUNDA',
  TERCA= 'TERCA',
  QUARTA= 'QUARTA',
  QUINTA= 'QUINTA',
  SEXTA= 'SEXTA',
  SABADO= 'SABADO',
  DOMINGO= 'DOMINGO',
}

export default function Training() {
  const [state, setState] = useState<StateType>({
    openMonday: false,
    openTuesday: false,
    openWednesday: false,
    openThursday: false,
    openFriday: false,
    openSaturday: false,
    openSunday: false,
    openRegisTrain: false,
    openListTrain: false,
  });

  const toggleState = (key: keyof StateType) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-4">
          <button
            className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center 'bg-green-700' : ''}`}
            onClick={() => toggleState('openMonday')}
          >
            <span className="ml-2">Segunda-Feira </span>
          </button>
          <Modal isOpen={state.openMonday} onClose={() => toggleState('openMonday')}>
            <ListExercises type={TrainingDay.SEGUNDA} />
          </Modal>

          <button
            className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center 'bg-green-700' : ''}`}
            onClick={() => toggleState('openTuesday')}
          >
            <span className="ml-2">Terça-Feira </span>
          </button>
          <Modal isOpen={state.openTuesday} onClose={() => toggleState('openTuesday')}>
            <ListExercises type={TrainingDay.TERCA} />
          </Modal>

          <button
            className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center 'bg-green-700' : ''}`}
            onClick={() => toggleState('openWednesday')}
          >
            <span className="ml-2">Quarta-Feira </span>
          </button>
          <Modal isOpen={state.openWednesday} onClose={() => toggleState('openWednesday')} >
            <ListExercises type={TrainingDay.QUARTA} />
          </Modal>

          <button
            className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center 'bg-green-700' : ''}`}
            onClick={() => toggleState('openThursday')}
          >
            <span className="ml-2">Quinta-Feira </span>
          </button>
          <Modal isOpen={state.openThursday} onClose={() => toggleState('openThursday')} >
            <ListExercises type={TrainingDay.QUINTA} />
          </Modal>

          <button
            className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center 'bg-green-700' : ''}`}
            onClick={() => toggleState('openFriday')}
          >
            <span className="ml-2">Sexta-Feira </span>
          </button>
          <Modal isOpen={state.openFriday} onClose={() => toggleState('openFriday')} >
            <ListExercises type={TrainingDay.SEXTA} />
          </Modal>

          <button
            className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center 'bg-green-700' : ''}`}
            onClick={() => toggleState('openSaturday')}
          >
            <span className="ml-2">Sabado </span>
          </button>
          <Modal isOpen={state.openSaturday} onClose={() => toggleState('openSaturday')} >
            <ListExercises type={TrainingDay.SABADO} />
          </Modal>

          <button
            className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center 'bg-green-700' : ''}`}
            onClick={() => toggleState('openSunday')}
          >
            <span className="ml-2">Domingo </span>
          </button>
          <Modal isOpen={state.openSunday} onClose={() => toggleState('openSunday')} >
            <ListExercises type={TrainingDay.DOMINGO} />
          </Modal>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
        <button
          className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 mr-4 'bg-green-700' : ''}`}
          onClick={() => toggleState('openRegisTrain')}
        >
          Cadastro de Exercícios
        </button>
        <Modal isOpen={state.openRegisTrain} onClose={() => toggleState('openRegisTrain')} >
          <CreateExercise type="" onClose={() => toggleState('openRegisTrain')}  />
        </Modal>

        <button
          className={`bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 'bg-green-700' : ''}`}
          onClick={() => toggleState('openListTrain')}
        >
          Lista de Exercícios
        </button>
        <Modal isOpen={state.openListTrain} onClose={() => toggleState('openListTrain')}>
          <ListExercises type="BCreatedBy" />
        </Modal>

      </div>
    </>
  )
}
