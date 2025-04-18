import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const Desktop = dynamic(() => import("@/components/UI/Navegacion/sidebar/desktop"));

export default function Sidebar() {
	return (
		<aside className="hidden h-full lg:block">
			<Suspense fallback={null}>
				<Desktop />
			</Suspense>
		</aside>
	);
}
