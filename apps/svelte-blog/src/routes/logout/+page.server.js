import { redirect } from 'sveltekit-flash-message/server';

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

			if (!event.locals.user.token) {
				const message = {
					type: 'error',
					message: 'wrong username or password'
				};
				throw redirect(message, event);
			}


			const message = { type: 'success', message: 'Login successful'};

			throw redirect(303, '/dashboard', message, event);
		} catch (err) {
			if (err.response?.data.identity?.message) {
				const message = {
					type: 'error',
					err: err.response?.data.identity?.message,
					message: 'Your username cannot be blank'
				};
				throw redirect(message, event);
			} else if (err.response?.data.password?.message) {
				const message = {
					type: 'error',
					err: err.response?.data.password?.message,
					message: 'Your password cannot be blank'
				};
				throw redirect(message, event);
			} else {
				const message = {
					type: 'error',
					err: err.response?.message,
					message: 'wrong username or password'
				};
				throw redirect(message, event);
			}
		}
	}
};
