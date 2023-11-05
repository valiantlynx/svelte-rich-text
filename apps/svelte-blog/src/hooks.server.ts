import PocketBase from 'pocketbase';
import { site } from '$lib/config/site';
import { serializeNonPOJOs } from '$lib/utils/api';

/** @type {import('@sveltejs/kit').Handle} */ 
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(site.pocketbase);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users_valiantlynx').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (_) {
		await event.locals.pb.authStore.clear();
		event.locals.user = undefined;

	}

	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	return response;
};

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {
	if (request.url.startsWith(event.url.href)) {
		request.headers.set('cookie', event.request.headers.get('cookie'));
	}

	return fetch(request);
}