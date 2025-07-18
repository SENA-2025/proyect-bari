import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes

const Search = dynamic(() => import("@/components/(Privado)/Staff/Registros/Administracion/search"));

export default function AdminButtons() {
	return (
		<div className="flex w-full flex-col-reverse items-center justify-center gap-2 transition-all duration-300 ease-in-out lg:w-fit lg:flex-row">
			{/* Busqueda */}
			<Suspense fallback={null}>
				<Search />
			</Suspense>
		</div>
	);
}
