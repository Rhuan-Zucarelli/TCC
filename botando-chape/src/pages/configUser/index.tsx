import React, { ChangeEventHandler, useState } from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { api } from 'next/utils/api';
import { useEffect } from 'react';

const schema = z.object({
  age: z.number(),
  gender: z.string(),
  height: z.number(),
  weight: z.number(),
  targetWeight: z.number(),
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const validationResult = schema.safeParse(formData);
      if (!validationResult.success) {
        console.error('Form data is not valid:', validationResult.error);
        return;
      }

      if (!sessionData?.user.id) return
      // Chama a rota trpc para atualizar o usuário
      await updateUser.mutateAsync({
        userId: sessionData?.user.id,
        ...formData,
      });

      // Realiza qualquer lógica adicional necessária após o envio

      console.log('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      // Trate o erro conforme necessário
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Formulário</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="age" className="block mb-1">
            Idade:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
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
            onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
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
            onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
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
            onChange={(e) => setFormData({ ...formData, targetWeight: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
