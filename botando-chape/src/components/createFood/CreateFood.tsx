import React, { ChangeEventHandler, useState } from 'react';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import { api } from 'next/utils/api';
import { useEffect } from 'react';

const schema = z.object({
	name: z.string(),
	burnCalories: z.number(),
})

export default function CreateFood() {

	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">Cadastro de Comida : </h2>
			<form>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Nome </label>
					<input type="text" id="name" name="name" className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Calorias </label>
					<input type="number" id="Calories" name="Calories" className="mt-1 p-2 w-full border rounded-md" />
				</div>
                <div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Carboidratos </label>
					<input type="number" id="Carbs" name="Carbs" className="mt-1 p-2 w-full border rounded-md" />
				</div>
                <div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Proteinas </label>
					<input type="number" id="Protein" name="Protein" className="mt-1 p-2 w-full border rounded-md" />
				</div>
                <div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">Gordura </label>
					<input type="number" id="Fat" name="Fat" className="mt-1 p-2 w-full border rounded-md" />
				</div>
				<button type="submit" className="bg-green-600 hover:bg-green-700 hover:scale-110 text-white px-4 py-2 rounded-2xl flex items-center">
					Enviar
				</button>
			</form>
		</>
	)
}