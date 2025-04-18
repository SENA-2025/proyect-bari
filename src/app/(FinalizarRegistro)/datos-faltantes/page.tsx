import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Metadata
export const metadata: Metadata = {
	title: "Datos Faltantes",
};

// Componentes
const VerifyData = dynamic(() => import("@/components/(FinalizarRegistro)/datos-faltantes/verify"));

export default function DataMissing_Page() {
	return (
		<div className="size-full bg-gray-50 backdrop-blur-sm">
			{/* Formulario */}
			<div className="flex size-full items-center justify-center">
				{/* Contenedor  */}
				<div className="m-4 flex w-full justify-center">
					<Suspense
						fallback={
							<div className="border-t-primary-400 text-primary-400 flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent text-4xl">
								<div className="border-t-secondary-600 text-secondary-600 flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent text-2xl"></div>
							</div>
						}
					>
						<VerifyData />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
