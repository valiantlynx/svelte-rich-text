<script>
	import Login from '$lib/components/Login.svelte';
	import { page } from '$app/stores';
	export let form;
</script>

<svelte:head>
	<title>login</title>
	<meta name="description" content="login to this app" />
</svelte:head>

<Login />
