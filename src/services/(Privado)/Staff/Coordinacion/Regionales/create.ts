"use server";

import { ZodError } from "zod";

import getClientInfo from "@/lib/(Privado)/client-info";
import createSchema from "@/schemas/(Privado)/Staff/Coordinacion/Regionales/create.schema";

// Tipos
export type ServiceType = {
	eventId?: number;
	error: boolean;
	message?: string;
};

// Validación de Datos
export async function ServiceCreate(formData: FormData): Promise<ServiceType> {
	const currentUrl = "/app/staff/c/regionales";
	const { accessToken } = await getClientInfo({ currentUrl });

	try {
		// Validar Datos
		const data = createSchema.parse(Object.fromEntries(formData.entries()));

		// Enviar Datos
		console.log(data);

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
