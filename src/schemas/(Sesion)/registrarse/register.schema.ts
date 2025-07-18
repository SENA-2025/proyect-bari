import { z } from "zod";

const actionSchema = z
	.strictObject({
		document_type: z.enum(["CC", "TI", "CE", "PEP", "PPT"], {
			error: "Tipo de documento inválido.",
		}),
		document_number: z
			.string("Número de documento requerido.")
			.trim()
			.nonempty("Número de documento requerido.")
			.min(3, "El número debe tener al menos 3 caracteres.")
			.max(20, "El número debe tener máximo 20 caracteres.")
			.regex(/^[0-9]+$/, "El número solo puede contener números."),
		email: z
			.string("Correo requerido.")
			.trim()
			.nonempty("Correo requerido.")
			.min(6, "El correo debe tener al menos 6 caracteres.")
			.max(254, "El correo debe tener máximo 254 caracteres.")
			.email("Correo inválido.")
			.transform(value => value.toLowerCase()),
		password: z
			.string("Contraseña requerida.")
			.trim()
			.nonempty("Contraseña requerida.")
			.min(10, "La contraseña debe tener al menos 10 caracteres.")
			.max(38, "La contraseña debe tener máximo 38 caracteres.")
			.regex(/[A-Z]/, "Debe incluir una mayúscula.")
			.regex(/[a-z]/, "Debe incluir una minúscula.")
			.regex(/[0-9]/, "Debe incluir un número.")
			.regex(/[\W_]/, "Debe incluir un símbolo."),
		confirm_password: z.string("Confirma tu contraseña").trim().min(1,"Confirma tu contraseña."),
		terms: z.literal("on", {  error: "Debes aceptar los términos." }),
	}).refine(data => data.password === data.confirm_password, {
		error: "Las contraseñas no coinciden.",
		path: ["confirm_password"],
	});

export default actionSchema;