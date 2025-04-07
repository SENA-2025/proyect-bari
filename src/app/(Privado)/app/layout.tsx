import dynamic from "next/dynamic";
import { cookies } from "next/headers";

// Componentes
const Header = dynamic(() => import("@/components/UI/Navegacion/header"));
const AccessRefresher = dynamic(() => import("@/components/(Privado)/AccessRefresher"));

// Layout
export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies();

	return (
		<div className="size-full">
			{/* Regenerate: Access Token */}
			{!cookieStore.has("_sid") && <AccessRefresher />}

			{/* Layout */}
			<div className="flex size-full flex-col bg-white/95 backdrop-blur-sm">
				{/* Header */}
				<Header />

				{/* Contenido */}
				<div className="h-full grow overflow-hidden">
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
}
