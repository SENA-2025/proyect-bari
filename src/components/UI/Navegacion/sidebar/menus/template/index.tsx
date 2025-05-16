import Link from "next/link";

// Utilidades
import { cn } from "@/lib/utils";

type MenuItem = {
	label: string;
	url: string;
	icon: React.ElementType;
};

type MenuSection = {
	label: string;
	url: string;
	icon: React.ElementType;
	list: MenuItem[];
};

type TemplateMenuProps = {
	collapse: boolean | undefined;
	currentUrl: string;
	mainUrl: string;
	menu: MenuSection[];
};

export default function TemplateMenu(props: TemplateMenuProps) {
	return (
		<nav
			className={cn(
				"transition-all duration-300 ease-in-out select-none",
				props.collapse === undefined ? "w-0 opacity-0" : "size-full opacity-100"
			)}
		>
			<ul className={cn("flex flex-col gap-3", !props.collapse && "px-1.5")}>
				{/* Menu */}
				{props.menu.map((section, i) => (
					<li key={i} className="flex flex-col items-center justify-center gap-2">
						{/* Categoria */}
						<div
							title={props.collapse ? section.label : ""}
							className={cn(
								"flex transition-all duration-300 ease-in-out",
								props.collapse ? "w-fit rounded-md bg-gradient-to-r from-lime-600/20 to-lime-400/20 p-2" : "w-full uppercase"
							)}
						>
							{props.collapse && <section.icon className="text-tertiary-600 transition-all duration-300 ease-in-out" size={20} />}
							{!props.collapse && (
								<span className="text-xs font-bold tracking-wider text-gray-800 transition-all duration-300 ease-in-out">
									{section.label}
								</span>
							)}
						</div>

						{/* Items */}
						<ul className="flex w-full flex-col items-center justify-center gap-1">
							{section.list.map((item, j) => {
								const createUrl = props.mainUrl + section.url + item.url;
								const isActive = props.currentUrl === createUrl;

								return (
									<li key={j} title={props.collapse ? item.label : ""} className={props.collapse ? "w-fit" : "w-full"}>
										{/* Item */}
										<Link
											href={createUrl}
											className={cn(
												"flex w-full items-center justify-start gap-2 rounded-md p-2 text-sm transition-all duration-300 ease-in-out",
												isActive
													? "from-primary-400/20 to-tertiary-600/20 text-tertiary-600 cursor-default bg-gradient-to-r"
													: "text-gray-700 hover:bg-gray-100"
											)}
										>
											<item.icon
												className={cn("shrink-0 transition-all duration-300 ease-in-out", !isActive && "text-gray-500")}
												size={16}
											/>
											<span
												className={cn(
													"transition-all duration-300 ease-in-out",
													props.collapse ? "hidden" : "truncate capitalize"
												)}
											>
												{item.label}
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</li>
				))}
			</ul>
		</nav>
	);
}
