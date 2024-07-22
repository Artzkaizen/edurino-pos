"use client";
import Image from "next/image";
import { cn } from "@/lib/utlis";
import useSound from "use-sound";
import { useState } from "react";
import { useWindowDimensions } from "@/hooks";
import Custom3DButton from "@/components/Custom3DButton";

export const characters = [
	{ name: "Alex", image: "/assets/images/alex.png" },
	{ name: "Robin", image: "/assets/images/robin.png" },
	{ name: "Ari", image: "/assets/images/ari.png" },
	{ name: "Juki", image: "/assets/images/juki.png" },
];

const Page = () => {
	const [activeCharacter, setActiveCharacter] = useState<string | null>(null);

	const [playCharacterSound] = useSound("/assets/audios/robin-count-audio.mp3");
	const handleCharacterClick = (name: string) => {
		setActiveCharacter(name);
	};
	const { width, height } = useWindowDimensions();

	if (width !== 1080 || height !== 1920) {
		return (
			<div className="text-4xl w-full h-screen">
				<h1>Set your device dimensions to 1080 x 1920 to view app</h1>
			</div>
		);
	}
	return (
		<div>
			{!activeCharacter && (
				<h1
					className={`top-0 m-0 text-8xl text-center font-bold z-10 drop-shadow-2xl
				`}
				>
					WILLKOMMEN <br />
					IM EDUVERSUM!
				</h1>
			)}
			<div className="">
				{activeCharacter ? (
					<div className="m-auto mt-4 h-[820px] w-[820px] border-[45px] border-[#EA7438]">
						<video
							className="w-full h-full object-cover"
							src={`/assets/videos/${activeCharacter}.mp4`}
							autoPlay
							loop
						></video>
					</div>
				) : (
					// eslint-disable-next-line @next/next/no-img-element
					<img src="./assets/images/chars_hd.png" alt="Characters" />
				)}
			</div>
			<footer className="flex flex-col items-center gap-6 justify-center absolute bottom-20 w-full z-10">
				<h2 className="text-6xl text-center font-semibold mt-24">
					WÄHLE DEINE FIGUR
				</h2>
				<div className="absolute -top-20 -z-30 w-full h-[1000px]">
					<Image src="/assets/images/curve.svg" alt="svg" fill sizes="1080px" />
					{!activeCharacter && (
						<Image
							className="absolute bottom-20 "
							src="/assets/images/grass.svg"
							alt="svg"
							fill
							sizes="1080px"
						/>
					)}
				</div>

				<>
					<div className="flex justify-center gap-4">
						{characters.map((char) => (
							<div
								key={char.name}
								onClick={() => handleCharacterClick(char.name)}
								className={cn(
									"relative rounded-2xl transition-all duration-200 cursor-pointer h-60 w-60",
									{
										"bg-black/50": activeCharacter === char.name,
									}
								)}
							>
								<Image
									className="drop-shadow-2xl"
									src={char.image}
									alt={char.name}
									fill
									sizes="240px"
								/>
							</div>
						))}
					</div>
					<span
						className={cn("hidden cursor-pointer", {
							block: activeCharacter,
						})}
					>
						<Custom3DButton
							action={`home/play/${activeCharacter?.toLocaleLowerCase()}`}
							play={playCharacterSound}
						>
							Speilen
						</Custom3DButton>
					</span>
				</>
			</footer>
		</div>
	);
};

export default Page;
