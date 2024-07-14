import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
const baloo_2 = localFont({
	src: "./_fonts/Baloo2-VariableFont_wght.ttf",
});

export const metadata: Metadata = {
	title: "Eudrino",
	description: "Edurino Point Sale System",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`bg-hero-gradient overflow-hidden grid-rows-[auto,1fr,auto] text-white ${baloo_2.className}`}
			>
				{children}
			</body>
		</html>
	);
}
