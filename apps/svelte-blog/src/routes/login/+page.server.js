import { redirect, setFlash } from 'sveltekit-flash-message/server';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async (event) => {
		const data = await event.request.formData();

		const username = data.get('username');
		const password = data.get('password');

		try {
			// Authenticate the user and get the token from the server
			await event.locals.pb.collection('users_valiantlynx').authWithPassword(username, password);

			// get their IP address
			// console.log('event', event.getClientAddress());

			if (!event.locals.pb?.authStore?.model?.verified) {
				event.locals.pb.authStore.clear();
				const message = {
					type: 'error',
					message: 'please, verify your email address then login'
				};
				setFlash(message, event);
			}
		} catch (err) {
			console.error('err.data', err.data);
			if (err.data?.data?.identity?.message) {
				const message = {
					type: 'error',
					err: err.data?.data?.identity?.message,
					message: 'Your username cannot be blank'
				};
				setFlash(message, event);
				return;
			} else if (err.data?.data?.password?.message) {
				const message = {
					type: 'error',
					err: err.data?.data?.password?.message,
					message: 'Your password cannot be blank'
				};
				setFlash(message, event);
				return;
			} else {
				const message = {
					type: 'error',
					err: err.data?.message,
					message: 'wrong username or password'
				};
				setFlash(message, event);
				return;
			}
		}

		const message = { type: 'success', message: 'Login successful' };
		throw redirect('/dashboard', message, event);
	}
};
