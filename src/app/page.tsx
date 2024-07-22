"use client";
import useSound from "use-sound";
import Custom3DButton from "@/components/Custom3DButton";
import { useWindowDimensions } from "@/hooks";

export default function Home() {
	const [playWelcome, { stop }] = useSound(
		"/assets/audios/welcome-audio-mix.mp3"
	);
	const { width, height } = useWindowDimensions();
	if (width !== 1080 && height !== 1920) {
		return (
			<div className="flex justify-center items-center text-2xl w-full h-screen">
				<h1>Set your device dimensions to 1080 x 1920 to view app</h1>
			</div>
		);
	}
	return (
		<main className="relative grid place-content-center h-screen w-screen">
			<video
				className="w-full h-[1920px] object-cover"
				src="/assets/videos/home-video.mp4"
				autoPlay
				muted
				loop
			></video>
			<div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
				<Custom3DButton action="home">JETZT ENTDECKEN</Custom3DButton>
			</div>
		</main>
	);
}
