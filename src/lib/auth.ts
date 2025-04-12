"use server";

import net from "node:net";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { request } from "undici";

import { setAccessCookie } from "@/lib/cookies";

export default async function refreshAccessCookie() {
	const cookieStore = await cookies();

	// Validar si existe el Refresh Token
	if (!cookieStore.has("__srfk")) {
		redirect("/acceder");
	}

	// Obtener el Refresh Token
	const refreshToken = cookieStore.get("__srfk")?.value;

	// Validar el Refresh Token
	if (refreshToken && refreshToken.length < 350) {
		cookieStore.delete("__srfk");
		redirect("/acceder");
	}

	// Obtener Headers
	const requestHeaders = await headers();
	const userAgent = requestHeaders.get("user-agent");
	const userIp = requestHeaders.get("cf-connecting-ip") || requestHeaders.get("x-forwarded-for") || requestHeaders.get("x-real-ip");

	// Validar IP
	if (!userIp || !net.isIP(userIp)) {
		cookieStore.delete("__srfk");
		redirect("/acceder");
	}

	// Validar User-Agent
	if (!userAgent) {
		cookieStore.delete("__srfk");
		redirect("/acceder");
	}

	// Generar el Access Token
	try {
		// Enviar Datos
		const { statusCode, body } = await request(process.env.API_SESSION_URL + "/session/refresh", {
			method: "POST",
			headersTimeout: 30 * 1_000,
			headers: {
				Connection: "keep-alive",
				Authorization: "Bearer " + process.env.API_SESSION_TOKEN,
				Cookie: `__srfk=${refreshToken}`,
				"Content-Type": "application/json",
				"User-Agent": "NextJS - Lib/Auth.ts (Node.js " + process.version + ")",
			},
			body: JSON.stringify({
				user_agent: userAgent,
				ip: userIp,
			}),
		});

		// Validar Respuesta
		if (statusCode === 201) {
			const responseBody = (await body.json()) as {
				data: {
					accessToken: string;
					accessExpiration: number;
				};
			};

			// Establecer Cookies
			await setAccessCookie(responseBody.data.accessToken, responseBody.data.accessExpiration);

			return true;
		}

		// Error Interno
		if (statusCode >= 500) {
			return false;
		}

		// Fallo de Validación
		cookieStore.delete("__srfk");
	} catch {
		return false;
	}

	redirect("/acceder");
}
