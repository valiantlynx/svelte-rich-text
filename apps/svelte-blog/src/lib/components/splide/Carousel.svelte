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
        console.log({ main, thumbs });
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
      {#each blogs as blog}
          <SplideSlide>
            <img src={blog?.image} alt={blog?.alt} /> <!-- width="100%" height="100%" -->
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
        {#each blogs as blog}
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
  </style>