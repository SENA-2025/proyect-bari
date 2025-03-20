import { z } from "zod";

export const actionSchema = z
	.object({
		document_type: z.enum(["CC", "TI", "CE", "PEP", "PPT"], {
			message: "Por favor, selecciona un tipo de documento válido.",
		}),
		document_number: z
			.string()
			.trim()
			.nonempty("El número de documento es obligatorio.")
			.min(3, "El número de documento debe contener al menos 3 caracteres.")
			.max(20, "El número de documento no debe superar los 20 caracteres.")
			.regex(/^[0-9]+$/, "El número de documento solo puede contener números."),
		email: z.string().trim().nonempty("El correo electrónico es obligatorio.").email("Por favor, ingresa un correo electrónico válido."),
		password: z
			.string()
			.trim()
			.nonempty("La contraseña es obligatoria.")
			.min(10, "La contraseña debe contener al menos 10 caracteres.")
			.max(38, "La contraseña no debe superar los 38 caracteres.")
			.regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula.")
			.regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula.")
			.regex(/[0-9]/, "La contraseña debe contener al menos un número.")
			.regex(/[\W_]/, "La contraseña debe contener al menos un símbolo especial."),
		confirm_password: z.string().trim().nonempty("Por favor, confirma tu contraseña."),
		terms: z.literal("on", {
			errorMap: () => ({ message: "Debes aceptar los términos y condiciones." }),
		}),
	})
	.strict("")
	.refine(data => data.password === data.confirm_password, {
		message: "Las contraseñas no coinciden. Asegúrate de que la contraseña y la confirmación sean idénticas.",
		path: ["confirm_password"],
	});

export type ActionType = z.infer<typeof actionSchema>;
