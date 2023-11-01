import { redirect, setFlash } from 'sveltekit-flash-message/server';

/** @type {import('./$types').Actions} */
export const actions = {
	signup: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const email = data.get('email');
		

		const pbData = {
			username,
			email,
			emailVisibility: true,
			password,
			passwordConfirm: password
		};

		try {
			await event.locals.pb.collection('users_valiantlynx').create(pbData);
			await event.locals.pb.collection('users_valiantlynx').requestVerification(pbData.email);

			const message = {
				type: 'success',
				message: 'User Created successfully. please, proceed to the login page'
			};
			throw redirect(303, '/login', message, event);
		} catch (err) {
			console.error(err);
			console.error(err.data);
			if (err.data.data.username?.code) {
				if (!pbData.username) {
					const message = {
						type: 'error',
						message: 'Your username cannot be blank'
					};

					setFlash(message, event);
				}

				const message = {
					type: 'error',
					message: 'Username already exist'
				};

				setFlash(message, event);
			} else if (err.data.data.password?.code) {
				if (!pbData.password) {
					const message = {
						type: 'error',
						message: 'Your password cannot be blank'
					};

					setFlash(message, event);
				}
				const message = {
					type: 'error',
					message: 'Your password must be at least 8 characters'
				};
				setFlash(message, event);
			} else if (err.data.data.passwordConfirm?.code) {
				if (!pbData.passwordConfirm) {
					const message = {
						type: 'error',
						err: err.response?.data.passwordConfirm?.message,
						message: 'Your passwordConfirm cannot be blank'
					};

					setFlash(message, event);
				}
				const message = {
					type: 'error',
					message: 'Your passwordConfirm must be at least 8 characters'
				};

				setFlash(message, event);
			} else if (pbData.passwordConfirm !== pbData.password) {
				const message = {
					type: 'error',
					message: 'Your passwordConfirm does not match your password'
				};
				setFlash(message, event);
			} else if (err.data.data.email?.code) {
				if (!pbData.email) {
					const message = {
						type: 'error',
						message: 'Your email cannot be blank'
					};
					setFlash(message, event);
				}

				const message = {
					type: 'error',
					message: err.data.data.email?.message
				};

				setFlash(message, event);
			} else {
				const message = {
					type: 'error',
					err: err.response?.message,
					message:
						'something went wrong with your signup. please try again or contact support through the feedback button'
				};
				setFlash(message, event);
			}
		}
	}
};
