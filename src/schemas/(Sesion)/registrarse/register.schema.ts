import { z } from "zod";

const actionSchema = z
	.object({
		document_type: z.enum(["CC", "TI", "CE", "PEP", "PPT"], {
			message: "Tipo de documento inválido.",
		}),
		document_number: z
			.string()
			.trim()
			.nonempty("Número de documento requerido.")
			.min(3, "El número debe tener al menos 3 caracteres.")
			.max(20, "El número debe tener máximo 20 caracteres.")
			.regex(/^[0-9]+$/, "El número solo puede contener números."),
		email: z
			.string()
			.trim()
			.nonempty("Correo requerido.")
			.min(6, "El correo debe tener al menos 6 caracteres.")
			.max(254, "El correo debe tener máximo 254 caracteres.")
			.email("Correo inválido."),
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
		confirm_password: z.string().trim().nonempty("Confirma tu contraseña."),
		terms: z.literal("on", {
			errorMap: () => ({ message: "Debes aceptar los términos." }),
		}),
	})
	.strict("Completa todos los campos.")
	.refine(data => data.password === data.confirm_password, {
		message: "Las contraseñas no coinciden.",
		path: ["confirm_password"],
	});

export default actionSchema;
