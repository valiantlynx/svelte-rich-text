<script>
    import { marked } from "marked";
  
    const content = 
    `
    # Welcome to my Markdown site! 
  
    _Here's a list of my favorite fruits:_
  
      | Fruit | Rating |
      | --- | --- |
      | Banana | 10 |
      | Apple | 10 |
      | Cherry | 10 |
      `;
  </script>
  
  <main class="m-5">
    <article class="prose">
      {@html marked.parse(content)}
    </article>
  </main>