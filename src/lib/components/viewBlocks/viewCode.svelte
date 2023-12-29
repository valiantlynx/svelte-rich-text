<script lang="ts">
    import type { languages } from '../../utils/consts';
    import { onMount } from 'svelte';
    import CopyIcon from '../icons/copyIcon.svelte';
    import DoneIcon from '../icons/doneIcon.svelte';

    export let text: string;
    export let lang: languages;
    let formattedCode = '';

    let copyStatement: boolean = false;

    async function copyCode(e: MouseEvent) {
        e.preventDefault();
        navigator.clipboard.writeText(text);
        copyStatement = true;
        await new Promise((res) => setTimeout(res, 800));
        copyStatement = false;
    }
    
    onMount(() => {
        formattedCode = addLineNumbersAndEscapeHtml(text);
    });

    function addLineNumbersAndEscapeHtml(code) {
        return code.split('\n').map((line, index) => {
            const escapedLine = escapeHtml(line);
            return `<span class="line-number">${index + 1}</span>${escapedLine}`;
        }).join('\n');
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

</script>



<svelte:head>
    <!-- Include Prism.js and its CSS theme for syntax highlighting -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-okaidia.min.css" />
</svelte:head>

<div id="outer-container">
    <div id="code-snippet-container">
        <div id="padding-container">
            <div id="title-bar">
                <span id="title">{lang}</span>
                <button id="copy-button" on:click|stopPropagation={copyCode}>
                    {#if !copyStatement}
                        <CopyIcon />
                    {:else}
                        <DoneIcon />
                    {/if}
                </button>
            </div>
        </div>
        <div id="code-content">
            <pre class="language-{lang}"><code id="code-text">{@html formattedCode}</code></pre>
        </div>
    </div>
</div>

<style>
    #outer-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #code-snippet-container {
        margin: 2rem auto; /* Increased margin for better spacing */
        background-color: #1F2937; /* Dark background for contrast */
        border-radius: 0.5rem; /* Rounded edges */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
        overflow: hidden;
    }

    #padding-container {
        padding: 1rem;
        background-color: #2c3e50; /* Slightly different shade for the header */
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }

    #title-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #title {
        color: #E5E7EB;
        font-size: 1.25rem;
        font-weight: bold;
    }

    #copy-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        color: white;
        background-color: #14B8A6;
        border-radius: 0.25rem;
        transition: background-color 0.3s;
    }

    #copy-button:hover {
        background-color: #0D9488;
    }

    #copy-button:focus {
        outline: none;
        box-shadow: 0 0 0 3px #F87171;
    }

    #code-content {
        position: relative;
        padding: 1rem;
        background-color: #1F2937;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        overflow: auto; /* Enable scrolling within this container */
        max-height: 500px; /* Adjust max height as necessary */
    }

    #code-text {
        font-size: 0.875rem;
        white-space: pre-wrap;
        color: #E5E7EB; /* Light text for readability */
        tab-size: 4; /* Adjust tab size for code indentation */
    }

    .line-number {
        display: inline-block;
        width: auto; /* Adjust width as needed */
        text-align: right;
        margin-right: 16px; /* Ensure spacing between line numbers and code */
        color: #888;
        user-select: none;
        /* Other styles... */
    }

    @media (max-width: 768px) {
        #title {
            font-size: 1rem;
        }
        #code-text {
            font-size: 0.75rem;
        }
    }
</style>
