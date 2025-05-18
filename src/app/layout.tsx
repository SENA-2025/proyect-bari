import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

// Utilidades
import { cn } from "@/lib/utils";

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
		noarchive: true,
		noimageindex: true,
		notranslate: true,
		nositelinkssearchbox: true,
		nosnippet: true,
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
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Componentes
import { CircleCheck, CircleX } from "lucide-react";
import { Toaster } from "react-hot-toast";

// Layout
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es-CO">
			<body className={cn(poppins.className, "antialiased")}>
				<main className="flex min-h-screen w-full">
					<div className="flex-1">{children}</div>
				</main>

				{/* TODO: Remplazar el Toast por uno propio! */}
				<Toaster
					position="bottom-right"
					gutter={-8}
					toastOptions={{
						duration: 5000,
						position: "bottom-right",
						success: {
							duration: 2000,
							icon: <CircleCheck className="size-5 shrink-0 text-green-500" />,
							className:
								"z-50 flex items-center gap-2 bg-white text-gray-800 border border-green-300 shadow-md transition-all duration-300 ease-in-out rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm xl:text-base font-medium select-none mx-2 lg:mx-4 mb-4",
						},
						loading: {
							duration: 2 * 60 * 1000,
							className: "z-50 transition-all duration-300 ease-in-out",
						},
						error: {
							duration: 4000,
							icon: <CircleX className="size-5 shrink-0 text-red-500" />,
							className:
								"z-50 flex items-center gap-2 bg-white text-gray-800 border border-red-300 shadow-md transition-all duration-300 ease-in-out rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm xl:text-base font-medium select-none mx-2 lg:mx-4 mb-4",
						},
					}}
				/>
			</body>
		</html>
	);
}
