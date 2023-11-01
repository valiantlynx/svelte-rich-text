<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { onMount } from "svelte";
  import "@splidejs/svelte-splide/css";
  import "./splide-override.css";
  import { page } from "$app/stores";

  const blogs = $page.data.blogs;

  // set up placeholder images
  let images = [];
  const url = "https://picsum.photos/800/450?random=";
  for (let i = 1; i <= 10; i++) {
    images.push(url + i);
  }

  // set up carousel config
  const mainOptions = {
    pagination: true,
    type: "loop",
    autoplay: true,
  };
  const thumbsOptions = {
    arrows: false,
    focus: "center",
    gap: 5,
    isNavigation: true,
    pagination: false,
    perMove: 1,
    perPage: 4,
    type: "loop",
    updateOnMove: true,
  };

  // sync carousels
  let main;
  let thumbs;
  onMount(() => {
    if (main && thumbs) {
      main.sync(thumbs.splide);
    }
  });
</script>

<div class="gallery">
  <div class="gallery--main">
    <Splide 
      bind:this={main} 
      options={ mainOptions }
    >
      {#each blogs.items as blog}
        <SplideSlide>
          <div class="blog-hero">
            <img src={blog?.image} alt={blog?.alt} />
            <div class=" absolute p-10 bg-secondary text-secondary-content bg-opacity-75 bottom-5 left-5 right-5 rounded-md">
              <h2 class="text-2xl font-bold text-secondary-content">
              {blog.title}</h2>
              <p class="text-base font-normal text-secondary-content my-4">
                {blog.summary}</p>
              <a href={`/${blog.slug}`} class="btn btn-primary">Read More</a>
            </div>
          </div>
        </SplideSlide>
      {/each}
    </Splide>
  </div>

  <div class="gallery--thumbs">
    <Splide 
      id="gallery--thumbs"
      bind:this={thumbs} 
      options={ thumbsOptions }
    >
      {#each blogs.items as blog}
        <SplideSlide>
          <img src={blog?.image} alt={blog?.alt}/>
        </SplideSlide>
      {/each}
    </Splide>
  </div>
</div>

<style>
  .gallery {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    margin: 0 auto;
    max-width: 115rem;
    min-height: 200px;
  }

  .blog-hero {
    position: relative;
  }

  .blog-hero img {
    width: 100%;
    height: 720px; /* Set an appropriate height for your hero images */
    object-fit: cover;
  }


</style>
