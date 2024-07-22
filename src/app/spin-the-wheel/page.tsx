/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const segmentLabels = [
	"20% Rabatt",
	"0% Rabatt",
	"Kreativwelt & Logikspiele",
	"Geschenk-gutschein",
	"13% Rabatt",
	"Lesezauber & Zahlenspaß",
	"Bestseller Bundle",
	"5% Rabatt",
];
export const AllCharacters = [
	{ name: "Alex", image: "/assets/images/alex-scroll.png" },
	{ name: "Asa", image: "/assets/images/asa-scroll.png" },
	{ name: "Juki", image: "/assets/images/juki-scroll.png" },
	{ name: "Leo", image: "/assets/images/leo-scroll.png" },
	{ name: "Niki", image: "/assets/images/niki-scroll.png" },
	{ name: "Ollie", image: "/assets/images/ollie-scroll.png" },
	{ name: "Robin", image: "/assets/images/robin-scroll.png" },
	{ name: "luka", image: "/assets/images/luka-scroll.png" },
	{ name: "Mika", image: "/assets/images/mika-scroll.png" },
	{ name: "Ari", image: "/assets/images/ari-scroll.png" },
];

const Page = () => {
	const [isSpinning, setIsSpinning] = useState(false);
	const [rotation, setRotation] = useState(0);
	const [currentSegment, setCurrentSegment] = useState("");
	const [wheelSegments, setWheelSegments] = useState<
		{ label: string; angle: number }[]
	>([]);
	const requestRef = useRef<number | null>(null);
	const spinSpeed = useRef(0);
	const acceleration = useRef(0.2);
	const deceleration = useRef(0.1);
	const maxSpeed = useRef(15);

	const initialOffset = -65.9154;

	useEffect(() => {
		const segmentAngle = 360 / segmentLabels.length;
		setWheelSegments(
			segmentLabels.map((label, index) => ({
				label,
				angle: index * segmentAngle,
			}))
		);
	}, []);

	const spin = () => {
		setRotation((prevRotation) => prevRotation + spinSpeed.current);
		requestRef.current = requestAnimationFrame(spin);
	};

	const startSpinning = () => {
		const accelerate = () => {
			if (spinSpeed.current < maxSpeed.current) {
				spinSpeed.current += acceleration.current;
				requestAnimationFrame(accelerate);
			}
		};

		accelerate();
		requestRef.current = requestAnimationFrame(spin);
		setIsSpinning(true);
	};

	const stopSpinning = () => {
		const decelerate = () => {
			if (spinSpeed.current > 0) {
				spinSpeed.current -= deceleration.current;
				requestAnimationFrame(decelerate);
			} else {
				spinSpeed.current = 0;
				if (requestRef.current) {
					cancelAnimationFrame(requestRef.current);
				}
				setIsSpinning(false);
				calculateCurrentSegment();
			}
		};

		decelerate();
	};

	const calculateCurrentSegment = () => {
		const finalAngle = rotation % 360;
		const adjustedAngle = finalAngle < 0 ? 360 + finalAngle : finalAngle;
		const segmentAngle = 360 / wheelSegments.length;

		// Find the current segment based on the adjusted angle
		const currentSegmentIndex =
			Math.floor(adjustedAngle / segmentAngle) % wheelSegments.length;
		const currentSegment = wheelSegments[currentSegmentIndex];

		setCurrentSegment(currentSegment.label);
	};

	const handleButtonClick = () => {
		isSpinning ? stopSpinning() : startSpinning();
	};

	return (
		<div className="relative h-screen w-full">
			<header className="relative w-full h-auto min-h-80">
				<img src="/assets/header.svg" alt="svg" />
			</header>
			{!currentSegment ? (
				<div className="flex flex-col items-center">
					<div className="relative">
						<div className="w-[1080] h-[1000px]">
							<img
								src="/assets/images/spinning-wheel.svg"
								alt="Spinning Wheel"
								className={`w-full h-full ${
									isSpinning
										? ""
										: `transition-transform duration-[3s] ease-out`
								}`}
								style={{ transform: `rotate(${rotation}deg)` }}
							/>
						</div>

						<div className="absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-44 rotate-180 text-8xl text-white">
							&#9654;
						</div>
					</div>
					<footer className="flex flex-col items-center gap-6 justify-end absolute bottom-60 w-full z-10">
						<div className="absolute -top-52 -z-30 w-full h-[1000px]">
							<Image
								src="/assets/images/curve.svg"
								alt="svg"
								fill
								sizes="1080px"
							/>
							<Image
								src="/assets/images/grass.svg"
								alt="svg"
								fill
								sizes="1080px"
							/>
						</div>
						<button
							onClick={handleButtonClick}
							className={`relative w-[600px] h-[200px] text-6xl font-medium text-white  ${
								isSpinning ? "bg-[#D80909]" : "bg-[#49c517]"
							} cursor-pointer rounded-[3vw] transition-transform duration-100 ease-out active:translate-y-2`}
						>
							{isSpinning ? "Stop" : "Start"}
							<span
								className={`absolute top-8 left-0 w-full h-full -z-10  ${
									isSpinning ? "bg-[#8C0101]" : "bg-[#117e25]"
								} rounded-[3vw] transition-all duration-100 ease-out active:top-2`}
							></span>
						</button>
					</footer>
				</div>
			) : (
				<Certificate prize={currentSegment} />
			)}
		</div>
	);
};

