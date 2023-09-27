import React, { useState } from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { api } from 'next/utils/api';
import { useEffect } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { GrSend } from 'react-icons/gr';


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
interface Idetails {
	type: string;
	onClose: () => void;
	id?: string;
}

export default function CreateFood({ type, onClose, id }: Idetails) {
	const food = api.food.getById.useQuery({ id: id })
	const createFood = api.food.createFood.useMutation();
	const updateFood = api.food.updateFood.useMutation();
	const deleteFood = api.food.deleteFood.useMutation();

	const [form, setForm] = useState(
		formInicialState
	)
	const { data: sessionData } = useSession()

	useEffect(() => {
		if (!id) return
		if (!food.data) return
		setForm({
			name: food.data.name,
			calories: food.data.calories,
			carbs: food.data.carbs,
			protein: food.data.protein,
			fat: food.data.fat,
		});
	}, [food.data])

	const handleSubmitCreate = async (e: any) => {
		e.preventDefault();
		await createFood.mutateAsync({ ...form, userId: sessionData?.user.id })
		setForm(formInicialState)
		onClose()
	}
	const handleSubmitUpdate = async (e: any) => {
		e.preventDefault();
		if (!id) return
		await updateFood.mutateAsync({ ...form, id })
		setForm(formInicialState)
		onClose()
	}
	const handleSubmitDelete = async (e: any) => {
		e.preventDefault();
		if (!id) return
		await deleteFood.mutateAsync({ ...form, id })
		setForm(formInicialState)
		onClose()
	}

	if (type === 'Details') {
		return (
			<>
				<h2 className="text-2xl font-semibold mb-4">Cadastro de Comida : </h2>
				<form >
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Nome </label>
						<input
							type="text"
							id="name"
							name="name"
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							className="mt-1 p-2 w-full border rounded-md" />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Calorias </label>
						<input
							type="number"
							id="Calories"
							name="Calories"
							value={form.calories}
							onChange={(e) => setForm({ ...form, calories: parseInt(e.target.value) })}
							className="mt-1 p-2 w-full border rounded-md" />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Carboidratos </label>
						<input
							type="number"
							id="Carbs"
							name="Carbs"
							value={form.carbs}
							onChange={(e) => setForm({ ...form, carbs: parseInt(e.target.value) })}
							className="mt-1 p-2 w-full border rounded-md" />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Proteinas </label>
						<input
							type="number"
							id="Protein"
							name="Protein"
							value={form.protein}
							onChange={(e) => setForm({ ...form, protein: parseInt(e.target.value) })}
							className="mt-1 p-2 w-full border rounded-md" />
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Gordura </label>
						<input
							type="number"
							id="Fat"
							name="Fat"
							value={form.fat}
							onChange={(e) => setForm({ ...form, fat: parseInt(e.target.value) })}
							className="mt-1 p-2 w-full border rounded-md" />
					</div>
					<div className="flex space-x-2 mb-4">
						<button
							type="button"
							onClick={handleSubmitUpdate}
							className="ml-auto cursor-pointer focus:outline-none hover:bg-green-600 hover:bg-opacity-100 rounded-full p-1 hover:scale-110"
						>
							<BsArrowUpCircle />
						</button>
						<button
							type="button"
							onClick={handleSubmitDelete}
							className="ml-auto cursor-pointer focus:outline-none hover:bg-red-600 hover:bg-opacity-100 rounded-full p-1 hover:scale-110"
						>
							<MdDeleteOutline />
						</button>
					</div>
				</form>
			</>
		)
	}


	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">Cadastro de Comida : </h2>
			<form>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Nome </label>
					<input
						type="text"
						id="name"
						name="name"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
						className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Calorias </label>
					<input
						type="number"
						id="Calories"
						name="Calories"
						value={form.calories}
						onChange={(e) => setForm({ ...form, calories: parseInt(e.target.value) })}
						className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Carboidratos </label>
					<input
						type="number"
						id="Carbs"
						name="Carbs"
						value={form.carbs}
						onChange={(e) => setForm({ ...form, carbs: parseInt(e.target.value) })}
						className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Proteinas </label>
					<input
						type="number"
						id="Protein"
						name="Protein"
						value={form.protein}
						onChange={(e) => setForm({ ...form, protein: parseInt(e.target.value) })}
						className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Gordura </label>
					<input
						type="number"
						id="Fat"
						name="Fat"
						value={form.fat}
						onChange={(e) => setForm({ ...form, fat: parseInt(e.target.value) })}
						className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<button
					type="button"
					onClick={handleSubmitCreate}
					className="ml-auto cursor-pointer focus:outline-none hover:bg-green-600 hover:bg-opacity-100 rounded-full p-1 hover:scale-110"
				>
					<GrSend />
				</button>
			</form>
		</>
	)
}