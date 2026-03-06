import Link from "next/link";

export default function Header() {
	return (
		<header className="z-20 h-14 w-full shrink-0 bg-white shadow-sm transition-all duration-300 ease-in-out lg:h-16">
			<div className="flex size-full items-center">
				<div className="mx-4 flex items-center justify-between">
					{/* Mobile Nav + Título */}
					<div className="flex items-center justify-center">
						<Link href="/app">
							<span className="from-tertiary-600 to-primary-400 bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent uppercase transition-all duration-300 ease-in-out select-none md:text-xl lg:text-2xl xl:text-3xl">
								{process.env.APP_WEB_TITLE}
							</span>
						</Link>
					</div>

					{/* Navegación */}
					<div></div>
				</div>
			</div>
		</header>
	);
}
