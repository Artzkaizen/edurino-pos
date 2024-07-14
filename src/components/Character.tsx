"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "../lib/utlis";

import Custom3DButton from "@/components/Custom3DButton";
import useSound from "use-sound";

export const characters = [
	{ name: "Alex", image: "/assets/alex.png" },
	{ name: "Robin", image: "/assets/robin.png" },
	{ name: "Ari", image: "/assets/ari.png" },
	{ name: "Juki", image: "/assets/juki.png" },
];

const Characters = () => {
	const [activeCharacter, setActiveCharacter] = useState<string | null>(null);

	const handleCharacterClick = (name: string) => {
		setActiveCharacter(name);
		console.log(`Selected ${name}`);
	};

	return (
		<>
			<div className="flex justify-center gap-4">
				{characters.map((char) => (
					<div
						key={char.name}
						onClick={() => handleCharacterClick(char.name)}
						className={cn(
							"rounded-2xl transition-all duration-200 cursor-pointer",
							{
								"bg-black/50": activeCharacter === char.name,
							}
						)}
					>
						<div className="h-auto w-auto">
							<Image src={char.image} alt={char.name} fill />
						</div>
					</div>
				))}
			</div>
			<span
				className={cn("opacity-0 transition-all duration-2000 cursor-pointer", {
					"opacity-100": activeCharacter,
				})}
			>
				<Custom3DButton avatar={activeCharacter}>
					Jetzt entdecken
				</Custom3DButton>
			</span>
		</>
	);
};

export default Characters;
