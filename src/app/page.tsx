"use client";
import Custom3DButton from "@/components/Custom3DButton";
import useSound from "use-sound";

export default function Home() {
	const [playWelcome] = useSound("/assets/audios/welcome-audio.mp3");
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
				<Custom3DButton play={playWelcome} action="home">
					Jetzt entdecken
				</Custom3DButton>
			</div>
		</main>
	);
}
