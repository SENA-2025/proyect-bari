import Link from "next/link";

export default function Header() {
	return (
		<header className="z-20 h-16 w-full bg-white shadow-sm">
			<div className="flex size-full items-center">
				<div className="mx-4 flex items-center justify-between">
					{/* Mobile Nav + Título */}
					<Link href="/app" className="select-none">
						{/* Mobile */}

						{/* PC */}
						<span className="from-tertiary-600 to-primary-400 bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl lg:text-2xl xl:text-3xl">
							{process.env.APP_WEB_TITLE}
						</span>
					</Link>

					{/* Navegación */}
					<div></div>
				</div>
			</div>
		</header>
	);
}
