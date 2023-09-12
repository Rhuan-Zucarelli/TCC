import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import React, { useState } from 'react';
import { Modal } from "../modal/Modal";
import CreateFood from "../createFood/CreateFood";
import { TbListDetails } from "react-icons/tb"

interface IcreatedBy {
  type: string;
};
interface StateType {
  details: boolean;
};

export default function ListFood({ type }: IcreatedBy) {
  const { data: sessionData } = useSession();
  const foods = api.food.getFoods.useQuery();
  const userFoods = foods.data?.filter(food => food.userId === sessionData?.user.id)
  const [state, setState] = useState({
    details: '',
  })

  const toggleState = (key: keyof StateType, id: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: id,
    }));
  };

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
      <div className="flex flex-col flex-wrap gap-4">
        <div>
          {foods.data?.map((food) => (
            <div>
              {food.name}
            </div>
          ))}
        </div>
      </div>
    </>
  )

}