"use client";

import { ChevronDown, Eye, EyeOff } from "lucide-react";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";

// Servicios

// Tipos

// Componente
export default function Register_Form() {
	const [userData, setUserData] = useState({
		document_type: "CC",
		document_number: "",
		email: "",
		password: "",
		confirm_password: "",
		terms: false,
		showPassword: false,
	});

	// -- Enviar Formulario

	// -- Actualizar Formulario
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		setUserData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// -- Mostrar/Ocultar Contraseña

	// -- Toast: Mensaje de Error

	return (
		<Form action={""} className="size-full flex flex-col gap-6">
			{/* Entrada de Datos */}
			<fieldset className="flex flex-col gap-4">
				{/* Tipo de Documento */}
				<div className="flex flex-col gap-1">
					<label className="select-none text-xs md:text-sm lg:text-base font-medium text-gray-700" htmlFor="document_type">
						Tipo de Documento
					</label>

					<div className="relative">
						<select
							value={userData.document_type}
							onChange={handleChange}
							className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all"
							id="document_type"
							name="document_type"
							required
						>
							<option value="CC">Cédula de Ciudadanía</option>
							<option value="TI">Tarjeta de Identidad</option>
							<option value="CE">Cédula de Extranjería</option>
							<option value="PEP">Permiso Especial de Permanencia</option>
							<option value="PPT">Permiso de Protección Temporal</option>
						</select>

						{/* Icono de Flecha */}
						<ChevronDown className="absolute right-3 top-1/2 text-gray-500 transform -translate-y-1/2 pointer-events-none" size={20} />
					</div>
				</div>

				{/* Número de Documento */}
				<div className="flex flex-col gap-1"></div>

				{/* Correo Electrónico */}
				<div className="flex flex-col gap-1"></div>

				{/* Contraseña */}
				<div className="flex flex-col gap-1"></div>

				{/* Confirmar Contraseña */}
				<div className="flex flex-col gap-1"></div>

				{/* Términos y Condiciones */}
				<div className="flex flex-col gap-1"></div>
			</fieldset>

			{/* Boton de Acción */}
			<button>{/* Regístrate */}</button>
		</Form>
	);
}