export default Page;

const Certificate = ({ prize }: { prize: string }) => {
	const router = useRouter();
	return (
		<div className="relative h-full">
			<img
				className="m-auto absolute -z-50"
				src="/assets/images/confetti.png"
				alt="confetti"
			/>
			<div className="relative mt-4 w-4/6 h-[35rem] m-auto border-[2rem] border-blue-300 bg-white rounded-2xl">
				<img
					className="m-auto"
					src="/assets/images/edurino-logo.png"
					alt="edurino-logo"
				/>

				<div className="flex ">
					<img className="w-48" src="/assets/images/trophy.svg" alt="trophy" />
					<div className="flex flex-col justify-start mx-auto items-center">
						<h2 className="mx-auto text-5xl font-semibold text-center text-black">
							Glückwunsch
						</h2>
						<p className="text-3xl text-[#EA7438]">{prize}</p>
					</div>
				</div>
				<img
					className="absolute bottom-0 w-full"
					src="/assets/images/small-grass.svg"
					alt="grass"
				/>
				<img
					className="absolute -bottom-30 -right-10"
					src="/assets/images/medal.svg"
					alt="medal"
				/>
			</div>
			<HorizontalScrollableComponent />
			<div className="w-full flex justify-center items-center">
				<button
					onClick={() => {
						router.push("/");
					}}
					className={`relative w-[90vw] h-[200px] bg-[#FE9100] text-6xl font-medium text-white cursor-pointer rounded-[3vw] transition-transform duration-100 ease-out active:translate-y-2`}
				>
					GUTSCHEIN EINLÖSEN
					<span
						className={`absolute top-8 bg-[#EA7438] left-0 w-full h-full -z-10 rounded-[3vw] transition-all duration-100 ease-out active:top-2`}
					></span>
				</button>
			</div>
			<img
				className="absolute bottom-80"
				src="/assets/images/grass.svg"
				alt="svg"
			/>
		</div>
	);
};
const HorizontalScrollableComponent = () => {
	return (
		<div className="scroll-container">
			<div className="scroll-inner">
				{[...AllCharacters, ...AllCharacters].map((char, index) => (
					<div
						key={index}
						className="character-item flex flex-col items-center"
					>
						<img src={char.image} alt={char.name} className="character-image" />
						<p className="character-name font-bold text-4xl text-[#EA7438] text-center mt-2">
							{char.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
