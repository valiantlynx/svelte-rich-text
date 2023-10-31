<script>
  import MarkdownToHTMLConverter from 'markdown_handler';

  const markdownConverter = new MarkdownToHTMLConverter();

  const markdownContent = `
    # Welcome to my Markdown site!

    _Here's a list of my favorite fruits:_

    | Fruit | Rating |
    | ---   | ---    |
    | Banana | 10    |
    | Apple  | 10    |
    | Cherry | 10    |
  `;

  const { html } = markdownConverter.markdownToHTML(markdownContent);
</script>

<main class="m-5">
  <article class="prose">
    {@html html}
  </article>
</main>
