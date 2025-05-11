type DocumentNumberProps = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function DocumentNumber_Input({ value, onChange }: DocumentNumberProps) {
	return (
		<div className="flex flex-col gap-1">
			<label
				className="text-xs font-medium text-gray-700 transition-all duration-300 ease-in-out select-none md:text-sm lg:text-base"
				htmlFor="document_number"
			>
				Número de Documento
			</label>

			<input
				id="document_number"
				name="document_number"
				type="text"
				inputMode="numeric"
				value={value}
				onChange={onChange}
				required
				minLength={3}
				maxLength={20}
				pattern="^[0-9]+$"
				placeholder="123456"
				title="Solo números. Debe tener entre 3 y 20 dígitos."
				className="focus:ring-primary-400 w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs transition-all duration-300 ease-in-out placeholder:text-xs placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:outline-none md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base"
			/>
		</div>
	);
}
