// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@valiantlynx/tailwind-config/tailwind.config';

const config: Pick<Config, 'presets'> = {
	presets: [sharedConfig]
};

export default config;
