"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchButton() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	// Estados
	const [query, setQuery] = useState(() => searchParams.get("s")?.toString().trim().slice(0, 60) || "");
	const [debouncedQuery] = useDebounce(query, 300);

	// Efecto para actualizar la URL
	const updateSearch = useCallback(
		(value: string) => {
			const sanitized = value.replace(/\s+/g, " ").trim().slice(0, 60);
			const currentValue = searchParams.get("s")?.toString().trim() || "";

			// Si el valor actual es igual al nuevo valor, no hacer nada
			if (sanitized === currentValue) return;

			const params = new URLSearchParams(searchParams);

			if (sanitized) {
				params.set("s", sanitized);
			} else {
				params.delete("s");
			}

			replace(`${pathname}?${params.toString()}`);
		},
		[searchParams, pathname, replace]
	);

	// Efecto para actualizar la búsqueda
	useEffect(() => {
		updateSearch(debouncedQuery);
	}, [debouncedQuery, updateSearch]);

	// Manejador de cambio
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div className="group relative flex w-full items-center">
			<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<Search className="group-focus-within:text-primary-400 text-gray-400 transition-all duration-300 ease-in-out" size={20} />
			</div>

			<input
				type="search"
				placeholder="Buscar nombre o abreviatura..."
				maxLength={60}
				autoComplete="off"
				spellCheck="false"
				value={query}
				onChange={handleChange}
				className="focus:ring-primary-400 block w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-9 text-sm leading-5 placeholder-gray-500 transition-all duration-300 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none"
			/>
		</div>
	);
}
