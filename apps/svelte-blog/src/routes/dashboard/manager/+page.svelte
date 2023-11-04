<script>
	import MyProjectItem from '$lib/components/MyProjectItem.svelte';
	export let data;
</script>

<div class="w-full mt-4 flex flex-col items-center m-3">
	<h2 class="text-3xl font-bold w-full">My Projects</h2>
	{#if data.projects.length === 0}
		<p class="text-center text-3xl">☹️</p>
		<p class="text-center text-3xl">Looks like you don't have any projects.</p>
		<a href="/projects/new" class="btn btn-primary max-w-md mt-4">Add One</a>
	{:else}
		{#each data.projects as project}
			<MyProjectItem {project} />
			<div class="divider mt-0 mb-2" />
		{/each}
	{/if}
</div>

<div class="w-full mt-4 flex flex-col items-center">
	<h2 class="text-3xl font-bold w-full">My Blogs (under construction)</h2>
	{#if data.projects.length === 0}
		<p class="text-center text-3xl">☹️</p>
		<p class="text-center text-3xl">Looks like you don't have any blogs.</p>
		<a href="/projects/new" class="btn btn-primary max-w-md mt-4">Add One</a>
	{:else}
		{#each data.projects as project}
			<MyProjectItem {project} />
			<div class="divider mt-0 mb-2" />
		{/each}
	{/if}
</div>