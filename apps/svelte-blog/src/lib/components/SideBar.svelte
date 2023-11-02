<script>
	import SideBarIcon from './SideBarIcon.svelte';
	import { logoutPocketbase } from '$lib/utils/api';
	import { page } from '$app/stores';
</script>

<div
	class="relative top-0 left-0 w-16 h-screen bg-base-200 m-0 flex flex-col text-base-content shadow"
>
	<a href="/"><SideBarIcon tooltip="Home" icon="bx:bx-home" /></a>
	<a href="/dashboard/profile"> <SideBarIcon tooltip="Profile" icon="iconoir:profile-circle" /></a>
	<a href="/dashboard/settings"><SideBarIcon tooltip="Settings" icon="bx:bx-cog" /></a>
	{#if $page.data.user?.role.includes('admin')}
		<a href="/dashboard/admin"><SideBarIcon tooltip="Admin" icon="bx:bx-shield" /></a>
	{/if}
	{#if $page.data.user?.role.includes('editor')}
		<a href="/dashboard/manager"><SideBarIcon tooltip="Manage" icon="material-symbols:bookmark-manager" /></a>
	{/if}

	<button on:click={logoutPocketbase}><SideBarIcon tooltip="Logout" icon="bx:bx-log-out" /></button>
</div>
