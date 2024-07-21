import Image from "next/image";
const PlayLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <section>{children}</section>;
};

export default PlayLayout;
