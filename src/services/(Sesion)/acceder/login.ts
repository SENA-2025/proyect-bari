"use server";

import net from "node:net";

import { headers } from "next/headers";
import { request } from "undici";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";

import { setAccessCookie, setRefreshCookie } from "@/lib/cookies";
import loginSchema from "@/schemas/(Sesion)/acceder/login.schema";

// Tipos
export type ServiceType = {
	id?: string;
	error: boolean;
	message?: string;
};

// Validación de Datos
export async function ServiceLogin(formData: FormData): Promise<ServiceType> {
	// TODO: Agregar un rate limit para evitar ataques de fuerza bruta
	// TODO: Agregar un captcha para evitar ataques de fuerza bruta

	try {
		// Validar Datos
		const data = loginSchema.parse(Object.fromEntries(formData.entries()));

		// Obtener Headers
		const requestHeaders = await headers();
		const userAgent = requestHeaders.get("user-agent");
		const userIp = requestHeaders.get("cf-connecting-ip") || requestHeaders.get("x-forwarded-for") || requestHeaders.get("x-real-ip");

		// Validar IP
		if (!userIp || !net.isIP(userIp)) {
			return { id: uuidv4(), error: true, message: "Error interno. Prueba con otro navegador." };
		}

		// Validar User-Agent
		if (!userAgent) {
			return { id: uuidv4(), error: true, message: "Error interno. Prueba con otro navegador." };
		}

		// Validar User-Agent
		if (!userAgent) {
			return { id: uuidv4(), error: true, message: "Error interno. Inténtalo más tarde." };
		}

		// Enviar Datos
		const { statusCode, body } = await request(process.env.API_AUTH_URL + "/auth/login", {
			method: "POST",
			headersTimeout: 1 * 60 * 1_000,
			headers: {
				Connection: "keep-alive",
				Authorization: "Bearer " + process.env.API_AUTH_TOKEN,
				"Content-Type": "application/json",
				"User-Agent": "NextJS - Login.ts (Node.js " + process.version + ")",
			},
			body: JSON.stringify({
				...data,
				user_agent: userAgent,
				ip: userIp,
			}),
		});

		// Validar Respuesta
		if ([200, 202].includes(statusCode)) {
			const responseBody = (await body.json()) as {
				data: {
					accessToken: string;
					accessExpiration: number;
					refreshToken: string;
					refreshExpiration: number;
				};
			};

			// Establecer Cookies
			await setAccessCookie(responseBody.data.accessToken, responseBody.data.accessExpiration);
			await setRefreshCookie(responseBody.data.refreshToken, responseBody.data.refreshExpiration);

			return { id: uuidv4(), error: false, message: statusCode === 200 ? "OK" : "Datos Faltantes" };
		} else if (statusCode === 423) {
			// Cambio de contraseña requerido
			return { id: uuidv4(), error: false, message: "Cambio de contraseña requerido." };
		} else if (statusCode === 403) {
			// Cuenta bloqueada
			return { id: uuidv4(), error: true, message: "Acceso no permitido." };
		}

		// Error Interno
		if (statusCode >= 500) {
			return { id: uuidv4(), error: true, message: "Error interno. Inténtalo más tarde." };
		}

		// Otros Errores
		return { id: uuidv4(), error: true, message: "Credenciales inválidas." };
	} catch (error) {
		// Error de Validación
		if (error instanceof ZodError) {
			return { id: uuidv4(), error: true, message: "Credenciales inválidas." };
		}

		// Error Interno
		return { id: uuidv4(), error: true, message: "Error interno. Inténtalo más tarde." };
	}
}
