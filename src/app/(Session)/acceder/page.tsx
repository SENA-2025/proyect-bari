import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Metadata
export const metadata: Metadata = {
	title: "Acceder",
};

// Componentes
const Form = dynamic(() => import("@/components/(Session)/acceder/form"));

// Página
export default function Login_Page() {
	return (
		<div className="bg-white size-full">
			{/* Formulario */}
			<div className="flex items-center justify-center size-full">
				<div className="w-full m-4 flex justify-center">
					<div className="w-full md:w-md backdrop-blur-sm shadow-lg p-8 rounded-xl bg-white/90">
						<div className="flex flex-col items-center gap-8">
							{/* Logo & Título */}
							<div className="flex flex-col items-center gap-6">
								<Image className="shadow-xs rounded-full select-none" src="/logo.webp" alt="Logo del SENA" width={100} height={100} priority />
								<h1 className="font-bold text-gray-800 text-xl md:text-2xl lg:text-3xl xl:text-4xl select-none">Iniciar Sesión</h1>
							</div>

							{/* Formulario */}
							<Form />

							{/* Registro */}
							<p className="text-xs lg:text-sm text-secondary-600 select-none">
								¿No tienes una cuenta?{" "}
								<Link href="/registrarse" className="text-tertiary-600 hover:text-primary-400 font-medium ease-in-out duration-300 transition-colors">
									Regístrate aquí
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
