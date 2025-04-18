"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

import refreshAccessCookie from "@/lib/auth";

export default function AccessRefresher() {
	useEffect(() => {
		const run = async () => {
			try {
				const result = await refreshAccessCookie();
				if (!result) {
					toast.error("Ups, algo salió mal. Vuelve a iniciar sesión.");
				}
			} catch {
				toast.error("Ups, algo salió mal. Vuelve a iniciar sesión.");
			}
		};

		run();
	}, []);

	return null;
}
