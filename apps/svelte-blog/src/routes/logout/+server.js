import { redirect } from 'sveltekit-flash-message/server';

export const POST = (event) => {
	event.locals.pb.authStore.clear();
	event.locals.user = undefined;

	const message = {
        type: 'success',
        message: 'Logout successful'
    };

    throw redirect(303, '/login', message, event);
};