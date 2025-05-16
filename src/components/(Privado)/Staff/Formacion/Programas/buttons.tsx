import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const Search = dynamic(() => import("@/components/(Privado)/Staff/Formacion/Programas/search"));
const Create = dynamic(() => import("@/components/(Privado)/Staff/Formacion/Programas/create"));

export default function ProgramasButtons() {
	return (
		<div className="flex w-full flex-col-reverse items-center justify-center gap-2 transition-all duration-300 ease-in-out lg:w-fit lg:flex-row">
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
