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
				"z-10 h-full bg-white shadow-lg transition-all duration-300 ease-in-out",
				collapsed === undefined ? "w-0" : collapsed ? "w-16" : "w-64"
			)}
		>
			<div className="relative size-full">
				{/* Menu */}
				<div className="size-full p-4">
					<Suspense
						fallback={
							<div className="flex size-full flex-col gap-3">
								{Array(5)
									.fill(0)
									.map((_, i) => (
										<div className="flex w-full flex-col gap-2" key={i}>
											<div className="h-8 w-full animate-pulse rounded-lg bg-gray-200"></div>

											<div className="flex flex-col gap-1">
												{Array(3)
													.fill(0)
													.map((_, j) => (
														<div className="h-8 w-full animate-pulse rounded-lg bg-gray-100" key={j}></div>
													))}
											</div>
										</div>
									))}
							</div>
						}
					>
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
