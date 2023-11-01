<script>
	import { page } from '$app/stores';
  const blog = $page.data.blog;
</script>

<div class="p-4 md:p-8 lg:p-12 flex justify-center">
	<div class="w-3/4">
		<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
			{blog?.title}
		</h1>
		<img
			src={blog?.image}
			alt={blog?.title}
			class="w-full h-auto rounded-lg mb-4"
		/>

    <p class="text-sm text-accent">By: {blog?.author}</p>

    <p class="text-sm text-accent">Published: {blog?.created}</p>

    <p class="text-sm text-accent">Updated: {blog?.updated}</p>

    <div class="mt-4 progress-primary html-content">
    {@html clean}
    </div>

		<p class="text-sm text-secondary">Tags: {blog?.tags}</p>
	</div>
</div>

