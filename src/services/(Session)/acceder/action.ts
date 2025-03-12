"use server";

export type ServiceType = {
	error: boolean;
	message: string | null;
	fields?: {
		type: string;
		number: string;
		password: string;
	} | null;
};

export async function ServiceLogin(formData: FormData): Promise<ServiceType> {
	// Validar: Datos Obligatorios
	const keysRequired = ["document_type", "document_number", "password"];
	if (keysRequired !== Array.from(formData.keys())) {
		return { error: true, message: "Complete los campos" };
	}


	console.log(formData)

	// Enviar Datos
	return {
		error: true,
		message: "¡Bienvenido!",
	};
};