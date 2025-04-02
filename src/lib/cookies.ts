"use server";

import { cookies } from "next/headers";

export async function setAccessCookie(token: string, expiration: number) {
	const cookieStore = await cookies();

	const now = Math.floor(Date.now() / 1000);
	const duration = Math.max(0, expiration - now);

	cookieStore.set({
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

export async function setRefreshCookie(token: string, expiration: number) {
	const cookieStore = await cookies();

	const now = Math.floor(Date.now() / 1000);
	const duration = Math.max(0, expiration - now);

	cookieStore.set({
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
