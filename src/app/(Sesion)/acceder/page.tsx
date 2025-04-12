import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// Metadata
export const metadata: Metadata = {
	title: "Acceder",
};

// Componentes
const Form = dynamic(() => import("@/components/(Sesion)/acceder/form"));

// Página
export default function Login_Page() {
	return (
		<div className="size-full bg-gray-50 backdrop-blur-sm">
			{/* Formulario */}
			<div className="flex size-full items-center justify-center">
				{/* Contenedor  */}
				<div className="m-4 flex w-full justify-center">
					{/* Tarjeta */}
					<div className="w-full rounded-xl bg-white/90 p-8 shadow-lg backdrop-blur-sm transition-shadow duration-300 ease-in-out hover:shadow-xl md:w-md">
						{/* Contenido */}
						<div className="flex flex-col items-center gap-8">
							{/* Logo & Título */}
							<div className="flex flex-col items-center gap-6">
								<Image
									className="rounded-full select-none"
									src="/logo.webp"
									alt={"Logo del " + process.env.APP_WEB_TITLE}
									width={100}
									height={100}
									priority
								/>
								<h1 className="text-xl font-bold text-gray-800 select-none md:text-2xl lg:text-3xl xl:text-4xl">Iniciar Sesión</h1>
							</div>

							{/* Formulario */}
							<Suspense
								fallback={
									<div className="flex size-full flex-col gap-6">
										<div className="flex size-full flex-col gap-4">
											{Array(3)
												.fill(0)
												.map((_, index) => (
													<div className="flex w-full flex-col gap-1" key={index}>
														<div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
														<div className="h-10 w-full animate-pulse rounded-lg bg-gray-200"></div>
													</div>
												))}
										</div>

										<div className="h-10 w-full animate-pulse rounded-lg bg-gray-300"></div>
									</div>
								}
							>
								<Form />
							</Suspense>

							{/* Registro */}
							<div className="flex w-full flex-col items-center gap-4">
								<div className="flex w-full items-center gap-2">
									<hr className="w-full border-t border-gray-200" />
									<span className="text-xs text-gray-500 select-none lg:text-sm">O</span>
									<hr className="w-full border-t border-gray-200" />
								</div>

								<p className="text-secondary-600 text-xs select-none lg:text-sm">
									¿No tienes una cuenta?{" "}
									<Link
										href="/registrarse"
										className="text-tertiary-600 hover:text-primary-400 font-medium transition-colors duration-300 ease-in-out"
									>
										Regístrate
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
