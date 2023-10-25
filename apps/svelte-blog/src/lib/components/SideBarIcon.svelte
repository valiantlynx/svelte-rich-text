<script>
	import Icon from '@iconify/svelte';
	/**
	 * @type {any}
	 */
	export let tooltip;
	/**
	 * @type {any}
	 */
	export let icon;
</script>

<div class="sidebar-icon group">
	<Icon {icon} />
	<span class="sidebar-tooltip group-hover:scale-100">
		{tooltip}
	</span>
</div>
