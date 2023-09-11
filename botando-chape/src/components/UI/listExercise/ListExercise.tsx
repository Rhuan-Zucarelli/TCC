import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import { boolean } from "zod";
import React, { useState } from 'react';
import { TbListDetails } from "react-icons/tb"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Modal } from "../modal/Modal";
import CreateExercise from "../createExercise/CreateExercise";

interface Iexercise {
  type: String;
}

interface StateType {
  details: boolean;
};

export default function ListExercises({ type }: Iexercise) {
  const { data: sessionData } = useSession();
  const exercises = api.exercise.getExercises.useQuery();
  const userExercises = exercises.data?.filter(exercise => exercise.userId === sessionData?.user.id);
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
          {userExercises?.map((exercise) => (
            <div className="flex items-center border-b border-gray-300 py-2 transition-all hover:bg-gray-100" >
              <p className="mr-2">
                {exercise.name}
              </p>
              <button
                className={`ml-auto text-green-600 p-1 hover:bg-green-600 hover:text-white rounded-full transition-transform transform hover:scale-110`}
                onClick={() => toggleState('details', exercise.id)}
              >
                <TbListDetails />
              </button>
              <Modal isOpen={state.details === exercise.id} onClose={() => toggleState('details', '')}>
                {state.details === exercise.id && (
                  <CreateExercise type="Details" onClose={() => toggleState('details','')} id={exercise.id} />
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
    <div className="border-t border-gray-300 py-2">
      {exercises.data?.map((exercise) => (
        <div className="flex items-center border-b border-gray-300 py-2 transition-all hover:bg-gray-100" >
          <p className="mr-2">{exercise.name}</p>
          <button
            className={`ml-auto text-green-600 p-1 hover:bg-green-600 hover:text-white rounded-full transition-transform transform hover:scale-110`}>
            <IoIosAddCircleOutline />
          </button>
        </div>
      ))}
    </div>
  </>
  )
}



