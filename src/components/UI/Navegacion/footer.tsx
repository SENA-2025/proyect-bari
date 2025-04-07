import { Tag } from "lucide-react";
import dynamic from "next/dynamic";

// Componentes
const CurrentDate = dynamic(() => import("@/components/UI/Navegacion/footer/date"));

export default function Footer() {
	const initialDate = new Date().toISOString();

	return (
		<footer className="w-full border-t border-gray-200 bg-white py-3 shadow-sm">
			<div className="mx-4">
				<div className="flex items-center justify-between select-none">
					{/* Version */}
					<div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1">
						<Tag className="text-tertiary-600" size={14} />
						<span className="text-tertiary-600 text-xs font-medium lg:text-sm">v{process.env.APP_VERSION}</span>
					</div>

					{/* Tiempo */}
					<CurrentDate initialDate={initialDate} />
				</div>
			</div>
		</footer>
	);
}
