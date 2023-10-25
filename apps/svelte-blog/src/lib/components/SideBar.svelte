<script>
	import SideBarIcon from './SideBarIcon.svelte';
	import { logoutPocketbase } from '$lib/utils/api';
</script>

<div
	class="relative top-0 left-0 w-16 h-screen bg-base-200 m-0 flex flex-col text-base-content shadow"
>
	<a href="/"><SideBarIcon tooltip="Home" icon="bx:bx-home" /></a>
	<a href="/dashboard/profile"> <SideBarIcon tooltip="Profile" icon="iconoir:profile-circle" /></a>
	<a href="/dashboard/settings"><SideBarIcon tooltip="Settings" icon="bx:bx-cog" /></a>
	<a href="/dashboard/manager"
		><SideBarIcon tooltip="Upload" icon="material-symbols:bookmark-manager" /></a
	>
	<button on:click={logoutPocketbase}><SideBarIcon tooltip="Logout" icon="bx:bx-log-out" /></button>
</div>
