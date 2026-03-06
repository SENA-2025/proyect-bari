"use client";

import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Componentes
// const Form = dynamic(() => import("@/components/(Privado)/Staff/Coordinacion/Aprendices/create/form"), { ssr: false });

export default function CreateButton() {
	const [open, setOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	return (
		<>
			<button
				title="Crear Transversal"
				onClick={() => setOpen(true)}
				className="bg-tertiary-600 hover:bg-primary-400 group flex cursor-pointer items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:text-black/70"
			>
				<Plus className="shrink-0 transition-all duration-300 ease-in-out group-hover:rotate-90" size={16} />
				<span className="whitespace-nowrap transition-all duration-300 ease-in-out select-none">Crear Transversal</span>
			</button>

			{/* Modal */}
			{open && (
				<div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-500/20 backdrop-blur-sm">
					<div className="m-4 w-full transition-all duration-300 ease-in-out sm:w-1/2 md:w-96" ref={modalRef}>
						<div className="animate-fade-in-up relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 ease-in-out">
							<div className="bg-primary-400 h-1.5 w-full"></div>

							<div className="flex w-full flex-col items-center justify-center gap-4 p-4">
								{/* Titulo */}
								<div className="flex w-full items-center justify-start gap-2 transition-all duration-300 ease-in-out">
									<div className="bg-primary-400/10 rounded-full p-2.5">
										<Plus className="text-tertiary-600" size={20} />
									</div>

									<span className="text-lg font-semibold text-gray-900 transition-all duration-300 ease-in-out select-none lg:text-xl">
										Crear Transversal
									</span>
								</div>

								{/* Formulario */}
								{/* <Suspense fallback={null}>
									<Form onClose={() => setOpen(false)} />
								</Suspense> */}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
