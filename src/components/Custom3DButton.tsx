"use client";
import "./button.css";
import { useRouter } from "next/navigation";
import { AwesomeButtonProgress } from "react-awesome-button";

const Custom3DButton = ({
	play,
	action,
	children,
}: {
	play?: () => void;
	children: React.ReactNode;
	action: string;
}) => {
	const router = useRouter();
	const handlePress = async (element: any, next: () => void) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		next();
		router.push(action);
		play && play();
	};

	return (
		<AwesomeButtonProgress
			type="primary"
			size="large"
			loadingLabel="Loading..."
			onPress={handlePress}
		>
			<div className="flex items-center justify-center">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img className="w-48 h-44" src="/assets/images/cloud-play.png" alt="" />
				{children}
			</div>
		</AwesomeButtonProgress>
	);
};

export default Custom3DButton;
