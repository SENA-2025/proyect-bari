"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

import refreshAccessCookie from "@/lib/auth";

interface AccessRefresherProps {
	accessToken: string;
}

export default function AccessRefresher({ accessToken }: AccessRefresherProps) {
	useEffect(() => {
		let timeout: NodeJS.Timeout;

		// Función para refrescar el token de acceso
		const run = async () => {
			try {
				const result = await refreshAccessCookie();
				if (!result) {
					toast.error("Ups, algo salió mal. Vuelve a iniciar sesión.");
					return;
				}

				const token_expires = 14 * 60 * 1000; // 14 minutos
				timeout = setTimeout(run, token_expires);
			} catch {
				toast.error("Ups, algo salió mal. Vuelve a iniciar sesión.");
			}
		};

		// Función para inicializar el refresco del token
		const init = () => {
			if (!accessToken.length) {
				run();
				return;
			}

			try {
				const payload = JSON.parse(atob(accessToken.split(".")[1]));
				const now = Math.floor(Date.now() / 1000);
				const secondsLeft = Math.max(0, payload.exp - now);

				if (secondsLeft <= 60) {
					run();
					return;
				}

				const delay = Math.max(0, secondsLeft - 60) * 1000;
				timeout = setTimeout(run, delay);
			} catch {
				run();
			}
		};

		init();

		return () => clearTimeout(timeout);
	}, [accessToken]);

	return null;
}
