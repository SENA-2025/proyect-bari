import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { Suspense } from "react";

// Componentes
const Header = dynamic(() => import("@/components/UI/Navegacion/header"));
const Sidebar = dynamic(() => import("@/components/UI/Navegacion/sidebar"));
const Footer = dynamic(() => import("@/components/UI/Navegacion/footer"));
const AccessRefresher = dynamic(() => import("@/components/(Privado)/AccessRefresher"));

// Layout
export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies();

	return (
		<div className="size-full bg-gray-50">
			{/* Layout */}
			<div className="flex size-full flex-col">
				{/* Header */}
				<Suspense>
					<Header />
				</Suspense>

				{/* Contenido */}
				<div className="h-full grow overflow-hidden">
					<div className="flex size-full">
						{/* Sidebar */}
						<Suspense>
							<Sidebar />
						</Suspense>

						{/* Contenido Principal */}
						<div className="flex size-full flex-col justify-between">
							{/* Hijo */}
							<div className="m-4 size-full">
								{cookieStore.has("_sid") ? (
									children
								) : (
									<Suspense>
										<AccessRefresher />
									</Suspense>
								)}
							</div>

							{/* Footer */}
							<Suspense>
								<Footer />
							</Suspense>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
