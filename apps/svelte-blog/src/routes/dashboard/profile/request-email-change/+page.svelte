<script>
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { pb } from '$lib/utils/api';
	import { authData } from '$lib/utils/stores';

	/**
	 * @type {string}
	 */
	let newEmail;
	let emailChangeRequested = false;

	async function requestEmailChange() {
		try {
			await pb.collection('users').requestEmailChange(newEmail, pb.authStore.token);
			emailChangeRequested = true;
		} catch (error) {
			console.error('Failed to request email change:', error);
		}
	}
</script>

<svelte:head>
	<title>Email Change</title>
</svelte:head>

<p>Email Change Request</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-7">
	<div class="md:flex md:items-center mb-6">
		<InputWithLabel label="Current Email" bind:value={$authData.email} />
		<InputWithLabel label="New Email" bind:value={newEmail} />
	</div>
	<div class="md:flex md:items-center mb-6">
		<button
			class="btn outline border"
			disabled={emailChangeRequested}
			on:click={requestEmailChange}
		>
			{#if emailChangeRequested}
				Email Change Requested
			{:else}
				Request Email Change
			{/if}
		</button>
	</div>
</div>
