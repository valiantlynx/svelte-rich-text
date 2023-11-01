<script>
	import Login from '$lib/components/Login.svelte';
	import { page } from '$app/stores';
	import SideBar from '$lib/components/SideBar.svelte';
	import Toast from '$lib/components/Toast.svelte';
</script>

<Toast />

{#if $page.data.user}
	<div class="flex">
		<SideBar />
		<slot />
	</div>
{:else}
	<div class="w-screen justify-center">
		<h1 class="text-center font-bold text-warning text-3xl pt-16">
			Please login to use the dashboard
		</h1>
		<Login />
	</div>
{/if}
