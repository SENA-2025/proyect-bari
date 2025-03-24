import { z } from "zod";

const actionSchema = z.object({
	document_type: z.enum(["CC", "TI", "CE", "PEP", "PPT"], {
		message: "Tipo de documento inválido",
	}),
	document_number: z
		.string()
		.trim()
		.nonempty("Número de documento requerido.")
		.min(3, "El número debe tener al menos 3 caracteres.")
		.max(20, "El número debe tener máximo 20 caracteres.")
		.regex(/^[0-9]+$/, "El número solo puede contener números."),
	password: z
		.string()
		.trim()
		.nonempty("Contraseña requerida.")
		.min(10, "La contraseña debe tener al menos 10 caracteres.")
		.max(38, "La contraseña debe tener máximo 38 caracteres.")
		.regex(/[A-Z]/, "Debe incluir una mayúscula.")
		.regex(/[a-z]/, "Debe incluir una minúscula.")
		.regex(/[0-9]/, "Debe incluir un número.")
		.regex(/[\W_]/, "Debe incluir un símbolo."),
});

export default actionSchema;
