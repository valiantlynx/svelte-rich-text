<script>
	import SideBar from '$lib/components/SideBar.svelte';
	import Toast from '$lib/components/Toast.svelte';
</script>

<Toast />

<div class="flex">
	<SideBar />
	<slot />
</div>
