<script>
	import InputWithLabel from '$lib/components/InputWithLabel.svelte';
	import { authData } from '$lib/utils/stores';
	import { compressFileImage, patchPocketbase } from '$lib/utils/api';

	/**
	 * @type {boolean}
	 */
	let updated;

	let data = {
		username: $authData.username,
		title: $authData.title,
		address: $authData.address,
		about: $authData.about,
		language: $authData.language,
		timezone: $authData.timezone,
		avatar: $authData.avatar
	};

	async function updateProfile() {
		// console.log('updateProfile from', $authData, 'to', data);
		try {
			// Convert image to compressed base64 before uploading
			const compressedImage = await compressFileImage(data.avatar, 200, 200, 0.7);
			data.avatar = compressedImage;

			const formData = new FormData();
			formData.append('data', JSON.stringify(data)); // Include the entire data object
			for (const key in data) {
				formData.append(key, data[key]);
			}

			// Exclude email and verified fields from being updated
			await patchPocketbase('users', $authData.id, formData);

			// Update authData store
			//refreshAuthPocketbase()

			// if (window){
			// 	window.location.reload()
			// }

			updated = true;
		} catch (error) {
			throw new Error('Failed to patch user.');
		}
	}

	function handleFiles(event) {
		data.avatar = event.target.files[0];
	}
</script>

<svelte:head>
	<title>Edit</title>
</svelte:head>

<div class="p-4 text-2xl font-bold">Edit</div>
<form class="w-full max-w-sm p-5">
	<InputWithLabel label="Username" bind:value={data.username} />
	<InputWithLabel label="Title" bind:value={data.title} />
	<InputWithLabel label="Address" bind:value={data.address} />
	<InputWithLabel label="Skilt" value="" />

	<div class="md:flex md:items-center mb-6">
		<div class="md:w-1/3">
			<label
				class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
				for="inline-password"
			>
				Message
			</label>
		</div>
		<div class="md:w-2/3">
			<textarea
				placeholder="Type a message..."
				bind:value={data.about}
				maxlength="100"
				class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
			/>
		</div>
	</div>

	<div class="md:flex md:items-center mb-6">
		<div class="md:w-1/3">
			<label
				class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
				for="inline-password"
			>
				Profil bilde
			</label>
		</div>
		<div class="md:w-2/3">
			<input
				class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
				type="file"
				on:change={handleFiles}
				placeholder="Your place..."
			/>
		</div>
	</div>

	<InputWithLabel label="Language" bind:value={data.language} />
	<InputWithLabel label="Timezone" bind:value={data.timezone} />

	<div class="md:flex md:items-center mb-6">
		<div class="md:w-1/3">
			<label
				class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
				for="inline-password"
			>
				Avatar
			</label>
		</div>
		<div class="md:w-2/3">
			<div
				class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
			>
				{#if $authData.verified}
					<span class="ml-2 text-success">Verified</span>
				{:else}
					<span class="ml-2 text-error">Not Verified</span>
				{/if}
			</div>
		</div>
	</div>

	<div class="md:flex md:items-center mb-6">
		<div class="md:w-2/3">
			<div class="label">
				<span
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					>{$authData.email}</span
				>
				<a href="/dashboard/profile/request-email-change" class="btn btn-secondary ml-2 float-right"
					>Request Email Change</a
				>
			</div>
		</div>
	</div>

	<div class="md:flex md:items-center">
		<div class="md:w-1/3" />
		<div class="md:w-2/3">
			<button
				class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
				disabled={updated}
				on:click={updateProfile}
			>
				{!updated ? 'Update' : 'Sent'}
			</button>
		</div>
	</div>
</form>
