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

	if (!cookieStore.has("_sid")) {
		return <AccessRefresher />;
	}

	return (
		<div className="size-full bg-gray-50 transition-all duration-300 ease-in-out">
			{/* Layout */}
			<div className="flex size-full flex-col">
				{/* Header */}
				<Header />

				{/* Contenido */}
				<div className="h-full grow overflow-hidden">
					<div className="flex size-full">
						{/* Sidebar */}
						<Sidebar />

						{/* Contenido Principal */}
						<div className="flex size-full flex-col justify-between">
							{/* Hijo */}
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
