"use client";

import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

// Componentes
const Menu = dynamic(() => import("@/components/UI/Navegacion/sidebar/desktop/menu"), { ssr: false });

export default function SidebarContent() {
	const [collapsed, setCollapsed] = useState(true);

	useEffect(() => {
		const stored = localStorage.getItem("sidebar-collapsed");
		if (stored !== null) {
			setCollapsed(stored === "true");
		}
	}, []);

	const toggleCollapsed = () => {
		const newValue = !collapsed;
		setCollapsed(newValue);
		localStorage.setItem("sidebar-collapsed", String(newValue));
	};

	return (
		<div className="relative z-10 h-full bg-white shadow-lg">
			{/* Menu */}
			<div className="flex size-full flex-col items-center justify-start gap-4 p-4">
				<Suspense fallback={null}>
					{/* TODO: Añadir un fallback */}
					<Menu collapse={collapsed} />
				</Suspense>
			</div>

			{/* Button */}
			<div className="absolute top-0 right-0 bottom-0 flex items-center justify-end">
				<button
					onClick={toggleCollapsed}
					className="group -mr-6 flex h-12 w-6 cursor-pointer items-center justify-center rounded-r-md bg-white shadow-md transition-all duration-300 ease-in-out"
				>
					<ChevronRight
						className={`text-secondary-600 transition-all duration-300 ease-in-out ${collapsed ? "group-hover:rotate-180" : "rotate-180 group-hover:rotate-0"}`}
						size={16}
					/>
				</button>
			</div>
		</div>
	);
}
