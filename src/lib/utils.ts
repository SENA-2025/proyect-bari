import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases CSS de forma dinámica y elimina conflictos en clases de Tailwind.
 *
 * @param inputs - Lista de clases CSS que pueden incluir valores condicionales o dinámicos.
 * @returns Una cadena de texto con las clases combinadas y optimizadas.
 *
 * @example
 * cn("bg-red-500", isActive && "text-white", "p-4");
 * // Retorna: "bg-red-500 text-white p-4" (si isActive es true)
 *
 * @example
 * cn("p-2", "p-4");
 * // Retorna: "p-4" (Tailwind elimina conflictos y prioriza la última clase)
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
