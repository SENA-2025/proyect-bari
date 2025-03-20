import "./globals.css";

import { CircleX } from "lucide-react";
import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";

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

// Layout
export default function Root_Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es-CO">
			<body className={`${poppins.className} antialiased`}>
				<main className="flex min-h-screen max-w-full">
					<div className="w-full grow">{children}</div>
				</main>

				{/* Toaster */}
				<Toaster
					position="bottom-right"
					gutter={-8}
					toastOptions={{
						duration: 5000,
						success: {},
						loading: {},
						error: {
							icon: <CircleX className="size-5 shrink-0 text-red-500" />,
							className:
								"z-50 flex items-center bg-white text-gray-800 border border-red-300 shadow-md rounded-lg px-4 py-3 text-xs lg:text-sm font-medium select-none mx-2 lg:mx-4 mb-2 lg:mb-4",
						},
					}}
				/>
			</body>
		</html>
	);
}
