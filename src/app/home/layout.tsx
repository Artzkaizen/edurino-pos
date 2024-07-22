/* eslint-disable @next/next/no-img-element */
const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section>
			<header className="relative">
				<img src="/assets/header.svg" alt="svg" />
			</header>
			{children}
		</section>
	);
};

export default DashboardLayout;
