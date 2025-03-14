"use server";

import { z } from "zod";

export const actionSchema = z
	.object({
		document_type: z.enum(["CC", "TI", "CE", "PEP", "PPT"], {
			message: "Tipo de documento inválido",
		}),
		document_number: z
			.string()
			.trim()
			.nonempty("Número de documento requerido")
			.min(3, "Debe contener al menos 3 caracteres")
			.max(20, "No debe superar los 20 caracteres")
			.regex(/^[0-9]+$/, "Solo se permiten números"),
		password: z
			.string()
			.trim()
			.nonempty("Contraseña requerida")
			.min(10, "Debe contener al menos 10 caracteres")
			.max(38, "No debe superar los 38 caracteres")
			.regex(/[A-Z]/, "Debe contener una letra mayúscula")
			.regex(/[a-z]/, "Debe contener una letra minúscula")
			.regex(/[0-9]/, "Debe contener un número")
			.regex(/[\W_]/, "Debe contener un símbolo especial"),
	})
	.refine(data => data.password !== data.document_number, {
		message: "La contraseña no puede coincidir con el número de documento",
		path: ["password"],
	});

export type ActionType = z.infer<typeof actionSchema>;
