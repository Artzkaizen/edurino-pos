import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"hero-gradient":
					"linear-gradient(338.86deg, #2c3e6c 53.6%, #5679d2 93.76%)",
				"footer-gradient":
					"radial-gradient(145.38% 249.78% at 4.4% 8.01%, #d87c01 0%, #ffab07 3.65%, #5679d2 13.1%, #71a1df 50.5%, #95d7f1 100%)",

				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				yellow: "0 0 35px 5px yellow, 0 0 25px 10px yellow inset",
			},
		},
	},
	plugins: [],
};
export default config;
