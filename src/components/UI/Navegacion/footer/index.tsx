import { Tag } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const CurrentDate = dynamic(() => import("@/components/UI/Navegacion/footer/date"));

export default function Footer() {
	const initialDate = new Date().toISOString();

	return (
		<footer className="animate-fade-in-up animate-duration-500 w-full shrink-0 border-t border-t-gray-200 bg-white py-3 shadow-sm">
			<div className="mx-4">
				<div className="flex items-center justify-between select-none">
					{/* Version */}
					<div className="flex items-center gap-1 rounded bg-gray-100 px-3 py-1">
						<Tag className="text-tertiary-600" size={14} />
						<span className="text-tertiary-600 text-xs font-medium transition-all duration-300 ease-in-out lg:text-sm">
							v{process.env.APP_VERSION}
						</span>
					</div>

					{/* Tiempo */}
					<Suspense fallback={null}>
						<CurrentDate initialDate={initialDate} />
					</Suspense>
				</div>
			</div>
		</footer>
	);
}
