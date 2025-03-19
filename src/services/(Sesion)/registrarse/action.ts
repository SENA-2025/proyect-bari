"use server";

import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";

import type { ActionType } from "@/schemas/(Sesion)/registrarse/action.schema";
import { actionSchema } from "@/schemas/(Sesion)/registrarse/action.schema";

// Tipos
export type ServiceType = {
	id?: string;
	error: boolean;
	message?: string;
};

// Validación de Datos
export async function ServiceRegister(formData: FormData): Promise<ServiceType> {
	const data: ActionType = Object.fromEntries(formData.entries()) as ActionType;

	// TODO: Agregar un rate limit para evitar ataques de fuerza bruta
	// TODO: Agregar un captcha para evitar ataques de fuerza bruta

	try {
		actionSchema.parse(data);

		return { id: uuidv4(), error: false, message: "Datos válidos" };
	} catch (error) {
		// Error de Validación
		if (error instanceof ZodError) {
			return { id: uuidv4(), error: true, message: "Datos inválidos." };
		}

		// Error Interno
		return { id: uuidv4(), error: true, message: "Error interno. Inténtalo más tarde." };
	}
}
