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
		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth);

			const handleResize = () => setWindowWidth(window.innerWidth);

			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}

		return undefined;
	}, []);

	if (windowWidth === 0) return null;

	return (
		<aside className={`h-full transition-all duration-300 ease-in-out ${debouncedWidth < 1024 ? "w-0" : "z-10 w-16 bg-white shadow-lg"}`}>
			{debouncedWidth >= 1024 && (
				<Suspense fallback={null}>
					<Content />
				</Suspense>
			)}
		</aside>
	);
}
