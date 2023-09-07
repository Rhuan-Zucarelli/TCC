import React, { ChangeEventHandler, useState } from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { api } from 'next/utils/api';
import { useEffect } from 'react';

const schema = z.object({
	name: z.string(),
	burnCalories: z.number(),
})

const formInicialState = {
	name: "",
	burnCalories: 0,
}

export default function CreateExercise({ onClose }: { onClose: () => void }) {
	const createExercise = api.exercise.createExercise.useMutation();
	const [form, setForm] = useState(
		formInicialState
	)
	const { data: sessionData } = useSession()

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		await createExercise.mutateAsync({ ...form, userId: sessionData?.user.id })
		setForm(formInicialState)
		onClose()
	}


	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">Cadastro de exercicio : </h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Nome </label>
					<input type="text" id="name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Calorias Queimadas </label>
					<input type="number" id="burnCalories" value={form.burnCalories} onChange={(e) => setForm({ ...form, burnCalories: parseInt(e.target.value) })} name="burnCalories" className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<button type="submit" className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl flex items-center">
					Enviar
				</button>
			</form >
		</>
	)
}