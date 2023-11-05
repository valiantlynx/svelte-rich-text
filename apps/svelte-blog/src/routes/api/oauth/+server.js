/* eslint-disable no-console */
import { error, redirect } from '@sveltejs/kit';


export const GET = async (event) => {
    console.log("in +server.js",event.cookies.getAll());
    const redirectURL = `${event.url.origin}/api/oauth`;

    const expectedState = event.cookies.get('state');
    const expectedVerifier = event.cookies.get('verifier');

    console.log('expected state',expectedState)
    console.log('expected code',expectedVerifier)

    const state = await event.url.searchParams.get('state');
    const code = await event.url.searchParams.get('code');

    console.log('returned state',state)
    console.log('returned code',code)

    //as a side effect this will generate a new code verifier, hence why we need to pass the verifier back in through the cookie
    const authMethods = await event.locals.pb?.collection('users_valiantlynx').listAuthMethods();

    console.log('authMethods-------',authMethods)

    if (!authMethods?.authProviders) {
        throw error(404, 'No Auth Providers');
    }
    const provider = authMethods.authProviders[0];
    if (!provider) {
        throw error(404, 'Provider Not Found');
    }

    if (expectedState !== state) {
        throw error(400, 'Returned State Does not Match Expected: ' + expectedState + ' ' + state);
    }

    try {
        console.error("provider.name",provider)
        console.log('returned state',state)
        console.log('returned code',code)
        const res = await event.locals.pb?.collection('users_valiantlynx')
            .authWithOAuth2Code(provider.name, code, expectedVerifier, redirectURL,{name:'My Awesome User'});
        console.log('res',res)

    } catch (err) {
        console.error("err",err);
        console.error("err.data",err.data);
        throw error(err.status, err.message);
    }

    throw redirect(303, '/dashboard');
};