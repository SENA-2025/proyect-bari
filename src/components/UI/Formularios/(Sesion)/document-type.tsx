import { ChevronDown } from "lucide-react";

interface DocumentTypeProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DocumentType_Select({ value, onChange }: DocumentTypeProps) {
	return (
		<div className="group flex flex-col gap-1">
			<label
				className="text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out select-none md:text-sm lg:text-base"
				htmlFor="document_type"
			>
				Tipo de Documento
			</label>

			<div className="relative">
				<select
					id="document_type"
					name="document_type"
					value={value}
					onChange={onChange}
					required
					className="focus:ring-primary-400 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs transition-all duration-300 ease-in-out select-none focus:border-transparent focus:ring-2 focus:outline-none md:text-sm lg:text-base"
				>
					<option value="" disabled hidden>
						Selecciona un tipo
					</option>
					<option value="CC">Cédula de Ciudadanía</option>
					<option value="TI">Tarjeta de Identidad</option>
					<option value="CE">Cédula de Extranjería</option>
					<option value="PEP">Permiso Especial de Permanencia</option>
					<option value="PPT">Permiso de Protección Temporal</option>
				</select>

				{/* Icono de Flecha */}
				<ChevronDown
					className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 transition-all duration-300 ease-in-out group-focus-within:rotate-180 group-hover:rotate-90"
					size={20}
				/>
			</div>
		</div>
	);
}
