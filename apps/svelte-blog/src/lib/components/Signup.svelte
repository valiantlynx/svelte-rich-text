<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Toast from './Toast.svelte';
	import Oauth2 from './oauth/Oauth2.svelte';

	/**
	 * @type {boolean}
	 */
	let Error;
	/**
	 * @type {any}
	 */
	let errorMessage = $page.form == null ? '' : $page.form.message;

	onMount(async () => {
		if ($page.form.success) {
			window.location.href = '/login';
		}
	});
</script>

<Toast />

<div class="relative flex flex-col items-center justify-center h-full overflow-hidden m-4">
	<div
		class="w-full p-6 bg-base-200 border-t-4 border-primary rounded-md shadow-md border-top lg:max-w-lg"
	>
		<h1 class="text-3xl font-semibold text-center">AnimeVariant</h1>
		<form class="space-y-4" method="POST" action="/signup?/signup">
			<div>
				<label class="label" for="username">
					<span class="text-base label-text"
						>Username <span class="text-accent"> (3-16 characters)</span></span
					>
				</label>
				<input
					type="text"
					name="username"
					placeholder="Username (3-16 characters)"
					on:input={() => (Error = false)}
					minlength="3"
					maxlength="16"
					class="input input-bordered input-primary w-full{Error ? 'input-error' : ''}"
				/>
				<label class="label" for="password">
					<span class="label-text-alt {Error ? 'text-error' : 'hidden'}"
						>We might already have a user registered with this username</span
					>
				</label>
			</div>
			<div>
				<label class="label" for="password">
					<span class="text-base label-text"
						>Password <span class="text-accent"> (8-16 characters)</span></span
					>
				</label>

				<input
					type="password"
					name="password"
					placeholder="Enter Password (8-16 characters)"
					on:input={() => (Error = false)}
					minlength="8"
					class="input input-bordered w-full input-primary"
				/>
			</div>
			<div>
				<label class="label" for="password">
					<span class="text-base label-text"
						>Confirm Password <span class="text-accent"> (identical to password)</span></span
					>
				</label>

				<input
					type="password"
					name="passwordConfirm"
					placeholder="Enter Password Again  (identical to password)"
					on:input={() => (Error = false)}
					minlength="8"
					class="input input-bordered w-full input-primary {Error ? 'input-error' : ''}"
				/>
				<label class="label" for="password">
					<span class="label-text-alt {Error ? 'text-error' : 'hidden'}"
						>Is this your confirm password identical to your password?
					</span>
				</label>
			</div>
			<div>
				<label class="label" for="email">
					<span class="text-base label-text">Email</span>
				</label>
				<input
					on:input={() => (Error = false)}
					type="email"
					name="email"
					placeholder="info@site.com (valid email)"
					class="input input-bordered w-full input-primary {Error ? 'input-error' : ''}"
				/>
				<label class="label" for="password">
					<span class="label-text-alt {Error ? 'text-error' : 'hidden'}"
						>We might already have a user registered with this email</span
					>
				</label>
			</div>

			<h2 class=" {Error ? 'text-error' : 'hidden'}">{errorMessage} Please try again</h2>
			<br />
			<a href="/login" class=" link link-hover font-bold text-1xl underline"
				>Already registered? Login (click here)</a
			>

			<div>
				<button class="btn btn-block btn-primary" disabled={Error}>Sign up</button>
			</div>
		</form>
		<center class="text-center my-4"> or </center>
		<Oauth2 />
	</div>
</div>
