import { Briefcase, Building, Building2, FileText, Globe, GraduationCap, History, Landmark, Shield, UserCog } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const Template = dynamic(() => import("@/components/UI/Navegacion/sidebar/menus/template"));

interface StaffMenuProps {
	collapse: boolean | undefined;
	url: string;
}

export default function StaffMenu({ collapse, url }: StaffMenuProps) {
	const mainUrl = "/app/staff";

	const menu = [
		{
			label: "Coordinacion",
			url: "/c",
			icon: Building2,
			list: [
				{ label: "Regionales", url: "/regionales", icon: Globe },
				{ label: "Centros", url: "/centros", icon: Landmark },
				{ label: "Sedes", url: "/sedes", icon: Building },
				{ label: "Coordinaciones", url: "/coordinaciones", icon: Briefcase },
				{ label: "Instructores", url: "/instructores", icon: GraduationCap },
			],
		},
		{
			label: "Registros",
			url: "/r",
			icon: History,
			list: [
				{ label: "Administración", url: "/admin", icon: FileText },
				{ label: "Coordinación", url: "/coordinacion", icon: FileText },
			],
		},
		{
			label: "Admin",
			url: "/a",
			icon: Shield,
			list: [{ label: "Administradores", url: "/administradores", icon: UserCog }],
		},
	];

	return (
		<Suspense fallback={null}>
			<Template collapse={collapse} currentUrl={url} mainUrl={mainUrl} menu={menu} />
		</Suspense>
	);
}
