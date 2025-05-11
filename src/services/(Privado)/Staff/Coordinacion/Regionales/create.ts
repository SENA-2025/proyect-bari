"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

import createSchema from "@/schemas/(Privado)/Staff/Coordinacion/Regionales/create.schema";

// Tipos
export type ServiceType = {
	eventId?: number;
	error: boolean;
	message?: string;
};

// Validación de Datos
export async function ServiceCreate(formData: FormData): Promise<ServiceType> {
	const cookieStore = await cookies();

	// Validar si existe el Refresh Token
	if (!cookieStore.has("__srfk")) {
		redirect("/acceder");
	}

	// Validar si existe el Access Token
	if (!cookieStore.has("_sid")) {
	}

	try {
		// Validar Datos
		const data = createSchema.parse(Object.fromEntries(formData.entries()));

		console.log(data);

		// Enviar Datos
		return { error: false };
	} catch (error) {
		// Error de Validación
		if (error instanceof ZodError) {
			return { eventId: Date.now(), error: true, message: error.issues.shift()?.message || "Datos inválidos." };
		}

		// Error Interno
		return { eventId: Date.now(), error: true, message: "Error interno. Inténtalo más tarde." };
	}
}
