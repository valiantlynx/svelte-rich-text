<!-- MarkdownConverter.svelte -->

<script>
  import { onMount } from "svelte";
  import { exec } from "child_process";

  export let markdown;
  let metadata = {};
  let htmlContent = "";

  function convertMarkdownToHTML() {
    console.log("Converting markdown to HTML");
    const pythonProcess = exec("python -c 'import markdown_handler.markdown_handler as mdh; c = mdh.MarkdownToHTMLConverter(); metadata, htmlContent = c.markdown_to_html(\"" + markdown + "\"); print(metadata, htmlContent)'", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      // Parse the stdout to extract metadata and HTML content
      [metadata, htmlContent] = stdout.trim().split(" ", 1);
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  onMount(() => {
    // Fetch initial content or perform any other setup
  });
</script>

<main>
  <textarea bind:value={markdown} rows="10" cols="50"></textarea>
  <button on:click={convertMarkdownToHTML} class="">Convert Markdown</button>
  <div>
    <h2>Metadata:</h2>
    <pre>{JSON.stringify(metadata, null, 2)}</pre>
    <h2>HTML Content:</h2>
    {@html htmlContent}
  </div>
</main>
