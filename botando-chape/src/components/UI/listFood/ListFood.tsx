import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import React, { useState } from 'react';
import { Modal } from "../modal/Modal";
import CreateFood from "../createFood/CreateFood";
import { TbListDetails } from "react-icons/tb"
import { IoIosAddCircleOutline } from "react-icons/io"
import { MealType } from "next/pages/food";
import SimpleBar from "simplebar-react";


interface IcreatedBy {
  type: string;
  mealType: keyof typeof MealType
};
interface StateType {
  details: boolean;
};

const data = new Date()
data.setHours(0, 0, 0, 0)


export default function ListFood({ type, mealType }: IcreatedBy) {
  const { data: sessionData } = useSession();
  const foods = api.food.getFoods.useQuery();
  const createMealFood = api.meal.createMealFood.useMutation();
  const deleteMealFood = api.meal.deleteMealFood.useMutation();
  const userFoods = foods.data?.filter(food => food.userId === sessionData?.user.id)
  const [state, setState] = useState({
    details: '',
  })

  const meal = api.meal.getMealfood.useQuery({ userId: sessionData?.user.id, mealType, dateMeal: data.toISOString() })
  console.log(foods.data)

  const toggleState = (key: keyof StateType, id: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: id,
    }));
  };

  const handleCreateMealFood = async (id: string,) => {
    console.log(foods.data)
    if (!meal.data) return
    await createMealFood.mutateAsync({ foodId: id, mealId: meal.data?.related.id })
    await meal.refetch()
  }

  const handleDeleteMealFood = async (id: string,) => {
    console.log(foods.data)
    if (!meal.data) return
    await deleteMealFood.mutateAsync({ foodId: id, mealId: meal.data?.related.id })
    await meal.refetch()
  }

  if (type === "BCreatedBy") {
    return (
      <>
        <div className="list-disc pl-4">
          {userFoods?.map((food) => (
            <div className="flex items-center border-b border-gray-300 py-2 transition-all hover:bg-gray-100" >
              <p className="mr-2">
                {food.name}
              </p>
              <button
                className={`ml-auto text-green-600 p-1 hover:bg-green-600 hover:text-white rounded-full transition-transform transform hover:scale-110`}
                onClick={() => toggleState('details', food.id)}
              >
                <TbListDetails />
              </button>
              <Modal isOpen={state.details === food.id} onClose={() => toggleState('details', '')}>
                {state.details === food.id && (
                  <CreateFood type="Details" onClose={() => toggleState('details', '')} id={food.id} />
                )}
              </Modal>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="border-t border-gray-300 py-2" style={{ maxHeight: '300px' }}>
        <SimpleBar style={{ maxHeight: '100%' }}>
          {meal.data?.mealFood.map((food) => (
            <div
              key={food.id}
              className="flex items-center border-b border-gray-300 py-2 transition-all hover:bg-gray-100"
            >
              <p className="mr-2">{food.name}</p>
              <button
                onClick={() => handleDeleteMealFood(food.id)}
                className="ml-auto p-1 bg-green-600 text-white rounded-full transition-transform transform scale-110"
              >
                <IoIosAddCircleOutline />
              </button>
            </div>
          ))}
          {meal.data?.restFood.map((food) => (
            <div
              key={food.id}
              className="flex items-center border-b border-gray-300 py-2 transition-all hover:bg-gray-100"
            >
              <p className="mr-2">{food.name}</p>
              <button
                onClick={() => handleCreateMealFood(food.id)}
                className="ml-auto text-green-600 p-1 hover:bg-green-600 hover:text-white rounded-full transition-transform transform hover:scale-110"
              >
                <IoIosAddCircleOutline />
              </button>
            </div>
          ))}
        </SimpleBar>
      </div>
    </>
  )

}