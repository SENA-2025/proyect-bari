import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compress: false, // Nginx responsable de la comprensión
	devIndicators: false, // No mostrar indicadores de desarrollo
	poweredByHeader: false, // No mostrar el encabezado de Next.js
	generateEtags: false, // No generar ETags (Cache gestionada por Cloudflare)
	experimental: {
		optimizePackageImports: ["uuid", "zod", "react-hot-toast", "undici", "use-debounce", "clsx", "tailwind-merge"],
	},
	images: {
		remotePatterns: [],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
};

export default nextConfig;
