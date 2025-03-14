"use server";

// Tipos
export type ServiceType = {
	error: boolean;
	message: string | null;
};

// Validación de Datos
export async function ServiceLogin(formData: FormData): Promise<ServiceType> {
	// Validar: Datos Obligatorios
	const keysRequired = ["document_type", "document_number", "password"];
	if (keysRequired !== Array.from(formData.keys())) {
		return { error: true, message: "Complete los campos" };
	}

	console.log(formData);

	// Enviar Datos
	return {
		error: true,
		message: "¡Bienvenido!",
	};
}
