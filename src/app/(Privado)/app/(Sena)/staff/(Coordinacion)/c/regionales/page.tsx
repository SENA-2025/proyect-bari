import { Globe } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const Buttons = dynamic(() => import("@/components/(Privado)/Staff/Coordinacion/Regionales/buttons"));

// Metadata
export const metadata: Metadata = {
	title: "Regionales",
};

// Pagina
export default function RegionalesPage() {
	return (
		<div className="size-full p-5">
			{/* Cabecera */}
			<div className="flex w-full flex-col items-start justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 ease-in-out lg:flex-row lg:items-center lg:p-6">
				{/* Título */}
				<div className="flex w-full flex-col items-center gap-2 transition-all duration-300 ease-in-out lg:flex-row lg:justify-start">
					{/* Icono */}
					<div className="from-primary-400 to-tertiary-600 rounded-lg bg-gradient-to-r p-2">
						<Globe className="size-5 text-white transition-all duration-300 ease-in-out lg:size-6" />
					</div>

					{/* Título */}
					<div className="flex flex-col items-center justify-center transition-all duration-300 ease-in-out select-none lg:items-start">
						<h1 className="text-xl font-bold text-gray-900 transition-all duration-300 ease-in-out lg:text-2xl">Regionales</h1>
						<p className="text-sm text-gray-500">Gestiona las regionales del SENA</p>
					</div>
				</div>

				{/* Botones */}
				<Suspense fallback={null}>
					<Buttons />
				</Suspense>
			</div>

			{/* Contenido */}
		</div>
	);
}
