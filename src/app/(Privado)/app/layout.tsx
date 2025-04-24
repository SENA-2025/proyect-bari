import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { Suspense } from "react";

// Componentes
const Header = dynamic(() => import("@/components/UI/Navegacion/header"));
const Sidebar = dynamic(() => import("@/components/UI/Navegacion/sidebar/desktop"));
const Footer = dynamic(() => import("@/components/UI/Navegacion/footer"));
const AccessRefresher = dynamic(() => import("@/components/(Privado)/AccessRefresher"));

// Layout
export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies();

	return (
		<div className="size-full max-h-screen max-w-screen bg-gray-50">
			{/* Layout */}
			<div className="flex size-full flex-col">
				{/* Header */}
				<Suspense fallback={null}>
					<Header />
				</Suspense>

				{/* Contenido */}
				<div className="h-full grow overflow-hidden">
					<div className="flex size-full">
						{/* Sidebar */}
						<Suspense fallback={null}>
							<Sidebar />
						</Suspense>

						{/* Contenido Principal */}
						<div className="flex size-full flex-col justify-between">
							{/* Hijo */}
							<div className="size-full p-5">
								<div className="size-full">
									{cookieStore.has("_sid") ? (
										children
									) : (
										<div className="flex size-full items-center justify-center">
											<div className="flex w-full flex-col items-center justify-center gap-4">
												<div className="border-t-primary-400 text-primary-400 flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent text-4xl">
													<div className="border-t-secondary-600 text-secondary-600 flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent text-2xl"></div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Footer */}
							<Suspense fallback={null}>
								<Footer />
							</Suspense>
						</div>
					</div>
				</div>
			</div>

			{/* Regenerar: Access Token */}
			<Suspense fallback={null}>
				<AccessRefresher accessToken={cookieStore.get("_sid")?.value || ""} />
			</Suspense>
		</div>
	);
}
