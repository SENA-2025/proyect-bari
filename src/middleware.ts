import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	// Obtener las cookies
	const cookieStore = await cookies();

	// Validar longitud de las cookies
	if (cookieStore.has("__srfk") || cookieStore.has("_sid")) {
		// Refresh token
		const refreshToken = cookieStore.get("__srfk")?.value;
		if (refreshToken && refreshToken.length < 350) {
			cookieStore.delete("__srfk");
		}

		// Access token
		const accessToken = cookieStore.get("_sid")?.value;
		if (accessToken && accessToken.length < 350) {
			cookieStore.delete("_sid");
		}
	}

	// Obtener la URL de la solicitud
	const reqUrl = request.nextUrl.pathname.toLowerCase();
	const reqUrls = reqUrl.split("/").filter(url => url !== "");

	// Validar sesión
	if (["acceder", "registrarse"].includes(reqUrls.shift() || "")) {
		if (cookieStore.has("__srfk")) {
			// Redirigir a la página de inicio si ya hay sesión
			return NextResponse.redirect(new URL("/", request.url));
		} else {
			if (cookieStore.has("_sid")) {
				cookieStore.delete("_sid");
			}
		}
	} else {
		if (!cookieStore.has("__srfk")) {
			// Redirigir a la página de inicio de sesión si no hay sesión
			return NextResponse.redirect(new URL("/acceder", request.url));
		}
	}

	// Generar un nonce aleatorio
	const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
	// Construir el CSP
	const CSP = `
		default-src 'self';
		connect-src 'self';
		script-src 'self' 'nonce-${nonce}' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : "'strict-dynamic'"};
		script-src-attr 'self' 'nonce-${nonce}';
		script-src-elem 'self' 'nonce-${nonce}';
		img-src 'self' blob: data:;
		font-src 'self';
		object-src 'none';
		base-uri 'self';
		form-action 'self';
		frame-ancestors 'none';
		worker-src 'self';
		style-src 'self' 'nonce-${nonce}';
		style-src-attr 'self' 'nonce-${nonce}';
		style-src-elem 'self' 'nonce-${nonce}';
		upgrade-insecure-requests;`;
	const CSP_Header = CSP.replace(/\s{2,}/g, " ").trim();

	// Encabezados de la solicitud
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);
	requestHeaders.set("Content-Security-Policy", CSP_Header);

	// Respuesta de Next.js
	const response = NextResponse.next({ request: { headers: requestHeaders } });

	response.headers.set("Content-Security-Policy", CSP_Header);
	response.headers.set("X-XSS-Protection", "1; mode=block");
	response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-Download-Options", "noopen");
	response.headers.set("X-Content-Type-Options", "nosniff");

	response.headers.set("Referrer-Policy", "same-origin");
	response.headers.set("Origin-Agent-Cluster", "?1");
	response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
	response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
	response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");

	return response;
}

export const config = {
	matcher: [
		{
			source: "/((?!_next/static|_next/image|favicon.ico|logo.webp|robots.txt).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};
