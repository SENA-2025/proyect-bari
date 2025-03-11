import type { Metadata } from "next";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
	title: "Acceder",
	alternates: { canonical: "acceder" },
};

const Form = dynamic(() => import("@/components/(Autentificacion)/acceder/form"));

export default function Login_Page() {
	return (
		<div className="bg-white size-full">
			<Form />
		</div>
	);
}
