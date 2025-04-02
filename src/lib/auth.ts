"use server";

import { cookies } from "next/headers";

export async function refreshAccessCookie() {
	const cookieStore = await cookies();

	// 
	if (!cookieStore.has("__srfk")) {
		return;
	}
}
