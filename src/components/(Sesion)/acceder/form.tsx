"use client";

import { ChevronDown, Eye, EyeOff } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Servicios
import type { ServiceType } from "@/services/(Sesion)/acceder/login";
import { ServiceLogin } from "@/services/(Sesion)/acceder/login";

// Tipos
const initialFormState: ServiceType = { error: false };
function adapter(_state: ServiceType, formData: FormData): Promise<ServiceType> {
	return ServiceLogin(formData);
}

// Componente
export default function Login_Form() {
	const [userData, setUserData] = useState({
		document_type: "CC",
		document_number: "",
		password: "",
		showPassword: false,
	});

	// -- Enviar Formulario
	const [state, formAction, isPending] = useActionState<ServiceType, FormData>(adapter, initialFormState);

	// -- Actualizar Formulario
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		setUserData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// -- Mostrar/Ocultar Contraseña
	const toggleShowPassword = () => {
		setUserData(prev => ({
			...prev,
			showPassword: !prev.showPassword,
		}));
	};

	// -- Toast: Mensaje de Error
	useEffect(() => {
		if (state.error && state.message) {
			toast.error(state.message);
		}

		return undefined;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.id]);

	return (
		<Form action={formAction} className="flex size-full flex-col gap-6">
			{/* Entrada de Datos */}
			<fieldset className="flex flex-col gap-4">
				{/* Tipo de Documento */}
				<div className="flex flex-col gap-1">
					<label className="text-xs font-medium text-gray-700 select-none md:text-sm lg:text-base" htmlFor="document_type">
						Tipo de Documento
					</label>

					<div className="relative">
						<select
							id="document_type"
							name="document_type"
							value={userData.document_type}
							onChange={handleChange}
							required
							className="focus:ring-primary-400 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs transition-all duration-300 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none md:text-sm lg:text-base"
						>
							<option value="CC">Cédula de Ciudadanía</option>
							<option value="TI">Tarjeta de Identidad</option>
							<option value="CE">Cédula de Extranjería</option>
							<option value="PEP">Permiso Especial de Permanencia</option>
							<option value="PPT">Permiso de Protección Temporal</option>
						</select>

						{/* Icono de Flecha */}
						<ChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500" size={20} />
					</div>
				</div>

				{/* Numero de Documento */}
				<div className="flex flex-col gap-1">
					<label className="text-xs font-medium text-gray-700 select-none md:text-sm lg:text-base" htmlFor="document_number">
						Número de Documento
					</label>

					<input
						id="document_number"
						name="document_number"
						type="text"
						inputMode="numeric"
						value={userData.document_number}
						onChange={handleChange}
						required
						minLength={3}
						maxLength={20}
						pattern="[0-9]+"
						placeholder="Ingresa tu número de documento"
						className="focus:ring-primary-400 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs transition-all duration-300 ease-in-out placeholder:text-xs placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:outline-none md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base"
					/>
				</div>

				{/* Contraseña */}
				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between">
						<label className="text-xs font-medium text-gray-700 select-none md:text-sm lg:text-base" htmlFor="password">
							Contraseña
						</label>

						<Link
							className="text-tertiary-600 hover:text-primary-400 text-xs transition-colors duration-300 ease-in-out select-none lg:text-sm"
							href="/restablecer-clave"
						>
							¿Olvidaste tu contraseña?
						</Link>
					</div>

					<div className="relative">
						<input
							id="password"
							name="password"
							type={userData.showPassword ? "text" : "password"}
							value={userData.password}
							onChange={handleChange}
							autoComplete="current-password"
							required
							minLength={10}
							maxLength={38}
							placeholder="Ingresa tu contraseña"
							className="focus:ring-primary-400 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs transition-all duration-300 ease-in-out placeholder:text-xs placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:outline-none md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base"
						/>

						{/* Mostrar Contraseña */}
						<button
							type="button"
							onClick={toggleShowPassword}
							aria-label={userData.showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
							className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
							tabIndex={-1}
						>
							{userData.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>
				</div>
			</fieldset>

			{/* Boton de Acción */}
			<button
				type="submit"
				disabled={isPending}
				className={
					"bg-tertiary-600 hover:bg-primary-400 focus:ring-primary-400/50 h-10 w-full transform rounded-lg text-xs font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:outline-none md:text-sm lg:text-base" +
					`${isPending ? " cursor-progress" : " cursor-pointer"}`
				}
			>
				{isPending ? (
					<div className="flex items-center justify-center gap-2">
						<div className="size-3 animate-bounce rounded-full bg-white [animation-delay:.7s]"></div>
						<div className="size-3 animate-bounce rounded-full bg-white [animation-delay:.3s]"></div>
						<div className="size-3 animate-bounce rounded-full bg-white [animation-delay:.7s]"></div>
					</div>
				) : (
					<span className="select-none">Inicia sesión</span>
				)}
			</button>
		</Form>
	);
}
