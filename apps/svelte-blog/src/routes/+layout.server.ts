import { loadFlash } from 'sveltekit-flash-message/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load = loadFlash(async (event) => {
	if (event.locals.user) {
		return {
			user: event.locals.user
		};
	}

	return  {
		user: undefined
	}
});
