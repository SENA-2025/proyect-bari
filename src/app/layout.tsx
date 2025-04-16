import "./globals.css";

import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Metadata
export const metadata: Metadata = {
	metadataBase: new URL(process.env.APP_WEB_URL as string),
	title: {
		template: "%s | " + process.env.APP_WEB_TITLE,
		default: process.env.APP_WEB_TITLE + " - " + process.env.APP_WEB_DESCRIPTION_SHORT,
	},
	description: process.env.APP_WEB_DESCRIPTION_LONG,
	category: "Educación",
	icons: {
		icon: "/favicon.ico",
	},
	robots: {
		index: false,
		follow: false,
		nocache: true,
	},
};

// Configuración de la vista
export const viewport: Viewport = {
	themeColor: "#FFFFFF",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	interactiveWidget: "resizes-visual",
};

// Fuente(s)
import { Poppins } from "next/font/google";
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Componentes
const Toaster = dynamic(() => import("@/components/UI/toaster"));

// Layout
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es-CO">
			<body className={`${poppins.className} antialiased`}>
				<main className="flex min-h-screen max-w-full">
					<div className="w-full grow">{children}</div>
				</main>

				<Suspense fallback={null}>
					<Toaster />
				</Suspense>
			</body>
		</html>
	);
}
