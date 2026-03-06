import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compress: false, // Nginx responsable de la comprensión
	devIndicators: false, // No mostrar indicadores de desarrollo
	poweredByHeader: false, // No mostrar el encabezado de Next.js
	generateEtags: false, // No generar ETags (Cache gestionada por Cloudflare)
	images: {
		remotePatterns: [],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	typescript: {
		// Ignora los errores de TypeScript durante el build de producción.
		// Permite generar el build incluso si existen errores de tipos.
		// Útil para despliegues rápidos si se confía en que los errores no rompen la app.
		ignoreBuildErrors: false,
	},
};

export default nextConfig;
