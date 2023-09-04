import React, { ChangeEventHandler, use, useState } from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { api } from 'next/utils/api';
import { useEffect } from 'react';

const schema = z.object({
	name: z.string(),
	calories: z.number(),
	carbs: z.number(),
	protein: z.number(),
	fat: z.number(),
})

const formInicialState = {
	name: "",
	calories: 0,
	carbs: 0,
	protein: 0,
	fat: 0,
}
export default function CreateFood({ onClose }: { onClose: () => void }) {
	const createFood = api.food.createFood.useMutation();
	const [form, setForm] = useState(
		formInicialState
	)

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		await createFood.mutateAsync(form)
		setForm(formInicialState)
		onClose()
	}
	const getFoods = api.food.getFoods.useQuery();


	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">Cadastro de Comida : </h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Nome </label>
					<input type="text" id="name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Calorias </label>
					<input type="number" id="Calories" name="Calories" value={form.calories} onChange={(e) => setForm({ ...form, calories: parseInt(e.target.value) })} className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Carboidratos </label>
					<input type="number" id="Carbs" name="Carbs" value={form.carbs} onChange={(e) => setForm({ ...form, carbs: parseInt(e.target.value) })} className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Proteinas </label>
					<input type="number" id="Protein" name="Protein" value={form.protein} onChange={(e) => setForm({ ...form, protein: parseInt(e.target.value) })} className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Gordura </label>
					<input type="number" id="Fat" name="Fat" value={form.fat} onChange={(e) => setForm({ ...form, fat: parseInt(e.target.value) })} className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<button type="submit" className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl flex items-center">
					Enviar
				</button>
			</form>
		</>
	)
}