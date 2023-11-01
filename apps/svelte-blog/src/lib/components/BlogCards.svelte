<script>
	import { page } from '$app/stores';
	const blogs = $page.data.blogs;
</script>

<div class="flex flex-wrap -m-4 p-10">
	{#each blogs as blog (blog.id)}
	  <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
		<!-- Blog Card Component -->
		<div class="bg-primary border rounded-lg p-4 shadow-md hover:shadow-lg text-primary-content">
		  <img src={blog.image} alt={blog.title} class="w-full h-48 object-cover rounded-lg">
		  <h2 class="text-xl font-bold mt-4">{blog.title}</h2>
		  <p class=" text-sm mt-2">{blog.summary}</p>
		  <a href={`/${blog.slug}`} class="mt-4 block font-bold hover:cursor-pointer hover:underline hover:text-secondary">Read more</a>
		</div>
	  </div>
	{/each}
  </div>
  