"use server";

import { cookies } from "next/headers";

// Establece la cookie de acceso
export async function setAccessCookie(token: string, expiration: number) {
	const now = Math.floor(Date.now() / 1000);
	const duration = Math.max(0, expiration - now);

	(await cookies()).set({
		name: "_sid",
		value: token,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: duration,
		priority: "high",
	});
}

// Establece la cookie de refresco
export async function setRefreshCookie(token: string, expiration: number) {
	const now = Math.floor(Date.now() / 1000);
	const duration = Math.max(0, expiration - now);

	(await cookies()).set({
		name: "__srfk",
		value: token,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: duration,
		priority: "high",
	});
}
