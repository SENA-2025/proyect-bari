"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Componentes
const Content = dynamic(() => import("@/components/UI/Navegacion/sidebar/desktop/content"), { ssr: false });

export default function SidebarDesktop() {
	const [windowWidth, setWindowWidth] = useState(0);
	const [debouncedWidth] = useDebounce(windowWidth, 200);

	useEffect(() => {
		// Obtener el ancho de la ventana
		setWindowWidth(window.innerWidth);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (windowWidth === 0) return null;
	if (debouncedWidth < 1024) return null;

	return (
		<Suspense
			fallback={
				<div className="z-10 flex h-full w-16 flex-col gap-2 bg-white px-2 py-4 shadow-lg">
					{Array(3)
						.fill(0)
						.map((_, index) => (
							<div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" key={index}></div>
						))}
				</div>
			}
		>
			<Content />
		</Suspense>
	);
}
