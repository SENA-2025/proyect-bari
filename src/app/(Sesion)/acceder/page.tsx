import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Metadata
export const metadata: Metadata = {
	title: "Acceder",
};

// Componentes
const Form = dynamic(() => import("@/components/(Sesion)/acceder/form"));

// Página
export default function Login_Page() {
	return (
		<div className="size-full bg-white/95 backdrop-blur-sm">
			{/* Formulario */}
			<div className="flex size-full items-center justify-center">
				{/* Contenedor  */}
				<div className="m-4 flex w-full justify-center">
					{/* Tarjeta */}
					<div className="w-full rounded-xl bg-white/90 p-8 shadow-lg backdrop-blur-sm md:w-md">
						{/* Contenido */}
						<div className="flex flex-col items-center gap-8">
							{/* Logo & Título */}
							<div className="flex flex-col items-center gap-6">
								<Image
									className="rounded-full shadow-xs select-none"
									src="/logo.webp"
									alt={"Logo del " + process.env.APP_WEB_TITLE}
									width={100}
									height={100}
									priority
								/>
								<h1 className="text-xl font-bold text-gray-800 select-none md:text-2xl lg:text-3xl xl:text-4xl">Iniciar Sesión</h1>
							</div>

							{/* Formulario */}
							<Form />

							{/* Registro */}
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
	);
}
