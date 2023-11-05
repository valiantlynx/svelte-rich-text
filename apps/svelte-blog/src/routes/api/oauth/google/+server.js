/* eslint-disable no-console */
import { redirect } from '@sveltejs/kit';
import { authData } from '$lib/utils/stores';

export const GET = async ({ locals, url, cookies }) => {
    console.log('GET', cookies.getAll());
	const redirectUrl = `${url.origin}/api/oauth/google`;
	const expectedState = cookies.get('googleAuthState');
	const expectedVerifier = cookies.get('googleAuthVerifier'); //! everytime the listAuthMethods is called, the verifier changes. so we cant get the verifier pocketbase function hook. cause it will be different from the one we saved in the cookie from the action hook

    console.log('expectedState', expectedState);
    console.log('expectedVerifier', expectedVerifier);

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

    console.log('state', state);
    console.log('code', code);

	const authMethods = await locals.pb?.collection('users_valiantlynx').listAuthMethods(); //generates a state and a NEW verifier
	if (!authMethods?.authProviders) {
		console.error('no auth Providers');
		throw redirect(302, '/signup');
	}

	const googleAuthProvider = authMethods.authProviders.find(
		(provider) => provider.name === 'google'
	);
	if (!googleAuthProvider) {
		console.error('Provider not found');
		throw redirect(302, '/signup');
	}

	if (expectedState !== state) {
		console.error('state mismatch', expectedState, state);
		throw redirect(302, '/signup');
	}

	try {
		const res = await locals.pb
			?.collection('users_valiantlynx')
			.authWithOAuth2Code(googleAuthProvider.name, code, expectedVerifier, redirectUrl); // the object will reset the properties on that user when they are created on pocketbase
		await locals.pb.collection('users_valiantlynx').authRefresh();
        
		console.log(locals.pb.authStore.isValid);
		console.log(locals.pb.authStore.token);
		console.log(locals.pb.authStore.model.id);
		authData.set(res.record);
	} catch (e) {
		console.log('Error Signing up with google auth', e, e.message);
	}

	// redirect the response to the home page
	throw redirect(302, '/');
};
