"use server";

import net from "node:net";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

type ClientInfoProps = {
	currentUrl: string;
};

// Tipos
type ClientInfo = {
	accessToken: string;
};

export default async function getClientInfo({ currentUrl }: ClientInfoProps): Promise<ClientInfo> {
	const cookieStore = await cookies();

	// Validar si existe el Refresh Token
	if (!cookieStore.has("__srfk")) {
		redirect("/acceder");
	}

	// Validar si existe el Access Token
	if (!cookieStore.has("_sid")) {
		redirect(currentUrl);
	}

	const accessToken = cookieStore.get("_sid")?.value as string;

	// Obtener Headers
	const requestHeaders = await headers();
	const userAgent = requestHeaders.get("user-agent")?.trim();
	const userIp = requestHeaders.get("cf-connecting-ip") || requestHeaders.get("x-forwarded-for") || requestHeaders.get("x-real-ip");

	// Validar IP
	if (!userIp?.trim() || !net.isIP(userIp.trim())) {
		cookieStore.delete("__srfk");
		redirect("/acceder");
	}

	// Validar User-Agent
	if (!userAgent) {
		cookieStore.delete("__srfk");
		redirect("/acceder");
	}

	// Retornar Datos
	return { accessToken };
}
