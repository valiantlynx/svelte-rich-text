import type { Config } from "tailwindcss";

import daisyui from 'daisyui';
import { general } from 'general-config';

const { theme } = general;
console.log("theme", theme);

const config: Config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [daisyui],
	daisyui: { 
		themes: theme.map(({ name }: any) => name),
		styled: true, 
		base: true

	 }
};
export default config;

