import { loadFlash, redirect } from 'sveltekit-flash-message/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load = loadFlash(async (event) => {
	if (!event.locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
});
