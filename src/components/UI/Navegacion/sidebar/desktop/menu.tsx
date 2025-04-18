"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

// Componentes
const StaffMenu = dynamic(() => import("@/components/UI/Navegacion/sidebar/menus/staff"));

interface SidebarMenuProps {
	collapse: boolean | undefined;
}

export default function SidebarMenu({ collapse }: SidebarMenuProps) {
	const pathname = usePathname();
	const reqUrl = pathname.toLowerCase();

	if (reqUrl.startsWith("/app/staff")) {
		return (
			<Suspense fallback={null}>
				<StaffMenu collapse={collapse} url={reqUrl} />
			</Suspense>
		);
	} else if (reqUrl.startsWith("/app/instructores")) {
	} else if (reqUrl.startsWith("/app/aprendices")) {
	} else {
	}

	return null;
}
