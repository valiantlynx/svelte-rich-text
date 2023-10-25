<!-- Markdown to Rich Text Conversion -->
<script>
    import { onMount } from "svelte";
    import {marked} from "marked";
    import { postPocketbase } from "$lib/utils/api";
  
    let richTextContent = ""; // Initialize with an empty string

    
  
    async function convertMarkdownToRichText() {
      const response = await fetch("./+page.svelte.md");
      const markdownContent = await response.text();
  
      // Convert the Markdown to HTML using your preferred library
      // Example: You can use `marked` library (make sure to import it)
      const htmlContent = marked(markdownContent);
  
      // Set the rich text content
      richTextContent = htmlContent;

        // Post the rich text content to Pocketbase
        const data = {
            "content": richTextContent,
            "title": "Test Blog",
            "author": "Test Author",
            "tags": ["test", "blog"]
            
        }
        const pbResponse = await postPocketbase('blogs', data);
        console.log(pbResponse);
    }
  
    onMount(convertMarkdownToRichText);
  </script>
  
  <!-- Display Rich Text using SvelteKit -->
  <div>
    {@html richTextContent}
  </div>
  
  