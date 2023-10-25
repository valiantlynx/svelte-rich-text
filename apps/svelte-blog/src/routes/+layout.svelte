<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Feedback from '$lib/components/feedback/Feedback.svelte';

	import '../app.css';
</script>

<svelte:head />

<Nav />
<slot />
<Feedback />
<Footer />
