/* eslint-disable @next/next/no-img-element */
"use client";
import { useWindowDimensions } from "@/hooks";
import { useRouter } from "next/navigation";
const Page = () => {
	const router = useRouter();
	const { width, height } = useWindowDimensions();
	if (width !== 1080 && height !== 1920) {
		return (
			<div className="flex justify-center items-center text-2xl w-full h-screen">
				<h1>Set your device dimensions to 1080 x 1920 to view app</h1>
			</div>
		);
	}
	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-20">
			<h1 className="text-8xl font-semibold">Ihr Gratis Coupon!!!</h1>
			<div className="flex gap-4 justify-center">
				<div className="bg-blue-400 w-3/5 p-10 rounded-2xl">
					<img
						className="rounded-xl"
						src="/assets/images/qr-code.png"
						alt="Qr Code"
					/>
				</div>
				<img
					className="w-60 object-cover"
					src="/assets/images/iphone.png"
					alt="Iphone"
				/>
			</div>
			<h2 className="text-6xl font-semibold">Per QR Code oder hier drucken</h2>
			<div className="w-full flex justify-center gap-4 items-center">
				<button
					onClick={() => {
						router.push("/");
					}}
					className={`relative w-[45vw] h-[200px] bg-[#D80909] text-6xl font-medium text-white cursor-pointer rounded-[3vw] transition-transform duration-100 ease-out active:translate-y-2`}
				>
					BEENDEN
					<span
						className={`absolute top-8 bg-[#8C0101] left-0 w-full h-full -z-10 rounded-[3vw] transition-all duration-100 ease-out active:top-2`}
					></span>
				</button>
				<button
					onClick={() => {
						router.push("/");
					}}
					className={`relative w-[45vw] h-[200px] bg-[#49c517] text-6xl font-medium text-white cursor-pointer rounded-[3vw] transition-transform duration-100 ease-out active:translate-y-2`}
				>
					DRUCKEN
					<span
						className={`absolute top-8 bg-[#117e25] left-0 w-full h-full -z-10 rounded-[3vw] transition-all duration-100 ease-out active:top-2`}
					></span>
				</button>
			</div>
		</div>
	);
};

export default Page;
