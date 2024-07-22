"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utlis";
import useSound from "use-sound";

const fruits = [
	"lime",
	"apple",
	"banana",
	"lemon",
	"grapes",
	"orange",
	"watermelon",
];

const getRandomFruit = (fruits: string[]) =>
	fruits[Math.floor(Math.random() * fruits.length)];

const generateOptions = (correctAnswer: number) => {
	const options = new Set<number>();
	options.add(correctAnswer);

	while (options.size < 4) {
		options.add(Math.floor(Math.random() * 9) + 1);
	}

	return Array.from(options).sort(() => Math.random() - 0.5);
};

const getRandomColorClass = () => {
	const colors = [
		"text-red-500",
		"text-green-500",
		"text-blue-500",
		"text-yellow-500",
		"text-purple-500",
		"text-pink-500",
		"text-indigo-500",
		"text-teal-500",
		"text-orange-500",
	];
	return colors[Math.floor(Math.random() * colors.length)];
};

const Page = () => {
	const [playTryAgain] = useSound("/assets/audios/try-again.mp3");
	const [playCorrect] = useSound("/assets/audios/correct.mp3");
	const [num, setNum] = useState<number>(0);
	const [fruit, setFruit] = useState<string>("");
	const [arr, setArr] = useState<number[]>([]);
	const [options, setOptions] = useState<number[]>([]);
	const [pressed, setPressed] = useState<number | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const [colorClasses, setColorClasses] = useState<string[]>([]);
	const [correctCount, setCorrectCount] = useState<number>(0);

	useEffect(() => {
		if (correctCount < 3) {
			runGame();
		} else {
			redirect("/spin-the-wheel");
		}
	}, [correctCount]);

	const runGame = () => {
		const initialNum = Math.floor(Math.random() * 9) + 1;
		setNum(initialNum);
		setArr(Array.from({ length: initialNum }, (_, i) => i));
		setFruit(getRandomFruit(fruits));
		setOptions(generateOptions(initialNum));
		setPressed(null);
		setIsCorrect(false);
		setColorClasses(Array.from({ length: 4 }, getRandomColorClass));
	};

	const handleButtonClick = (option: number) => {
		const correct = option === num;
		setIsCorrect(correct);
		setPressed(option);
		!correct && playTryAgain();
		if (correct) {
			playCorrect();
			setCorrectCount((prev) => prev + 1);
		}
		setTimeout(() => {
			setPressed(null);
			setIsCorrect(false);
		}, 2000);
	};

	return (
		<>
			<div className="m-auto mt-4 h-[820px] w-[820px] border-[45px] border-[#EA7438]">
				<div className="h-full flex flex-wrap gap-2 justify-center items-center">
					{arr.map((item, index) => (
						<div key={index}>
							<Image
								src={`/assets/images/${fruit}.png`}
								alt={fruit}
								width={200}
								height={200}
								priority
							/>
						</div>
					))}
				</div>
			</div>
			<footer className="flex flex-col items-center gap-6 justify-center absolute bottom-20 w-full z-10">
				<div className="flex flex-wrap gap-4">
					{options.map((option, index) => (
						<div
							key={index}
							onClick={() => handleButtonClick(option)}
							className={cn(
								"flex justify-center items-center px-4 py-2 h-60 w-60 bg-white text-8xl font-medium rounded-2xl transform transition-transform duration-200 shadow-lg",
								{
									"translate-y-2 bg-green-500": pressed === option && isCorrect,
									"bg-red-500": pressed === option && !isCorrect,
									[colorClasses[index]]: pressed !== option,
								}
							)}
						>
							{option}
						</div>
					))}
				</div>
				<div className="absolute -z-30 w-full h-[1000px]">
					<Image src="/assets/images/curve.svg" alt="svg" fill sizes="1080px" />
				</div>
			</footer>
		</>
	);
};

export default Page;
