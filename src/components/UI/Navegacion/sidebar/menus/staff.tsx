import {
	BarChart2,
	BookMarked,
	BookOpen,
	Briefcase,
	Building,
	Building2,
	ClipboardCheck,
	ClipboardList,
	FileText,
	GitBranch,
	Globe,
	GraduationCap,
	History,
	Home,
	Landmark,
	Layers,
	LayoutDashboard,
	School,
	Shield,
	User,
	UserCog,
	Users,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Componentes
const Template = dynamic(() => import("@/components/UI/Navegacion/sidebar/menus/template"));

type StaffMenuProps = {
	collapse: boolean | undefined;
	url: string;
};

export default function StaffMenu({ collapse, url }: StaffMenuProps) {
	const mainUrl = "/app/staff";

	const menu = [
		{
			label: "Inicio",
			url: "",
			icon: Home,
			list: [{ label: "Dashboard", url: "", icon: LayoutDashboard }],
		},
		{
			label: "Coordinación",
			url: "/c",
			icon: Building2,
			list: [
				{ label: "Regionales", url: "/regionales", icon: Globe },
				{ label: "Centros", url: "/centros", icon: Landmark },
				{ label: "Sedes", url: "/sedes", icon: Building },
				{ label: "Coordinaciones", url: "/coordinaciones", icon: Briefcase },
				{ label: "Instructores", url: "/instructores", icon: GraduationCap },
				{ label: "Aprendices", url: "/aprendices", icon: School },
			],
		},
		{
			label: "Formación",
			url: "/f",
			icon: BookOpen,
			list: [
				{ label: "Modalidades", url: "/modalidades", icon: Layers },
				{ label: "Niveles", url: "/niveles", icon: BarChart2 },
				{ label: "Programas de formación", url: "/programas", icon: BookMarked },
				{ label: "Fichas", url: "/fichas", icon: ClipboardList },
				{ label: "Transversales", url: "/transversales", icon: GitBranch },
			],
		},
		{
			label: "Gestión",
			url: "/g",
			icon: Users,
			list: [{ label: "Usuarios", url: "/usuarios", icon: User }],
		},
		{
			label: "Registros",
			url: "/r",
			icon: History,
			list: [
				{ label: "Coordinación", url: "/coordinacion", icon: FileText },
				{ label: "Formación", url: "/formacion", icon: FileText },
				{ label: "Usuarios", url: "/usuarios", icon: FileText },
				{ label: "Administración", url: "/admin", icon: FileText },
			],
		},
		{
			label: "Admin",
			url: "/a",
			icon: Shield,
			list: [
				{ label: "Administradores", url: "/administradores", icon: UserCog },
				{ label: "Coordinadores", url: "/coordinadores", icon: ClipboardCheck },
			],
		},
	];

	return (
		<Suspense fallback={null}>
			<Template collapse={collapse} currentUrl={url} mainUrl={mainUrl} menu={menu} />
		</Suspense>
	);
}
