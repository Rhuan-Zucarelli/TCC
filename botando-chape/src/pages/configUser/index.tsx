import React, { ChangeEventHandler, useState } from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { api } from 'next/utils/api';
import { useEffect } from 'react';
import { GrSend } from 'react-icons/gr';

const schema = z.object({
  age: z.number().min(1, 'Você deve ter mais que 1 ano de idade para cadastrar!').max(999, 'Você não pode estar vivo se tem essa idade!'),
  gender: z.string().nonempty('O campo Genero não pode estar vazio !'),
  height: z.number().min(1, 'O campo Altura não pode estar vazio'),
  weight: z.number().min(1, 'O campo Peso não pode estar vazio'),
  targetWeight: z.number().min(1, 'O campo Peso Alvo não pode estar vazio'),
});

export default function ConfigUser() {
  const { data: sessionData } = useSession();
  const user = api.user.getUser.useQuery({ id: sessionData?.user.id });
  const updateUser = api.user.updateUser.useMutation();

  const [formData, setFormData] = useState({
    age: user.data?.age || 0,
    gender: user.data?.gender || '',
    height: user.data?.height || 0,
    weight: user.data?.weight || 0,
    targetWeight: user.data?.targetWeight || 0,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      age: user.data?.age || 0,
      gender: user.data?.gender || '',
      height: user.data?.height || 0,
      weight: user.data?.weight || 0,
      targetWeight: user.data?.targetWeight || 0,
    }));
  }, [user.data]);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = schema.safeParse(formData);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map((issue) => issue.message);
      setErrorMessages(errorMessages);

      setTimeout(() => {
        setErrorMessages([]);
      }, 5000);

      return;
    }
    await updateUser.mutateAsync({
      ...formData,
      userId: sessionData!.user.id
    })
    console.log('Dados atualizados com sucesso!');
  };

  const validateNumber = (value: string) => {
    if (!value || value.length === 0) return 0
    return parseInt(value);
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Formulário</h1>
      {errorMessages.length > 0 && (
        <div className="mb-4">
          {errorMessages.map((message, index) => (
            <div key={index} className="border border-red-500 text-red-500 bg-red-50 p-4 rounded-lg flex flex-co">
              {message}
            </div>
          ))}
        </div>
      )}
      <form>
        <div className="mb-4">
          <label htmlFor="age" className="block mb-1">
            Idade:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: validateNumber(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-1">
            Gênero:
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="height" className="block mb-1">
            Altura (cm):
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: validateNumber(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="weight" className="block mb-1">
            Peso (kg):
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: validateNumber(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="targetWeight" className="block mb-1">
            Peso Alvo (kg):
          </label>
          <input
            type="number"
            id="targetWeight"
            name="targetWeight"
            value={formData.targetWeight}
            onChange={(e) => setFormData({ ...formData, targetWeight: validateNumber(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmitUpdate}
          className="ml-auto cursor-pointer focus:outline-none hover:bg-green-600 hover:bg-opacity-100 rounded-full p-1 hover:scale-110"
        >
          <GrSend />
        </button>
      </form>
    </div>
  );
}