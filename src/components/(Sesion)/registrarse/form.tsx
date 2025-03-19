"use client";

import { ChevronDown, Eye, EyeOff, ExternalLink } from "lucide-react";
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
			[name]: e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : value,
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
							id="document_type"
							name="document_type"
							value={userData.document_type}
							onChange={handleChange}
							required
							className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all"
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
				<div className="flex flex-col gap-1">
					<label className="select-none text-xs md:text-sm lg:text-base font-medium text-gray-700" htmlFor="document_number">
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
						className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400"
					/>
				</div>

				{/* Correo Electrónico */}
				<div className="flex flex-col gap-1">
					<label className="select-none text-xs md:text-sm lg:text-base font-medium text-gray-700" htmlFor="email">
						Correo Electrónico
					</label>

					<input
						id="email"
						name="email"
						type="email"
						inputMode="email"
						value={userData.email}
						onChange={handleChange}
						autoComplete="email"
						required
						placeholder="Ingresa tu correo electrónico"
						className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400"
					/>
				</div>

				{/* Contraseña */}
				<div className="flex flex-col gap-1">
					<label className="select-none text-xs md:text-sm lg:text-base font-medium text-gray-700" htmlFor="password">
						Contraseña
					</label>

					<div className="relative">
						<input
							id="password"
							name="password"
							type={userData.showPassword ? "text" : "password"}
							value={userData.password}
							onChange={handleChange}
							autoComplete="new-password"
							required
							minLength={10}
							maxLength={38}
							placeholder="Crea tu contraseña"
							className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400"
						/>

						{/* Mostrar Contraseña */}
						<button
							type="button"
							onClick={toggleShowPassword}
							aria-label={userData.showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
							className="absolute right-3 cursor-pointer top-1/2 text-gray-500 hover:text-gray-700 transform -translate-y-1/2 focus:outline-none"
						>
							{userData.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>
				</div>

				{/* Confirmar Contraseña */}
				<div className="flex flex-col gap-1">
					<label className="select-none text-xs md:text-sm lg:text-base font-medium text-gray-700" htmlFor="confirm_password">
						Confirmar Contraseña
					</label>

					<input
						id="confirm_password"
						name="confirm_password"
						type={userData.showPassword ? "text" : "password"}
						value={userData.confirm_password}
						onChange={handleChange}
						autoComplete="new-password"
						required
						minLength={10}
						maxLength={38}
						placeholder="Confirma tu contraseña"
						className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg bg-white text-xs md:text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ease-in-out duration-300 transition-all placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400"
					/>
				</div>

				{/* Términos y Condiciones */}
				<div className="flex items-center gap-2">
					<input
						id="terms"
						name="terms"
						type="checkbox"
						checked={userData.terms}
						onChange={handleChange}
						required
						className="size-4 text-tertiary-600 border-gray-300 rounded focus:ring-primary-400"
					/>

					{/* TODO: Agregar enlace de las TOS */}
					<label htmlFor="terms" className="select-none text-xs md:text-sm lg:text-base text-gray-700">
						Acepto los{" "}
						<a
							href=""
							target="_blank"
							rel="noopener"
							className="inline-flex items-center gap-1 font-medium text-tertiary-600 hover:text-primary-400 transition-colors ease-in-out duration-300"
						>
							Términos y condiciones
							<ExternalLink size={20} />
						</a>
					</label>
				</div>
			</fieldset>

			{/* Boton de Acción */}
			<button
				type="submit"
				disabled={true}
				className="w-full h-10 bg-tertiary-600 hover:bg-primary-400 text-white text-xs md:text-sm lg:text-base font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-400/50 shadow-md hover:shadow-lg cursor-pointer"
			>
				{/* Regístrate */}
			</button>
		</Form>
	);
}
