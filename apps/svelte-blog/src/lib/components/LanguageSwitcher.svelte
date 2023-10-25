<script>
	import { _ } from 'svelte-i18n';

	import { locale } from 'svelte-i18n';

	import { writable } from 'svelte/store';

	// Create a writable store for the selected language
	let selectedLanguage = writable();

	// Function to change the language
	function changeLanguage(newLanguage) {
		selectedLanguage.set(newLanguage);
		locale.set(newLanguage);
	}
</script>

<div>
	<select bind:value={$selectedLanguage} on:change={changeLanguage($selectedLanguage)}>
		<option value="en">{$_('page.lang.english')}</option>
		<option value="nb">{$_('page.lang.norwegian')}</option>
	</select>
</div>
