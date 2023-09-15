import React, { ChangeEventHandler, useState } from "react";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { api } from "next/utils/api";
import { useEffect } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { GrSend } from "react-icons/gr";

const schema = z.object({
  name: z.string(),
  burnCalories: z.number(),
});

const formInicialState = {
  name: "",
  burnCalories: 0,
};

interface Idetails {
  type: string;
  onClose: () => void;
  id?: string;
}

export default function CreateExercise({ type, onClose, id }: Idetails) {
  const exercise = api.exercise.getById.useQuery({ id: id });
  const createExercise = api.exercise.createExercise.useMutation();
  const updateExercise = api.exercise.updateExercise.useMutation();
  const deleteExercise = api.exercise.deleteExercises.useMutation();

  const [form, setForm] = useState(formInicialState);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!id) return;
    if (!exercise.data) return;
    setForm({
      name: exercise.data.name,
      burnCalories: exercise.data.burnCalories,
    });
  }, [exercise.data]);

  const handleSubmitCreate = async (e: any) => {
    e.preventDefault();
    await createExercise.mutateAsync({ ...form, userId: sessionData?.user.id });
    setForm(formInicialState);
    onClose();
  };
  const handleSubmitUpdate = async (e: any) => {
    e.preventDefault();
    if (!id) return;
    await updateExercise.mutateAsync({ ...form, id });
    setForm(formInicialState);
  };
  const handleSubmitDelete = async (e: any) => {
    e.preventDefault();
    if (!id) return;
    await deleteExercise.mutateAsync({ ...form, id });
    setForm(formInicialState);
  };

  let detailsContent;

  if (type === "Details") {
    return (
      <>
        <h2 className="mb-4 text-2xl font-semibold">Cadastro de exercício:</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Calorias Queimadas
            </label>
            <input
              type="number"
              id="burnCalories"
              value={form.burnCalories}
              onChange={(e) =>
                setForm({ ...form, burnCalories: parseInt(e.target.value) })
              }
              name="burnCalories"
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4 flex space-x-2">
            <button
              type="button"
              onClick={handleSubmitUpdate}
              className="ml-auto cursor-pointer rounded-full p-1 hover:scale-110 hover:bg-green-600 hover:bg-opacity-100 focus:outline-none"
            >
              <BsArrowUpCircle />
            </button>
            <button
              type="button"
              onClick={handleSubmitDelete}
              className="ml-auto cursor-pointer rounded-full p-1 hover:scale-110 hover:bg-red-600 hover:bg-opacity-100 focus:outline-none"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Cadastro de exercicio : </h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome{" "}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Calorias Queimadas{" "}
          </label>
          <input
            type="number"
            id="burnCalories"
            value={form.burnCalories}
            onChange={(e) =>
              setForm({ ...form, burnCalories: parseInt(e.target.value) })
            }
            name="burnCalories"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmitCreate}
          className="ml-auto cursor-pointer rounded-full p-1 hover:scale-110 hover:bg-green-600 hover:bg-opacity-100 focus:outline-none"
        >
          <GrSend />
        </button>
      </form>
    </>
  );
}
