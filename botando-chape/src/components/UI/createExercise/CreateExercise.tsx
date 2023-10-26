import React, { ChangeEventHandler, useState } from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { api } from 'next/utils/api';
import { useEffect } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { GrSend } from 'react-icons/gr';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const schema = z.object({
	name: z.string().nonempty('O campo nome não pode ficar vazio !'),
	burnCalories: z.number().min(1, 'O campo Calorias queimadas não pode ficar vazio !'),
})

const formInicialState = {
	name: "",
	burnCalories: 0,
}

interface Idetails {
	type: string;
	onClose: () => void;
	id?: string;
};

export default function CreateExercise({ type, onClose, id }: Idetails) {
	const exercise = api.exercise.getById.useQuery({ id: id })
	const createExercise = api.exercise.createExercise.useMutation();
	const updateExercise = api.exercise.updateExercise.useMutation();
	const deleteExercise = api.exercise.deleteExercises.useMutation();

	const [form, setForm] = useState(
		formInicialState
	)
	const { data: sessionData } = useSession()

	useEffect(() => {
		if (!id) return
		if (!exercise.data) return
		setForm({
			name: exercise.data.name,
			burnCalories: exercise.data.burnCalories,
		})

	}, [exercise.data])

	const [errorMessages, setErrorMessages] = useState<string[]>([]);

	const handleSubmitCreate = async (e: React.FormEvent) => {
		e.preventDefault();
		const validationResult = schema.safeParse(form);
		if (!validationResult.success) {
			const errorMessages = validationResult.error.issues.map((issue) => issue.message);
			setErrorMessages(errorMessages);
			return;
		}
		console.log('Dados atualizados com sucesso!');
		await createExercise.mutateAsync({ ...form, userId: sessionData?.user.id })
		setForm(formInicialState)
		onClose()

	}

	const validateNumber = (value: string) => {
		if (!value || value.length === 0) return 0
		return parseInt(value);
	}

	const handleSubmitUpdate = async (e: any) => {
		e.preventDefault();
		if (!id) return
		await updateExercise.mutateAsync({ ...form, id })
		setForm(formInicialState)

	}
	const handleSubmitDelete = async (e: any) => {
		e.preventDefault();
		if (!id) return
		await deleteExercise.mutateAsync({ ...form, id })
		setForm(formInicialState)
		onClose()
	}

	if (type === "Details") {
		return (
			<>
				<h2 className="text-2xl font-semibold mb-4">Cadastro de exercício:</h2>
				<form>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Nome</label>
						<input
							type="text"
							id="name"
							name="name"
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
							className="mt-1 p-2 w-full border rounded-md"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">Calorias Queimadas</label>
						<input
							type="number"
							id="burnCalories"
							value={form.burnCalories}
							onChange={(e) => setForm({ ...form, burnCalories: validateNumber(e.target.value) })}
							name="burnCalories"
							className="mt-1 p-2 w-full border rounded-md"
						/>
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
			<h2 className="text-2xl font-semibold mb-4">Cadastro de exercicio : </h2>
			{errorMessages.length > 0 && (
				<div className="flex flex-col">
					{errorMessages.map((message, index) => (
						<div key={index} className="border border-red-500 text-red-500 bg-red-50 p-4 rounded-lg flex flex-col">
							<div className="ml-auto">
								<button type='button' onClick={() => {
									const updatedErrorMessages = [...errorMessages];
									updatedErrorMessages.splice(index, 1);
									setErrorMessages(updatedErrorMessages);
								}}
								>
									<AiOutlineCloseCircle className="text-xl" />
								</button>
							</div>
							<span>{message}</span>
						</div>
					))}
				</div>
			)}
			<form>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Nome </label>
					<input type="text" id="name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Calorias Queimadas </label>
					<input type="number" id="burnCalories" value={form.burnCalories} onChange={(e) => setForm({ ...form, burnCalories: parseInt(e.target.value) })} name="burnCalories" className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<button
					type="button"
					onClick={handleSubmitCreate}
					className="ml-auto cursor-pointer focus:outline-none hover:bg-green-600 hover:bg-opacity-100 rounded-full p-1 hover:scale-110"
				>
					<GrSend />
				</button>
			</form >
		</>
	)
}