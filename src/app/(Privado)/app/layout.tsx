import dynamic from "next/dynamic";
import { cookies } from "next/headers";

// Componentes
const AccessRefresher = dynamic(() => import("@/components/(Privado)/AccessRefresher"));

// Layout
export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies();

	return (
		<>
			{!cookieStore.has("_sid") && <AccessRefresher />}

			<div>{children}</div>
		</>
	);
}
