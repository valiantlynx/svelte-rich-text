import PocketBase from 'pocketbase';
import { site } from '$lib/config/site';


/** @type {import('@sveltejs/kit').Handle} */ 
export async function handle({ event, resolve }) {
   
    await pocketbase({ event, resolve });
    const response = await resolve(event);
    return response;
}

export async function pocketbase({ event, resolve }) {
    event.locals.pb = new PocketBase(site.pocketbase);
    const response = await resolve(event);
    return response;
}
