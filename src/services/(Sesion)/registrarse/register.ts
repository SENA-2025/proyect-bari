"use server";

import { request } from "undici";
import { ZodError } from "zod";

import registerSchema from "@/schemas/(Sesion)/registrarse/register.schema";

// Tipos
export type ServiceType = {
	eventId?: number;
	error: boolean;
	message?: string;
};

// Validación de Datos
export async function ServiceRegister(formData: FormData): Promise<ServiceType> {
	// TODO: Agregar un rate limit para evitar ataques de fuerza bruta
	// TODO: Agregar un captcha para evitar ataques de fuerza bruta

	try {
		// Validar Datos
		const data = registerSchema.parse(Object.fromEntries(formData.entries()));

		// Enviar Datos
		const { statusCode } = await request(process.env.API_AUTH_URL + "/auth/register", {
			method: "POST",
			headersTimeout: 1 * 60 * 1_000,
			headers: {
				Connection: "keep-alive",
				Authorization: "Bearer " + process.env.API_AUTH_TOKEN,
				"Content-Type": "application/json",
				"User-Agent": "NextJS - Register.ts (Node.js " + process.version + ")",
			},
			body: JSON.stringify(data),
		});

		// Validar Respuesta
		if (statusCode === 201) {
			return { eventId: Date.now(), error: false, message: "Registro exitoso." };
		} else if (statusCode === 409) {
			return { eventId: Date.now(), error: false, message: "El registro ya existe." };
		}

		// Error Interno
		if (statusCode >= 500) {
			return { eventId: Date.now(), error: true, message: "Error interno. Inténtalo más tarde." };
		}

		// Otros Errores
		return { eventId: Date.now(), error: true, message: "Datos inválidos." };
	} catch (error) {
		// Error de Validación
		if (error instanceof ZodError) {
			return { eventId: Date.now(), error: true, message: error.issues.shift()?.message || "Datos inválidos." };
		}

		// Error Interno
		return { eventId: Date.now(), error: true, message: "Error interno. Inténtalo más tarde." };
	}
}
