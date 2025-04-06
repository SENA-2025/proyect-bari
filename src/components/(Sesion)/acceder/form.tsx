"use client";

import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import dynamic from "next/dynamic";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Componentes
const DocumentType = dynamic(() => import("@/components/UI/Formularios/(Sesion)/document-type"));
const DocumentNumber = dynamic(() => import("@/components/UI/Formularios/(Sesion)/document-number"));

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
	const router = useRouter();
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

	// -- Toast: Mensaje de Error y Éxito
	useEffect(() => {
		if (state.error && state.message) {
			toast.error(state.message);
		}

		if (!state.error && state.message) {
			// Limpiar Formulario
			setUserData({
				document_type: "CC",
				document_number: "",
				password: "",
				showPassword: false,
			});

			// Mostrar Mensaje
			if (state.message === "OK") {
				router.refresh();
			} else {
				toast.success(state.message, {
					duration: 2000,
					icon: <TriangleAlert className="size-5 shrink-0 text-orange-500" />,
					className:
						"z-50 flex items-center gap-2 bg-white text-gray-800 border border-orange-300 shadow-md rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm xl:text-base font-medium select-none mx-2 lg:mx-4 mb-4",
				});

				// Redirigir después de 3 segundos
				const timeout = setTimeout(() => {
					router.push("/restablecer-clave");
				}, 3000);

				return () => clearTimeout(timeout);
			}
		}

		return undefined;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.id]);

	return (
		<Form action={formAction} className="flex size-full flex-col gap-6">
			{/* Entrada de Datos */}
			<fieldset className="flex flex-col gap-4">
				{/* Tipo de Documento */}
				<DocumentType value={userData.document_type} onChange={handleChange} />

				{/* Numero de Documento */}
				<DocumentNumber value={userData.document_number} onChange={handleChange} />

				{/* Contraseña */}
				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between">
						<label className="text-xs font-medium text-gray-700 select-none md:text-sm lg:text-base" htmlFor="password">
							Contraseña
						</label>

						<Link
							href="/restablecer-clave"
							prefetch={false}
							className="text-tertiary-600 hover:text-primary-400 text-xs transition-colors duration-300 ease-in-out select-none lg:text-sm"
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
