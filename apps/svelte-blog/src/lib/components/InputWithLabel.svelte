<script>
	/**
	 * @type {any}
	 */
	export let value;
	/**
	 * @type {any}
	 */
	export let label;
</script>

<div class="md:flex md:items-center mb-6">
	<div class="md:w-1/3">
		<label
			class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
			for="inline-password"
		>
			{label}
		</label>
	</div>
	<div class="md:w-2/3">
		<input
			class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
			id="inline-password"
			type="text"
			bind:value
			placeholder="Your place..."
		/>
	</div>
</div>
