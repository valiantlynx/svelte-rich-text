import { loadFlash } from 'sveltekit-flash-message/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load = loadFlash(async ({locals}) => {
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return  {
		user: undefined
	}
});
