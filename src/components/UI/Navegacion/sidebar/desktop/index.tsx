"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Componentes
const Content = dynamic(() => import("@/components/UI/Navegacion/sidebar/desktop/content"), { ssr: false });

export default function SidebarDesktop() {
	const [windowWidth, setWindowWidth] = useState(0);
	const [mounted, setMounted] = useState(false);
	const [debouncedWidth] = useDebounce(windowWidth, 200);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth);
			setMounted(true);

			const handleResize = () => setWindowWidth(window.innerWidth);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}

		return undefined;
	}, []);

	if (!mounted || debouncedWidth < 1024) return null;

	return (
		<aside className="hidden lg:block">
			<Suspense fallback={null}>
				<Content />
			</Suspense>
		</aside>
	);
}
