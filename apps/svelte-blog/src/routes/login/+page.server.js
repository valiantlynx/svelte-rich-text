/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from 'sveltekit-flash-message/server';
import { authPocketbase } from '$lib/utils/api';


/** @type {import('./$types').Actions} */
export const actions = {
	login: async (event) => {
		const data = await event.request.formData();

		const username = data.get('username');
		const password = data.get('password');

		try {
			// Authenticate the user and get the token from the server
			const res = await authPocketbase(username, password);

			// get their IP address
			// console.log('event', event.getClientAddress());

			const pocketbase_auth = {
				model: res.record,
				token: res.token
			};

			const message = { type: 'success', message: 'Login successful', pocketbase_auth };

			throw redirect(303, '/login', message, event);
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
