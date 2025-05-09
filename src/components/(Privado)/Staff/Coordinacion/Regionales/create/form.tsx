"use client";

import Form from "next/form";

type FormProps = {
	onClose: () => void;
};

export default function CreateForm({ onClose }: FormProps) {
	return (
		<Form action={""} className="animate-fade-in flex w-full flex-col items-center justify-center gap-4">
			<fieldset className="flex w-full flex-col gap-2">
				{/* Nombre */}
				<div className="flex flex-col gap-1">
					<label
						className="text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out select-none lg:text-base"
						htmlFor="regional_name"
					>
						Nombre de la Regional
					</label>

					<input
						id="regional_name"
						name="name"
						type="text"
						placeholder="Ej: Norte de Santander"
						maxLength={50}
						required
						autoComplete="off"
						className="focus:ring-primary-400/50 focus:border-primary-400 appearance-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 uppercase transition-all duration-300 ease-in-out outline-none placeholder:select-none focus:ring-2 lg:text-base"
					/>
				</div>

				{/* Abreviatura */}
				<div className="flex flex-col gap-1">
					<label
						className="text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out select-none lg:text-base"
						htmlFor="regional_abbr"
					>
						Abreviatura
					</label>

					<input
						id="regional_abbr"
						name="abbreviation"
						type="text"
						placeholder="Ej: NS"
						maxLength={6}
						required
						autoComplete="off"
						className="focus:ring-primary-400/50 focus:border-primary-400 appearance-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 uppercase transition-all duration-300 ease-in-out outline-none placeholder:select-none focus:ring-2 lg:text-base"
					/>
				</div>
			</fieldset>

			<div className="flex w-full items-center justify-end gap-2">
				{/* Cerrar */}
				<button
					type="button"
					onClick={onClose}
					className="cursor-pointer rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-200 lg:text-base"
				>
					<span className="select-none">Cancelar</span>
				</button>

				{/* Guardar */}
				<button
					type="submit"
					className="bg-primary-400 hover:bg-tertiary-600 cursor-pointer rounded-xl px-4 py-2 text-sm transition-all duration-300 ease-in-out hover:text-white lg:text-base"
				>
					<span className="select-none">Crear</span>
				</button>
			</div>
		</Form>
	);
}
