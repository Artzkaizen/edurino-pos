const PlayLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<section>
			{children}
			<footer className="flex flex-col items-center gap-6 justify-center absolute bottom-20 w-full z-10">
				<h1 className="text-3xl z-50">This is the play layout footer</h1>
			</footer>
		</section>
	);
};

export default PlayLayout;
