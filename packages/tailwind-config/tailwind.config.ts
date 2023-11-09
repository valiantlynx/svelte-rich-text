import type { Config } from "tailwindcss";

import daisyui from 'daisyui';
import { general } from '@valiantlynx/general-config';

const { theme } = general;

const config: Config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [daisyui],
	daisyui: { 
		themes: theme.map(({ name }: any) => name),
		styled: true, 
		darkTheme: "forest",
		utils: true,
		logs: false

	 }
};
export default config;

