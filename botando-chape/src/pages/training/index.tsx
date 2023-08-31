import { Modal } from 'next/components/layout/modal';
import React, { useState } from 'react';

export default function Training() {
  const [openMonday, setOpenMonday] = useState(false);
  const [openTuesday, setOpenTuesday] = useState(false);
  const [openWednesday, setOpenWednesday] = useState(false);
  const [openThursday, setOpenThursday] = useState(false);
  const [openFriday, setOpenFriday] = useState(false);
  const [openSaturday, setOpenSaturday] = useState(false);
  const [openSunday, setOpenSunday] = useState(false);
  const [openRegisTrain, setOpenRegisTrain] = useState(false);
  const [openListTrain, setOpenListTrain] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-4">
          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={() => setOpenMonday(!openMonday)}
          >
            <span className="ml-2">Segunda-Feira </span>
          </button>
          <Modal isOpen={openMonday} onClose={() => setOpenMonday(!openMonday)} button={{ type: 'BList', label: '' }}>

          </Modal>

          {/* botao={{ tipo: 'listagem', label: 'Lista de Exercícios cadastradas' */}
          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center"
            onClick={() => setOpenTuesday(!openTuesday)}
          >
            <span className="ml-2">Terça-Feira</span>
          </button>
          <Modal isOpen={openTuesday} onClose={() => setOpenTuesday(!openTuesday)} button={{ type: 'BList', label: '' }}>

          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center "
            onClick={() => setOpenWednesday(!openWednesday)}
          >
            <span className="ml-2">Quarta-Feira</span>
          </button>
          <Modal isOpen={openWednesday} onClose={() => setOpenWednesday(!openWednesday)} button={{ type: 'BList', label: '' }}>

          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center "
            onClick={() => setOpenThursday(!openThursday)}
          >
            <span className="ml-2">Quinta-Feira</span>
          </button>
          <Modal isOpen={openThursday} onClose={() => setOpenThursday(!openThursday)} button={{ type: 'BList', label: '' }}>

          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center "
            onClick={() => setOpenFriday(!openFriday)}
          >
            <span className="ml-2">Sexta-Feira</span>
          </button>
          <Modal isOpen={openFriday} onClose={() => setOpenFriday(!openFriday)} button={{ type: 'BList', label: '' }}>

          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center "
            onClick={() => setOpenSaturday(!openSaturday)}
          >
            <span className="ml-2">Sabado</span>
          </button>
          <Modal isOpen={openSaturday} onClose={() => setOpenSaturday(!openSaturday)} button={{ type: 'BList', label: '' }}>

          </Modal>

          <button
            className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 flex items-center "
            onClick={() => setOpenSunday(!openSunday)}
          >
            <span className="ml-2">Domingo</span>
          </button>
          <Modal isOpen={openSunday} onClose={() => setOpenSunday(!openSunday)} button={{ type: 'BList', label: '' }}>

          </Modal>

        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
        <button
          className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 mr-4"
          onClick={() => setOpenRegisTrain(!openRegisTrain)}
        >
          Cadastro de Exercícios
        </button>
        <Modal isOpen={openRegisTrain} onClose={() => setOpenRegisTrain(!openRegisTrain)} button={{ type: 'BCreatExercise', label: '' }}>

        </Modal>

        <button
          className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl p-1 "
          onClick={() => setOpenListTrain(!openListTrain)}
        >
          Lista de Exercícios cadastradas
        </button>
        <Modal isOpen={openListTrain} onClose={() => setOpenListTrain(!openListTrain)} button={{ type: 'BList', label: '' }}>

        </Modal>

      </div>
    </>
  )
}