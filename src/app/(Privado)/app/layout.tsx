import { cookies } from "next/headers";

import refreshAccessCookie from "@/lib/auth";

// Layout
export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies();

	// Validar sesión (Access Token)
	if (!cookieStore.has("_sid")) {
		const status = await refreshAccessCookie();

		if (!status) {
			return null;
		}
	}

	return <div>{children}</div>;
}
