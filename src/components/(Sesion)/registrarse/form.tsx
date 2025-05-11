"use client";

import { ExternalLink, Eye, EyeOff, TriangleAlert } from "lucide-react";
import dynamic from "next/dynamic";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Suspense, useActionState, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Utilidades
import { cn } from "@/lib/utils";

// Componentes
const DocumentType = dynamic(() => import("@/components/UI/Formularios/(Sesion)/document-type"));
const DocumentNumber = dynamic(() => import("@/components/UI/Formularios/(Sesion)/document-number"));

// Servicios
import type { ServiceType } from "@/services/(Sesion)/registrarse/register";
import { ServiceRegister } from "@/services/(Sesion)/registrarse/register";

// Tipos
const initialFormState: ServiceType = { error: false };
function adapter(_state: ServiceType, formData: FormData): Promise<ServiceType> {
	return ServiceRegister(formData);
}

// Componente
export default function Register_Form() {
	const router = useRouter();
	const [userData, setUserData] = useState({
		document_type: "",
		document_number: "",
		email: "",
		password: "",
		confirm_password: "",
		terms: false,
		showPassword: false,
	});

	// -- Enviar Formulario
	const [state, formAction, isPending] = useActionState<ServiceType, FormData>(adapter, initialFormState);

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

	// -- Toast: Mensaje de Error y Éxito
	useEffect(() => {
		if (state.error && state.message) {
			setUserData(prev => ({
				...prev,
				document_type: "",
			}));

			toast.error(state.message);
		}

		if (!state.error && state.message) {
			// Limpiar Formulario
			setUserData({
				document_type: "",
				document_number: "",
				email: "",
				password: "",
				confirm_password: "",
				terms: false,
				showPassword: false,
			});

			// Mostrar Mensaje
			if (state.message === "Registro exitoso.") {
				toast.success(state.message);
			} else {
				toast.success(state.message, {
					duration: 2000,
					icon: <TriangleAlert className="size-5 shrink-0 text-orange-500" />,
					className:
						"z-50 flex items-center gap-2 bg-white text-gray-800 border transition-all duration-300 ease-in-out border-orange-300 shadow-md rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm xl:text-base font-medium select-none mx-2 lg:mx-4 mb-4",
				});
			}

			// Redirigir después de 3 segundos
			const timeout = setTimeout(() => {
				router.replace("/acceder");
			}, 3000);

			return () => clearTimeout(timeout);
		}

		return undefined;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.id]);

	return (
		<Form action={formAction} className="flex size-full flex-col gap-6 select-none">
			{/* Entrada de Datos */}
			<fieldset className="flex flex-col gap-4">
				{/* Tipo de Documento */}
				<Suspense
					fallback={
						<div className="flex w-full flex-col gap-1">
							<div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
							<div className="h-10 w-full animate-pulse rounded-lg bg-gray-200"></div>
						</div>
					}
				>
					<DocumentType value={userData.document_type} onChange={handleChange} />
				</Suspense>

				{/* Número de Documento */}
				<Suspense
					fallback={
						<div className="flex w-full flex-col gap-1">
							<div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
							<div className="h-10 w-full animate-pulse rounded-lg bg-gray-200"></div>
						</div>
					}
				>
					<DocumentNumber value={userData.document_number} onChange={handleChange} />
				</Suspense>

				{/* Correo Electrónico */}
				<div className="flex flex-col gap-1">
					<label
						className="text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out select-none md:text-sm lg:text-base"
						htmlFor="email"
					>
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
						minLength={6}
						maxLength={254}
						placeholder="tu@correo.com"
						disabled={isPending}
						title="Ingresa un correo válido, como ejemplo@dominio.com"
						className="focus:ring-primary-400 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs lowercase transition-all duration-300 ease-in-out placeholder:text-xs placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:outline-none md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base"
					/>
				</div>

				{/* Contraseña */}
				<div className="flex flex-col gap-1">
					<label
						className="text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out select-none md:text-sm lg:text-base"
						htmlFor="password"
					>
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
							placeholder="••••••••"
							disabled={isPending}
							title="Debe tener entre 10 y 38 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un símbolo."
							className="focus:ring-primary-400 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs transition-all duration-300 ease-in-out placeholder:text-xs placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:outline-none md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base"
						/>

						{/* Mostrar Contraseña */}
						<button
							type="button"
							onClick={toggleShowPassword}
							aria-label={userData.showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
							className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500 transition-colors duration-300 ease-in-out hover:text-gray-700 focus:outline-none"
							tabIndex={-1}
						>
							{userData.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>
				</div>

				{/* Confirmar Contraseña */}
				<div className="flex flex-col gap-1">
					<label
						className="text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out select-none md:text-sm lg:text-base"
						htmlFor="confirm_password"
					>
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
						placeholder="••••••••"
						disabled={isPending}
						title="Debe coincidir exactamente con la contraseña ingresada."
						className="focus:ring-primary-400 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs transition-all duration-300 ease-in-out placeholder:text-xs placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:outline-none md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base"
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
						className="text-tertiary-600 focus:ring-primary-400 size-4 rounded border-gray-300"
					/>

					{/* TODO: Agregar enlace de las TOS */}
					<label
						htmlFor="terms"
						className="text-xs text-gray-700 transition-all duration-300 ease-in-out select-none md:text-sm lg:text-base"
					>
						Acepto los{" "}
						<a
							href="/"
							target="_blank"
							rel="noopener"
							className="text-tertiary-600 hover:text-primary-400 inline-flex items-center gap-1 font-medium transition-colors duration-300 ease-in-out"
							tabIndex={-1}
						>
							Términos y condiciones
							<ExternalLink size={16} />
						</a>
					</label>
				</div>
			</fieldset>

			{/* Boton de Acción */}
			<button
				type="submit"
				disabled={isPending}
				className={cn(
					"bg-tertiary-600 hover:bg-primary-400 focus:ring-primary-400/50 h-10 w-full transform rounded-lg text-xs font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:outline-none md:text-sm lg:text-base",
					isPending ? "cursor-wait" : "cursor-pointer"
				)}
			>
				{isPending ? (
					<div className="flex items-center justify-center gap-2">
						<div className="animate-bounce-fade-in animate-iteration-count-infinite animate-delay-700 size-3 rounded-full bg-white"></div>
						<div className="animate-bounce-fade-in animate-iteration-count-infinite animate-delay-300 size-3 rounded-full bg-white"></div>
						<div className="animate-bounce-fade-in animate-iteration-count-infinite animate-delay-700 size-3 rounded-full bg-white"></div>
					</div>
				) : (
					<span className="select-none">Regístrate</span>
				)}
			</button>
		</Form>
	);
}
