import { User } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

//Componentes
const Buttons = dynamic(() => import("@/components/(Privado)/Staff/Gestion/Usuarios/buttons"));

// Metadata
export const metadata: Metadata = {
	title: "Usuarios",
};

// Pagina
export default function UsuariosPage() {
	return (
		<div className="size-full p-5">
			{/* Cabecera */}
			<div className="w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out lg:p-6">
				<div className="flex flex-col items-center justify-between gap-4 transition-all duration-300 ease-in-out lg:flex-row">
					{/* Título */}
					<div className="flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-in-out lg:flex-row">
						{/* Icono */}
						<div className="from-primary-400 to-tertiary-600 rounded-lg bg-gradient-to-r p-2">
							<User className="size-5 text-white transition-all duration-300 ease-in-out lg:size-6" />
						</div>

						{/* Título */}
						<div className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out select-none lg:items-start">
							<h1 className="text-xl font-bold text-gray-900 transition-all duration-300 ease-in-out lg:text-2xl">Usuarios</h1>
							<p className="text-sm text-gray-500">Gestiona la información de los usuarios del SENA</p>
						</div>
					</div>

					{/* Botones */}
					<Suspense
						fallback={
							<div className="w-full lg:w-1/4">
								<div className="h-8 w-full animate-pulse rounded-lg bg-gray-200"></div>
							</div>
						}
					>
						<Buttons />
					</Suspense>
				</div>
			</div>

			{/* Contenido */}
		</div>
	);
}
