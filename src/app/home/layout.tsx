import Image from "next/image";
import Characters from "@/components/Character";

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section>
			<header className="relative">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="./assets/header.svg" alt="svg" />
			</header>
			{children}
		</section>
	);
};

export default DashboardLayout;
