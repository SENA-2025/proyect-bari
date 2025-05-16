import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const Search = dynamic(() => import("@/components/(Privado)/Staff/Coordinacion/Aprendices/search"));
const Create = dynamic(() => import("@/components/(Privado)/Staff/Coordinacion/Aprendices/create"));

export default function AprendicesButtons() {
	return (
		<div className="animate-fade-in flex w-full flex-col-reverse items-center justify-center gap-2 transition-all duration-300 ease-in-out lg:w-fit lg:flex-row">
			{/* Busqueda */}
			<Suspense fallback={null}>
				<Search />
			</Suspense>

			{/* Otras acciones */}
			<div className="flex items-center justify-center gap-2 transition-all duration-300 ease-in-out">
				{/* Crear */}
				<Suspense fallback={null}>
					<Create />
				</Suspense>
			</div>
		</div>
	);
}
