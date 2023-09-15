import { Modal } from "next/components/UI/modal/Modal";
import Link from "next/link";
import React, { useState } from "react";
import { PiSunHorizon } from "react-icons/Pi";
import { PiSunDim } from "react-icons/Pi";
import { PiMoonStarsLight } from "react-icons/Pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListFood from "next/components/UI/listFood/ListFood";
import CreateFood from "next/components/UI/createFood/CreateFood";

type StateType = {
  openBreackFast: boolean;
  openLunch: boolean;
  openDinner: boolean;
  openRegisFood: boolean;
  openListFood: boolean;
};

export default function Food() {
  const [state, setState] = useState<StateType>({
    openBreackFast: false,
    openLunch: false,
    openDinner: false,
    openRegisFood: false,
    openListFood: false,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const toggleState = (key: keyof StateType) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="mt-4 rounded-lg border p-2"
          dateFormat="dd/MM/yyyy"
        />
        <div className="mt-4 flex flex-col space-y-4">
          <button
            className="flex items-center rounded-2xl bg-green-600 p-1 px-4 py-2 text-white hover:scale-110 hover:bg-green-700"
            onClick={() => toggleState("openBreackFast")}
          >
            <PiSunHorizon size={30} color="#fff" />
            <span className="ml-2">Café da manhã</span>
          </button>
          <Modal
            isOpen={state.openBreackFast}
            onClose={() => toggleState("openBreackFast")}
          >
            <ListFood type="" />
          </Modal>

          <button
            className="flex items-center rounded-2xl bg-green-600 p-1 px-4 py-2 text-white hover:scale-110 hover:bg-green-700"
            onClick={() => toggleState("openLunch")}
          >
            <PiSunDim size={30} color="#fff" />
            <span className="ml-2">Almoço</span>
          </button>
          <Modal
            isOpen={state.openLunch}
            onClose={() => toggleState("openLunch")}
          >
            <ListFood type="" />
          </Modal>

          <button
            className="flex items-center rounded-2xl bg-green-600 p-1 px-4 py-2 text-white hover:scale-110 hover:bg-green-700 "
            onClick={() => toggleState("openDinner")}
          >
            <PiMoonStarsLight size={30} color="#fff" />
            <span className="ml-2">Jantar</span>
          </button>
          <Modal
            isOpen={state.openDinner}
            onClose={() => toggleState("openDinner")}
          >
            <ListFood type="" />
          </Modal>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4">
        <button
          className="mr-4 rounded-2xl bg-green-600 p-1 px-4 py-2 text-white hover:scale-110 hover:bg-green-700"
          onClick={() => toggleState("openRegisFood")}
        >
          Cadastro de comidas
        </button>
        <Modal
          isOpen={state.openRegisFood}
          onClose={() => toggleState("openRegisFood")}
        >
          <CreateFood
            onClose={() => toggleState("openRegisFood")}
            type=""
            id=""
          />
        </Modal>
        <button
          className="rounded-2xl bg-green-600 p-1 px-4 py-2 text-white hover:scale-110 hover:bg-green-700 "
          onClick={() => toggleState("openListFood")}
        >
          Lista de comidas
        </button>
        <Modal
          isOpen={state.openListFood}
          onClose={() => toggleState("openListFood")}
        >
          <ListFood type="BCreatedBy" />
        </Modal>
      </div>
    </>
  );
}
