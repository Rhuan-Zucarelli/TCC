import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import { boolean } from "zod";
import React, { useState } from 'react';
import { TbListDetails } from "react-icons/tb"
import { IoIosAddCircleOutline } from "react-icons/io"
import { Modal } from "../modal/Modal";
import CreateExercise from "../createExercise/CreateExercise";
import { TrainingDay } from "next/pages/training";

interface Iexercise {
  type: String;
  trainingDay?: keyof typeof TrainingDay;
}

interface StateType {
  details: boolean;
};

export default function ListExercises({ type, trainingDay }: Iexercise) {
  const { data: sessionData } = useSession();
  const exercises = api.exercise.getExercises.useQuery();
  const createExerciseTraining = api.training.createExerciseTraining.useMutation();
  const deleteExerciseTraining = api.training.deleteExerciseTraining.useMutation();
  const userExercises = exercises.data?.filter(exercise => exercise.userId === sessionData?.user.id);
  const [state, setState] = useState({
    details: '',
  })

  const training = api.training.getTrainingExercises.useQuery({ userId: sessionData?.user.id, trainingDay });
  console.log(training.data)

  const toggleState = async (key: keyof StateType, id: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: id,
    }));
    await exercises.refetch()
  };

  const handleCreateExerciseTraining = async (id: string,) => {
    console.log(training.data)
    if (!training.data) return
    await createExerciseTraining.mutateAsync({ exerciseId: id, trainingId: training.data?.related.id })
    await training.refetch()
  }

  const handleDeleteExerciseTraining = async (id: string,) => {
    console.log(training.data)
    if (!training.data) return
    await deleteExerciseTraining.mutateAsync({ exerciseId: id, trainingId: training.data?.related.id })
    await training.refetch()

  }

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
                  <CreateExercise type="Details" onClose={() => toggleState('details', '')} id={exercise.id} />
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
        <div className="max-h-80 overflow-y-auto">
          {training.data?.trainingExercise.map((exercise) => (
            <div className="flex items-center border-b border-gray-300 py-2 transition-all hover:bg-gray-100" >
              <p className="mr-2">{exercise.name}</p>
              <button
                onClick={() => handleDeleteExerciseTraining(exercise.id)}
                className={`ml-auto text-green-600 p-1 bg-green-600 text-white rounded-full transition-transform transform scale-110`}>
                <IoIosAddCircleOutline />
              </button>
            </div>
          ))}
          {training.data?.restExercise.map((exercise) => (
            <div className="flex items-center border-b border-gray-300 py-2 transition-all hover:bg-gray-100" >
              <p
                className="mr-2 ">{exercise.name}</p>
              <button
                onClick={() => handleCreateExerciseTraining(exercise.id)}
                className={`ml-auto text-green-600 p-1 hover:bg-green-600 hover:text-white rounded-full transition-transform transform hover:scale-110`}>
                <IoIosAddCircleOutline />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}



