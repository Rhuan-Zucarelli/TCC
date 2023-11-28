import { Modal } from "next/components/UI/modal/Modal";
import React, { useState, useEffect } from "react";
import { PiSunHorizon } from "react-icons/Pi";
import { PiSunDim } from "react-icons/Pi";
import { PiMoonStarsLight } from "react-icons/Pi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListFood from "next/components/UI/listFood/ListFood";
import CreateFood from "next/components/UI/createFood/CreateFood";
import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import { type Food } from "@prisma/client";
import { calcFoods } from "next/utils/tools";

type StateType = {
  openBreackFast: boolean;
  openLunch: boolean;
  openDinner: boolean;
  openRegisFood: boolean;
  openListFood: boolean;
};

export enum MealType {
  CAFEDAMANHA = "CAFEDAMANHA",
  ALMOCO = "ALMOCO",
  JANTAR = "JANTAR",
}

export default function Food() {
  const [state, setState] = useState<StateType>({
    openBreackFast: false,
    openLunch: false,
    openDinner: false,
    openRegisFood: false,
    openListFood: false,
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [calc, setCalc] = useState({
    totalCaloriesPerDay: 0,
    totalCarbsPerDay: 0,
    totalProteinPerDay: 0,
    totalFatPerDay: 0,
  });
  const dataini = new Date();
  dataini.setHours(0, 0, 0, 0);

  const toggleState = (key: keyof StateType) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const { data: sessionData } = useSession();
  if (!sessionData?.user.id) {
    return;
  }

  const snackOne = api.meal.getMealfood.useQuery({
    userId: sessionData?.user.id,
    mealType: "CAFEDAMANHA",
    dateMeal: dataini.toISOString(),
  });
  const snackTwo = api.meal.getMealfood.useQuery({
    userId: sessionData?.user.id,
    mealType: "ALMOCO",
    dateMeal: dataini.toISOString(),
  });
  const snackThree = api.meal.getMealfood.useQuery({
    userId: sessionData?.user.id,
    mealType: "JANTAR",
    dateMeal: dataini.toISOString(),
  });

  useEffect(() => {
    let snackOneData = snackOne.data?.mealFood as Food[];
    let snackTwoData = snackTwo.data?.mealFood as Food[];
    let snackThreeData = snackThree.data?.mealFood as Food[];
    let data = calcFoods(snackOneData, snackTwoData, snackThreeData);
    setCalc(data);
  }, [selectedDate, state]);

  console.log(state);
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex w-full flex-row items-center justify-between p-4">
          <table className="mt-2 table-auto border-collapse responsive-table">
            <thead className="text-center">
              <tr>
                <th className="px-10 py-2 text-lg font-medium">
                  Proteínas
                </th>
                <th className="px-10 py-2 text-lg font-medium">
                  Carboidratos
                </th>
                <th className="px-10 py-2 text-lg font-medium">
                  Gorduras
                </th>
                <th className="px-10 py-2 text-lg font-medium">
                  Calorias
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="px-4 py-2">
                  {calc?.totalProteinPerDay} g
                </td>
                <td className="px-4 py-2">
                  {calc?.totalCarbsPerDay} g
                </td>
                <td className="px-4 py-2">
                  {calc?.totalFatPerDay} g
                </td>
                <td className="px-4 py-2">
                  {calc?.totalCaloriesPerDay} cal
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex h-screen flex-col items-center justify-center">
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
              <ListFood type="" mealType={MealType.CAFEDAMANHA} />
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
              <ListFood type="" mealType={MealType.ALMOCO} />
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
              <ListFood type="" mealType={MealType.JANTAR} />
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
              type=""
              onClose={() => toggleState("openRegisFood")}
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
      </div>
    </>
  );
}
