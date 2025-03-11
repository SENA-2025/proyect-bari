import Form from "next/form";

export default function Login_Form() {
	return (
		<Form action={""} className="flex items-center justify-center h-full">
			<div className="backdrop-blur-sm shadow-lg p-4 rounded-xl bg-white/90">
				<div>
					<div></div>
					<div>
						<h1>Iniciar Sesión</h1>
					</div>
				</div>

				<div>
					{/* Tipo de Documento */}
					<div>
						<input type="text" />
					</div>

					{/* Numero de Documento */}
					<div>
						<input type="text" />
					</div>

					{/* Contraseña */}
					<div>
						<input type="password" />
					</div>
				</div>
			</div>
		</Form>
	);
}
