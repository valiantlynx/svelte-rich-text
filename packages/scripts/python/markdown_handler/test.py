from markdown_handler import MarkdownToHTMLConverter

converter = MarkdownToHTMLConverter()

md_text = """
title: Getting Started with Three.js in SvelteKit
created: 2023-08-26
tags: ['SvelteKit', 'Three.js', 'Web Development', 'Graphics']
image: '/getting-started-with-three.js-in-sveltekit/image.png'
alt: 'Getting Started with Three.js in SvelteKit'
summary: Learn how to integrate Three.js, a popular 3D graphics library, with SvelteKit to create stunning interactive 3D visuals for your web applications.
---

SvelteKit and Three.js are powerful tools that can be combined to create impressive 3D graphics and interactive experiences right in your web applications. In this tutorial, we'll walk you through the process of integrating Three.js into your SvelteKit project and creating a simple 3D scene.

## Prerequisites

Before we begin, make sure you have the following set up:

- Node.js and npm installed on your machine
- Basic understanding of SvelteKit and JavaScript

# ... (rest of the Markdown content)
"""

metadata, html_text = converter.markdown_to_html(md_text)
print('metadata:', metadata)
print('html_text:', html_text)
