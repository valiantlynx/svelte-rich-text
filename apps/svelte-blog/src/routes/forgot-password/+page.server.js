import { redirect, setFlash } from 'sveltekit-flash-message/server';

/** @type {import('./$types').Actions} */
export const actions = {
	reset: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');

		try {
			// Authenticate the user and get the token from the server
			await event.locals.pb.collection('users_valiantlynx').requestPasswordReset(email);

			const message = {
				type: 'success',
				message: 'Reset link sent'
			};

			setFlash(message, event);
			return;
		} catch (err) {
			if (err.response?.data.identity?.message) {
				const message = {
					type: 'error',
					err: err.response?.data.identity?.message,
					message: 'Your email cannot be blank'
				};
				throw redirect(message, event);
			} else {
				const message = {
					type: 'error',
					err: err.response?.message,
					message: 'something went wrong'
				};
				throw redirect(message, event);
			}
		}
	}
};
