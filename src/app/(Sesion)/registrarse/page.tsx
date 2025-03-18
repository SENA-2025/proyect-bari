import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Metadata
export const metadata: Metadata = {
	title: "Registrarse",
};

// Componentes

export default function Register_Page() {
	return (
		<div className="bg-white size-full">
			{/* Formulario */}
			<div className="flex items-center justify-center size-full">
				{/* Contenedor  */}
				<div className="w-full m-4 flex justify-center">
					{/* Tarjeta */}
					<div className="w-full md:w-md backdrop-blur-sm shadow-lg p-8 rounded-xl bg-white/90">
						{/* Contenido */}
						<div className="flex flex-col items-center gap-8">
							{/* Logo & Título */}
							<div className="flex flex-col items-center gap-6">
								<Image
									className="shadow-xs rounded-full select-none"
									src="/logo.webp"
									alt={"Logo del " + process.env.APP_WEB_TITLE}
									width={100}
									height={100}
									priority
								/>
								<h1 className="font-bold text-gray-800 text-xl md:text-2xl lg:text-3xl xl:text-4xl select-none">
									Registro
								</h1>
							</div>

							{/* Formulario */}

							{/* Inicio de sesión */}
							<p className="text-xs lg:text-sm text-secondary-600 select-none">
								¿Ya tienes una cuenta?{" "}
								<Link
									href="/acceder"
									className="text-tertiary-600 hover:text-primary-400 font-medium ease-in-out duration-300 transition-colors"
								>
									Inicia sesión
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
