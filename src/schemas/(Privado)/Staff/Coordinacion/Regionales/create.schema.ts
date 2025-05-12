import { z } from "zod";

const actionSchema = z
	.object({
		name: z
			.string()
			.trim()
			.nonempty("Nombre requerido.")
			.min(3, "El nombre debe tener mínimo 3 caracteres.")
			.max(50, "El nombre debe tener máximo 50 caracteres.")
			.regex(/^[a-zA-Z0-9 ]+$/, "El nombre solo puede contener letras, números y espacios.")
			.transform(value => value.toUpperCase()),
		abbreviation: z
			.string()
			.trim()
			.nonempty("Abreviatura requerida.")
			.min(2, "La abreviatura debe tener mínimo 2 caracteres.")
			.max(6, "La abreviatura debe tener máximo 6 caracteres.")
			.regex(/^[a-zA-Z0-9]+$/, "La abreviatura solo puede contener letras y números.")
			.transform(value => value.toUpperCase()),
	})
	.strict("Completa todos los campos.");

export default actionSchema;
