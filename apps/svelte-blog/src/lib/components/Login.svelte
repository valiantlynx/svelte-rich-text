<script>
	import { pb } from '$lib/utils/api';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Oauth2 from '$lib/components/oauth/Oauth2.svelte';

	/**
	 * @type {boolean}
	 */
	let Error;
	/**
	 * @type {any}
	 */
	let errorMessage;

	onMount(async () => {
		if (pb.authStore.isValid) {
			// If the user is already logged in, redirect to the dashboard
			window.location.href = '/dashboard';
		} else {
			// If the user is not logged in, set the returned action data to local storage
			localStorage.setItem('pocketbase_auth', JSON.stringify($page.form.pocketbase_auth));
			window.location.href = '/dashboard';
		}
	});
</script>

<Toast />

{#if pb.authStore.isValid}
	<div class="relative flex flex-col items-center justify-center h-screen overflow-hidden">
		<div class="w-full p-6 border-t-4 rounded-md shadow-md border-top lg:max-w-lg">
			<h1 class="text-3xl font-semibold text-center">you are already logged in</h1>
			<form class="space-y-4">
				<button on:click={() => window.history.back()} class="btn btn-block btn-primary"
					>go back</button
				>
			</form>
		</div>
	</div>
{:else}
	<div class="relative flex flex-col items-center justify-center h-auto overflow-hidden mt-10 mx-6">
		<div class="w-full p-6 border-t-4 rounded-md shadow-md border-top border-primary lg:max-w-lg">
			<h1 class="text-3xl font-semibold text-center">Valiantlynx | login</h1>
			<form class="space-y-4" method="POST" action="/login?/login">
				<div>
					<label class="label" for="username">
						<span class="text-base label-text"
							>username <span class="text-accent"> (3-16 characters)</span></span
						>
					</label>
					<input
						name="username"
						type="text"
						placeholder="Username (3-16 characters)"
						on:input={() => (Error = false)}
						minlength="3"
						class="w-full input input-bordered input-primary"
					/>
				</div>
				<div class="card">
					<label class="label" for="password">
						<span class="text-base label-text"
							>password <span class="text-accent"> (8-16 characters)</span></span
						>
					</label>

					<input
						name="password"
						placeholder="Enter Password (8-16 characters)"
						minlength="8"
						type="password"
						on:input={() => (Error = false)}
						class="w-full input input-bordered input-primary {Error ? 'input-error' : ''}"
					/>
					<label class="label" for="password">
						<span class="label-text-alt {Error ? 'text-error' : 'hidden'}">incorrect password</span>
						<span class="label-text-alt {Error ? 'text-error' : 'hidden'}"
							>we don't have an account with this username</span
						>
					</label>
				</div>
				<h2 class=" {Error ? 'text-error' : 'hidden'}">{errorMessage}</h2>
				<br />
				<div class="flex flex-row justify-between">
					<a href="/signup" class=" justify-start link-primary link-hover my-2"
						>Not registered? Signup</a
					>
					<a href="/forgot-password" class="justify-end items-end link-secondary link-hover my-2"
						>Forgot password</a
					>
				</div>
				<div>
					<button class="btn btn-block" disabled={Error}>Login</button>
				</div>
			</form>

			<center class="text-center my-4"> or </center>
			<Oauth2 />
		</div>
	</div>
{/if}
