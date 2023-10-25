<script>
	import { goto } from '$app/navigation';
	import BigSearchResults from '$lib/components/BigSearchResults.svelte';
	import SmallSearchResults from '$lib/components/SmallSearchResults.svelte';
	import { metaKeywords, searchQuery } from '$lib/utils/stores';
	import { getPocketbase } from '$lib/utils/api';

	export let type = 'small';

	/**
	 * @type {any[]}
	 */
	let searchResults = [];
	let searchTerm = '';
	let selectedOption = 'Drivstoffpris';
	let selectedSearchFunction = searchDrivstoffPriser; // Initialize with the default search function

	async function searchDrivstoffPriser() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			const dataPb = {
				filter: `name~'${searchTerm}'`
			};
			const drivstoffpriser = await getPocketbase('norway_city', dataPb);
			searchResults = drivstoffpriser.items;
		} catch (error) {
			console.error(error);
		}
	}

	async function searchBensinStasjoner() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			const dataPb = {
				filter: `station~'${searchTerm}'`
			};
			const drivstoffpriser = await getPocketbase('norway_stations', dataPb);
			searchResults = drivstoffpriser.items;
		} catch (error) {
			console.error(error);
		}
	}

	async function searchDagligvarerPriser() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			const dataPb = {
				filter: `name_norwegian~'${searchTerm}'||name_english~'${searchTerm}'`
			};

			const dagligvarepriser = await getPocketbase('norway_products', dataPb);

			searchResults = dagligvarepriser.items;
		} catch (error) {
			console.error(error);
		}
	}

	async function searchDigitaltKjøleskap() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			const dataPb = {
				filter: `name~'${searchTerm}'`
			};

			const digitaltKjøleskap = await getPocketbase('shopping_list', dataPb);

			searchResults = digitaltKjøleskap.items;
		} catch (error) {
			console.error(error);
		}
	}

	async function searchHandlelista() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			const dataPb = {
				filter: `name~'${searchTerm}'`
			};

			const Handlelista = await getPocketbase('shopping_list', dataPb);

			searchResults = Handlelista.items;
		} catch (error) {
			console.error(error);
		}
	}

	async function searchMiddagsplanlegger() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			const dataPb = {
				filter: `recipe_name~'${searchTerm}'`
			};

			const middagsplanlegger = await getPocketbase('recipes', dataPb);

			searchResults = middagsplanlegger.items;
		} catch (error) {
			console.error(error);
		}
	}

	async function searchBompengekalkulator() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			const dataPb = {
				filter: `NAVN_BOMSTASJON~'${searchTerm}'`
			};

			const bompengekalkulator = await getPocketbase('norway_toll', dataPb);

			searchResults = bompengekalkulator.items;
		} catch (error) {
			console.error(error);
		}
	}

	async function searchAltlokalt() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			const dataPb = {
				filter: `name~'${searchTerm}'`
			};

			const altlokalt = await getPocketbase('norway_companies', dataPb);

			searchResults = altlokalt.items;
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * @type {number | undefined}
	 */
	let debouncedSearch;
	let lastSearchTerm = '';

	$: {
		if (searchTerm !== lastSearchTerm) {
			if (debouncedSearch) {
				clearTimeout(debouncedSearch);
			}
			debouncedSearch = setTimeout(executeSelectedSearch, 300);
			lastSearchTerm = searchTerm;
		}
	}

	/**
	 * @param {any} event
	 */
	function handleSearch(event) {
		searchTerm = event.target.value;
		searchQuery.set(searchTerm);
	}

	/**
	 * @param {any} url
	 */
	async function handleClick(url) {
		await goto(url);
		window.location.reload();
		searchTerm = '';
	}

	$: {
		if (searchResults.length > 0) {
			const keywords = searchResults.map((result) => result.title).join(', ');
			metaKeywords.set(keywords);
		}
	}

	function executeSelectedSearch() {
		if (searchTerm.trim() === '') {
			searchResults = [];
			return;
		}

		try {
			switch (selectedOption) {
				case 'Drivstoffpris':
					selectedSearchFunction = searchDrivstoffPriser;
					break;
				case 'Bensinstasjoner':
					selectedSearchFunction = searchBensinStasjoner;
					break;
				case 'Dagligvarer pris':
					selectedSearchFunction = searchDagligvarerPriser;
					break;
				case 'Digitalt kjøleskap':
					selectedSearchFunction = searchDigitaltKjøleskap;
					break;
				case 'Handlelista':
					selectedSearchFunction = searchHandlelista;
					break;
				case 'Middagsplanlegger':
					selectedSearchFunction = searchMiddagsplanlegger;
					break;
				case 'Bompengekalkulator':
					selectedSearchFunction = searchBompengekalkulator;
					break;
				case 'Altlokalt':
					selectedSearchFunction = searchAltlokalt;
					break;

				default:
					selectedSearchFunction = searchDrivstoffPriser; // Default to 'Drivstoffpris'
					break;
			}

			selectedSearchFunction();
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="max-w-screen mx-auto">
	<div class="join">
		<div>
			<div>
				<input
					class="input input-bordered input-primary join-item w-full"
					value={$searchQuery && type === 'big' ? $searchQuery : ''}
					placeholder="Search"
					on:input={handleSearch}
				/>
			</div>
		</div>
		<select
			class="select select-bordered select-primary join-item w-1/3"
			bind:value={selectedOption}
		>
			<option value="Drivstoffpris">Drivstoffpris</option>
			<option value="Bensinstasjoner">Bensinstasjoner</option>
			<option value="Dagligvarer pris">Dagligvarer pris</option>
			<option value="Digitalt kjøleskap">Digitalt kjøleskap</option>
			<option value="Handlelista">Handlelista</option>
			<option value="Middagsplanlegger" disabled>Middagsplanlegger</option>
			<option value="Bompengekalkulator">Bompengekalkulator</option>
			<option value="Altlokalt">Altlokalt</option>
		</select>

		<a href="/search" class="btn join-item btn-primary w-1/5">Search</a>
	</div>

	{#if type === 'small'}
		<SmallSearchResults {searchResults} {handleClick} bind:selectedOption />
	{:else if type === 'big'}
		<BigSearchResults {searchResults} {handleClick} />
	{/if}
</div>
