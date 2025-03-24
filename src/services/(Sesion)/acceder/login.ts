"use server";

import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";

import loginSchema from "@/schemas/(Sesion)/acceder/login.schema";

// Tipos
export type ServiceType = {
	id?: string;
	error: boolean;
	message?: string;
};

// Validación de Datos
export async function ServiceLogin(formData: FormData): Promise<ServiceType> {
	// TODO: Agregar un rate limit para evitar ataques de fuerza bruta
	// TODO: Agregar un captcha para evitar ataques de fuerza bruta

	try {
		// Validar Datos
		const data = loginSchema.parse(Object.fromEntries(formData.entries()));

		return { id: uuidv4(), error: false, message: "Datos válidos" };
	} catch (error) {
		// Error de Validación
		if (error instanceof ZodError) {
			return { id: uuidv4(), error: true, message: "Credenciales inválidas." };
		}

		// Error Interno
		return { id: uuidv4(), error: true, message: "Error interno. Inténtalo más tarde." };
	}
}
