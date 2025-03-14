"use client";

import { ChevronDown, Eye, EyeOff } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react";

// Servicios
import type { ServiceType } from "@/services/(Session)/acceder/action";
import { ServiceLogin } from "@/services/(Session)/acceder/action";

// Tipos
const initialFormState: ServiceType = { error: false, message: null, fields: null };
async function adapter(state: ServiceType, formData: FormData): Promise<ServiceType> {
	return await ServiceLogin(formData);
}

// Componente
export default function Login_Form() {
	// Estados
	const [showPassword, setShowPassword] = useState(false);
	const [showError, setShowError] = useState(false);

	// Enviar Formulario
	const [state, formAction, isPending] = useActionState<ServiceType, FormData>(adapter, initialFormState);

	// Mostrar Mensaje de Error
	useEffect(() => {
		if (state.error) {
			setShowError(true);

			// Esperar 5 segundos para ocultar el mensaje
			const timer = setTimeout(() => {
				setShowError(false);
				state.error = false;
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [state.error]);

	return (
		<div className="relative size-full">
			<Form action={formAction} className="w-full flex flex-col gap-6">
				{/* Entrada de Datos */}
				<div className="flex flex-col gap-4">
					{/* Tipo de Documento */}
					<div className="flex flex-col gap-1">
						<label className="select-none text-xs md:text-sm lg:text-base font-medium text-gray-700" htmlFor="document_type">
							Tipo de Documento
						</label>

						<div className="relative">
							<select
								className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all"
								id="document_type"
								name="document_type"
								defaultValue="CC"
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

					{/* Numero de Documento */}
					<div className="flex flex-col gap-1">
						<label className="select-none text-xs md:text-sm lg:text-base font-medium text-gray-700" htmlFor="document_number">
							Número de Documento
						</label>

						<input
							className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400"
							id="document_number"
							name="document_number"
							type="text"
							placeholder="Ingresa tu número de documento"
							minLength={3}
							maxLength={20}
							required
						/>
					</div>

					{/* Contraseña */}
					<div className="flex flex-col gap-1">
						<div className="flex justify-between items-center">
							<label className="select-none text-xs md:text-sm lg:text-base font-medium text-gray-700" htmlFor="password">
								Contraseña
							</label>

							<Link className="select-none text-xs lg:text-sm text-tertiary-600 hover:text-primary-400 transition-colors ease-in-out duration-300" href="/restablecer-clave">
								¿Olvidaste tu contraseña?
							</Link>
						</div>

						<div className="relative">
							<input
								className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400"
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								placeholder="Ingresa tu contraseña"
								autoComplete="current-password"
								minLength={10}
								maxLength={38}
								required
							/>

							{/* Mostrar Contraseña */}
							<button
								className="absolute right-3 cursor-pointer top-1/2 text-gray-500 hover:text-gray-700 transform -translate-y-1/2 focus:outline-none"
								type="button"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>
				</div>

				{/* Boton de Acción */}
				<button
					className="w-full py-2 bg-tertiary-600 hover:bg-primary-400 text-white text-sm lg:text-base font-medium rounded-lg transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
					type="submit"
					disabled={isPending}
				>
					{/* TODO: ORGANICE */}
					{/* <div className="flex flex-row gap-2">
						<div className="size-4 animate-bounce rounded-full bg-primary-500 [animation-delay:.7s]"></div>
						<div className="size-4 animate-bounce rounded-full bg-primary-500 [animation-delay:.3s]"></div>
						<div className="size-4 animate-bounce rounded-full bg-primary-500 [animation-delay:.7s]"></div>
					</div> */}
					<span className="select-none">{isPending ? "Cargando..." : "Iniciar Sesión"}</span>
				</button>
			</Form>

			{/* Mensaje de Error */}
			{showError && state.message && (
				<div className="fixed -bottom-4 -right-4 bg-red-500 px-4 py-2 rounded-md shadow-lg z-[9999] max-w-max">
					<span className="text-white select-none">{state.message}</span>
				</div>
			)}
		</div>
	);
}
