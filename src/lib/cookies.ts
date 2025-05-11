"use server";

import { cookies } from "next/headers";

/**
 * Establece una cookie de acceso (_sid) con un token y una duración específica.
 *
 * @param token - El token que se almacenará en la cookie.
 * @param expiration - La fecha de expiración del token en formato UNIX (segundos desde 1970).
 */
export async function setAccessCookie(token: string, expiration: number) {
	const now = Math.floor(Date.now() / 1000); // Obtiene el tiempo actual en segundos.
	const duration = Math.max(0, expiration - now); // Calcula la duración restante del token.

	// Configura y establece la cookie de acceso.
	(await cookies()).set({
		name: "_sid", // Nombre de la cookie.
		value: token, // Valor del token.
		httpOnly: true, // Solo accesible desde el servidor (no accesible desde JavaScript en el cliente).
		sameSite: "strict", // Restringe el envío de la cookie solo en solicitudes del mismo sitio.
		secure: process.env.NODE_ENV === "production", // Solo se envía en conexiones HTTPS si está en producción.
		path: "/", // Disponible en toda la aplicación.
		maxAge: duration, // Tiempo de vida de la cookie en segundos.
		priority: "high", // Prioridad alta para navegadores compatibles.
	});
}

/**
 * Establece una cookie de refresco (__srfk) con un token y una duración específica.
 *
 * @param token - El token que se almacenará en la cookie.
 * @param expiration - La fecha de expiración del token en formato UNIX (segundos desde 1970).
 */
export async function setRefreshCookie(token: string, expiration: number) {
	const now = Math.floor(Date.now() / 1000); // Obtiene el tiempo actual en segundos.
	const duration = Math.max(0, expiration - now); // Calcula la duración restante del token.

	// Configura y establece la cookie de refresco.
	(await cookies()).set({
		name: "__srfk", // Nombre de la cookie.
		value: token, // Valor del token.
		httpOnly: true, // Solo accesible desde el servidor (no accesible desde JavaScript en el cliente).
		sameSite: "strict", // Restringe el envío de la cookie solo en solicitudes del mismo sitio.
		secure: process.env.NODE_ENV === "production", // Solo se envía en conexiones HTTPS si está en producción.
		path: "/", // Disponible en toda la aplicación.
		maxAge: duration, // Tiempo de vida de la cookie en segundos.
		priority: "high", // Prioridad alta para navegadores compatibles.
	});
}
