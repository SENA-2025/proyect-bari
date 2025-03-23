"use server";

import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import { request } from "undici";

import registerSchema from "@/schemas/(Sesion)/registrarse/register.schema";

// Tipos
export type ServiceType = {
	id?: string;
	error: boolean;
	message?: string;
};

// Validación de Datos
export async function ServiceRegister(formData: FormData): Promise<ServiceType> {
	// TODO: Agregar un rate limit para evitar ataques de fuerza bruta
	// TODO: Agregar un captcha para evitar ataques de fuerza bruta

	try {
		const data = registerSchema.parse(Object.fromEntries(formData.entries()));

		const { statusCode } = await request(process.env.API_AUTH_URL + "/auth/register", {
			method: "POST",
			headers: {
				Connection: "keep-alive",
				Authorization: "Bearer " + process.env.API_AUTH_TOKEN,
			},
			body: JSON.stringify(data),
		});

		if (statusCode === 200) {
			return { id: uuidv4(), error: false, message: "Registro exitoso." };
		} else if (statusCode === 409) {
			return { id: uuidv4(), error: false, message: "El registro ya existe." };
		}

		return { id: uuidv4(), error: true, message: "Datos inválidos." };
	} catch (error) {
		// Error de Validación
		if (error instanceof ZodError) {
			return { id: uuidv4(), error: true, message: error.issues.shift()?.message || "Datos inválidos." };
		}

		// Error Interno
		return { id: uuidv4(), error: true, message: "Error interno. Inténtalo más tarde." };
	}
}
