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

	return (
		<div className="flex size-full items-center justify-center bg-gray-50">
			<div className="flex w-full flex-col items-center justify-center gap-4">
				<div className="border-t-primary-400 text-primary-400 flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent text-4xl">
					<div className="border-t-secondary-600 text-secondary-600 flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent text-2xl"></div>
				</div>
			</div>
		</div>
	);
}
