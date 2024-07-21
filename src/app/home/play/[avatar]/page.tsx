"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const fruits = [
	"lime",
	"apple",
	"banana",
	"lemon",
	"grapes",
	"orange",
	"watermelon",
];
const getRandomFruit = (arr: string[]) => {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
};

const generateOptions = (correctAnswer: number) => {
	const options = new Set<number>();
	options.add(correctAnswer);

	while (options.size < 4) {
		const randomOption = Math.floor(Math.random() * 9) + 1;
		options.add(randomOption);
	}

	return Array.from(options).sort(() => Math.random() - 0.5);
};
const Page = ({ params }: { params: { avatar: string } }) => {
	const [num, setNum] = useState(0);
	const [fruit, setFruit] = useState<string>("");
	const [arr, setArr] = useState<number[]>([]);
	const [options, setOptions] = useState<number[]>([]);
	const [pressed, setPressed] = useState<number | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean>(false);

	useEffect(() => {
		runGame();
	}, [isCorrect]); // Run once on mount

	const runGame = async () => {
		setTimeout(() => {}, 5000);
		const initialNum = Math.floor(Math.random() * 9) + 1;
		setNum(initialNum);
		setArr(Array.from({ length: initialNum }, (_, i) => i));
		setFruit(getRandomFruit(fruits));
		setOptions(generateOptions(initialNum));
		setPressed(null);
		setIsCorrect(false);
	};

	const handleButtonClick = (option: number) => {
		setIsCorrect(option === num);
		setPressed(option);
		setTimeout(() => {
			setPressed(null);
			setIsCorrect(false);
		}, 2000);
	};
	return (
		<>
			<div className="m-auto mt-4 h-[820px] w-[820px] border-[45px] border-[#EA7438]">
				{/* <div>This is the play {params.avatar} page</div> */}
				<div className="h-full flex flex-wrap gap-2 justify-center items-center">
					{arr.map((item, index) => (
						<div key={item + index}>
							<Image
								src={`/assets/images/${fruit}.png`}
								alt="lime"
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
							className={`flex justify-center items-center px-4 py-2 h-60 w-60 bg-blue-500 text-white text-8xl font-medium rounded-2xl transform transition-transform duration-200 ${
								pressed === option ? "translate-y-2" : ""
							}`}
						>
							{option}
						</div>
					))}
				</div>
				{isCorrect && (
					<button
						className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md text-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
						onClick={runGame}
					>
						Play Again
					</button>
				)}
				<div className="absolute  -z-30 w-full h-[1000px]">
					<Image src="/assets/images/curve.svg" alt="svg" fill sizes="1080px" />
				</div>
			</footer>
		</>
	);
};

export default Page;
