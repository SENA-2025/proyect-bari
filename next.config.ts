import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compress: false, // Nginx responsable de la comprensión
	devIndicators: false, // No mostrar indicadores de desarrollo
	poweredByHeader: false,
	experimental: {
		optimizePackageImports: [],
	},
	images: {
		remotePatterns: [],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
};

export default nextConfig;
