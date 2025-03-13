import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const Crear_Dato = dynamic(() => import("./crear"));
const Leer_Dato = dynamic(() => import("./leer"));

export default function CRUD_Page() {
	return (
		<div className="size-full flex items-center justify-center">
			<div className="w-full m-4 rounded-lg shadow-md">
				<div className="m-8 flex flex-col gap-4">
					{/* Titulo y Boton Crear */}
					<div className="flex items-center justify-between">
						<h1 className="font-bold text-2xl">Datos</h1>
						<Crear_Dato />
					</div>

					{/* Tabla de Datos */}
					<div className="w-full">
						<Suspense>
							<Leer_Dato />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	);
}
