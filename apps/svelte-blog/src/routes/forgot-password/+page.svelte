<script>
	import Toast from '$lib/components/Toast.svelte';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';

	const flash = getFlash(page);


	let email = '';
</script>

<svelte:head>
	<title>forgot password - valiantlynx</title>
</svelte:head>

<Toast />

<div class="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8">
	<img class="mx-auto h-12 w-auto" src="/logo.png" alt="Valiant Lynx" />

	{#if !flash || flash.type !== 'success'}
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 class="mt-6 text-center text-lg font-extrabold text-base-content">
				Forgot your password?
			</h2>
			<p class="mt-5 text-sm leading-5 text-center text-base-content">
				Change your password by entering your email below.
			</p>
			<div class="mt-8 sm:rounded-sm sm:px-10">
				<form action="?/reset" method="POST" class="space-y-6">
					<label for="email" class="block text-sm font-medium leading-5 text-base-content">
						Email address
					</label>
					<div class="mt-1 rounded-sm shadow-sm">
						<input
							bind:value={email}
							id="email"
							type="email"
							name="email"
							required
							class="appearance-none relative block w-full px-3 py-2 border border-primary placeholder-accent text-base-content rounded-md focus:outline-none focus:ring-theme-500 focus:border-theme-500 focus:z-10 sm:text-sm"
						/>
					</div>
					<span class="block w-full rounded-sm shadow-sm">
						<button type="submit" class="w-full btn btn-primary">
							<span class="absolute left-0 inset-y pl-3" />
							Request password reset
						</button>
					</span>
				</form>
				<div class="mt-6">
					<div class="relative">
						<div class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-primary" />
						</div>
						<div class="relative flex justify-center text-sm leading-5">
							<span class="px-2 bg-primary text-primary-content"> Remembered your password? </span>
						</div>
					</div>
				</div>
				<div class="mt-6 justify-center items-center">
					<span class="block w-full rounded-sm shadow-sm">
						<span class="w-full inline-flex rounded-sm shadow-sm justify-center items-center">
							<a href="/login" class="btn btn-primary">Back to login</a>
						</span>
					</span>
				</div>
			</div>
		</div>
	{:else if flash.type === 'success'}
		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="max-w-md w-full mx-auto rounded-sm px-8 pt-6 pb-8 mb-4 mt-8">
				<h2 class="text-xl font-black">
					<h2 class="mt-6 text-center text-lg font-extrabold text-base-content">
						Request received
					</h2>
				</h2>
				<div class="my-4 leading-tight">
					<p class="mt-2 text-center text-sm leading-5 text-base-content max-w">
						We have sent you an email with a link to reset your password.
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
