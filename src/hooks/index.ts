"use client";
import { useEffect, useState } from "react";

interface WindowDimensions {
	width: number | undefined;
	height: number | undefined;
}

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		// Call the function initially to set the initial dimensions
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};
