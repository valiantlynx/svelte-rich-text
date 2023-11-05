// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: any;
			user?: any;
			state?: any;
			verifier?: any;
		}
		// interface Platform {}
		// interface PageData {}
	}
}

export {};
