import "./globals.css";

import type { Metadata, Viewport } from "next";

// Metadata
export const metadata: Metadata = {
	metadataBase: new URL(process.env.APP_WEB_URL as string),
	title: {
		template: "%s | " + process.env.APP_WEB_TITLE,
		default: process.env.APP_WEB_TITLE + " - " + process.env.APP_WEB_DESCRIPTION_SHORT,
	},
	description: process.env.APP_WEB_DESCRIPTION_LONG,
	alternates: {
		canonical: "/",
	},
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
};

// Fuente(s)
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

// Layout
export default function Root_Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es-CO">
			<body className={`${poppins.className} antialiased`}>
				<main className="flex min-h-screen max-w-full">
					<div className="w-full grow">{children}</div>
				</main>
			</body>
		</html>
	);
}
