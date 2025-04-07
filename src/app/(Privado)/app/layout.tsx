import dynamic from "next/dynamic";
import { cookies } from "next/headers";

// Componentes
const Header = dynamic(() => import("@/components/UI/Navegacion/header"));
const Sidebar = dynamic(() => import("@/components/UI/Navegacion/sidebar"));
const Footer = dynamic(() => import("@/components/UI/Navegacion/footer"));
const AccessRefresher = dynamic(() => import("@/components/(Privado)/AccessRefresher"));

// Layout
export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies();

	return (
		<div className="size-full">
			{/* Regenerate: Access Token */}
			{!cookieStore.has("_sid") && <AccessRefresher />}

			{/* Layout */}
			<div className="flex size-full flex-col bg-gray-50">
				{/* Header */}
				<Header />

				{/* Contenido */}
				<div className="h-full grow overflow-hidden">
					<div className="flex size-full">
						{/* Sidebar */}
						<Sidebar />

						{/* Contenido Principal */}
						<div className="flex size-full flex-col justify-between">
							{/* Contenido */}
							<div className="m-4 size-full">{children}</div>

							{/* Footer */}
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
