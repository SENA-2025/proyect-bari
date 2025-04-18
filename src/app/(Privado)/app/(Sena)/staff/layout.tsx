import type { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
	title: {
		default: "Staff",
		template: "%s | Staff - SENA",
	},
};

// Layout
export default function StaffLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
