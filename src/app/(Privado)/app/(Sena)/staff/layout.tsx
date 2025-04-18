import type { Metadata } from "next";

// Metadata
export const metadata: Metadata = {
	title: "Staff",
};

// Layout
export default function StaffLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
