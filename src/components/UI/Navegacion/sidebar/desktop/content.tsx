"use client";

import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

// Utilidades
import { cn } from "@/lib/utils";

// Componentes
const Menu = dynamic(() => import("@/components/UI/Navegacion/sidebar/desktop/menu"), { ssr: false });

export default function SidebarContent() {
	const [collapsed, setCollapsed] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const stored = localStorage.getItem("sidebar-collapsed");

		if (stored !== null) {
			setCollapsed(stored === "true");
		} else {
			setCollapsed(true);
		}
	}, []);

	const toggleCollapsed = () => {
		const newValue = !collapsed;
		setCollapsed(newValue);
		localStorage.setItem("sidebar-collapsed", String(newValue));
	};

	return (
		<div
			className={cn(
				"animate-fade-in-right z-10 h-full bg-white shadow-lg transition-all duration-300 ease-in-out",
				collapsed === undefined ? "w-0" : collapsed ? "w-18" : "w-64"
			)}
		>
			<div className="relative size-full">
				{/* Menu */}
				<div className="scroll-container-hidden h-full">
					<div className="py-4 pl-2">
						<Suspense fallback={null}>
							<Menu collapse={collapsed} />
						</Suspense>
					</div>
				</div>

				{/* Button */}
				<div className="absolute top-0 right-0 bottom-0 flex items-center justify-end">
					<button
						onClick={toggleCollapsed}
						className="group -mr-6 flex h-12 w-6 cursor-pointer items-center justify-center rounded-r-md bg-white shadow-md transition-all duration-300 ease-in-out"
					>
						<ChevronRight
							className={cn(
								"text-secondary-600 transition-all duration-300 ease-in-out",
								collapsed ? "group-hover:rotate-180" : "rotate-180 group-hover:rotate-0"
							)}
							size={16}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
