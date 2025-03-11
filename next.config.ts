import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compress: false, // Nginx responsable de la comprensión
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
