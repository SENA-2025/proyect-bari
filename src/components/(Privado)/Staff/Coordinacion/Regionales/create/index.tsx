"use client";

import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";

// Componentes
const Form = dynamic(() => import("@/components/(Privado)/Staff/Coordinacion/Regionales/create/form"), { ssr: false });

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
				title="Crear Regional"
				onClick={() => setOpen(true)}
				className="bg-tertiary-600 hover:bg-primary-400 group flex cursor-pointer items-center justify-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:text-black/70"
			>
				<Plus className="shrink-0 transition-all duration-300 ease-in-out group-hover:rotate-90" size={16} />
				<span className="whitespace-nowrap transition-all duration-300 ease-in-out select-none">Crear Regional</span>
			</button>

			{/* Modal */}
			{open && (
				<div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-500/20 backdrop-blur-sm transition-all duration-300 ease-in-out">
					<div className="m-4" ref={modalRef}>
						<Suspense fallback={null}>
							<Form />
						</Suspense>
					</div>
				</div>
			)}
		</>
	);
}
