<script>
	import { page } from '$app/stores';
</script>

<div class="p-4 md:p-8 lg:p-12 flex justify-center">
	<div class="w-3/4">
		<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
			{$page.data.blog?.title}
		</h1>
		<img
			src={$page.data.blog?.image}
			alt={$page.data.blog?.title}
			class="w-full h-auto rounded-lg mb-4"
		/>
		<p class="prose mb-4">{@html $page.data.blog?.content}</p>
		<p class="text-sm text-gray-600">Tags: {$page.data.blog?.tags}</p>
	</div>
</div>
