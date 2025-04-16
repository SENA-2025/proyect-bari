import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const Desktop = dynamic(() => import("@/components/UI/Navegacion/sidebar/desktop"));

export default function Sidebar() {
	return (
		<aside className="hidden h-full lg:block">
			<Suspense
				fallback={
					<div className="z-10 flex h-full w-16 flex-col gap-2 bg-white px-2 py-4 shadow-lg">
						{Array(3)
							.fill(0)
							.map((_, index) => (
								<div className="h-12 w-full animate-pulse rounded-lg bg-gray-100" key={index}></div>
							))}
					</div>
				}
			>
				<Desktop />
			</Suspense>
		</aside>
	);
}
