<script lang="ts">
	import { data } from '../../utils/stores.js';
	import { type SvelteComponent, type ComponentType, setContext } from 'svelte';
	import ViewImage from '../viewBlocks/viewImage.svelte';
	import ViewCode from '../viewBlocks/viewCode.svelte';
	import ViewHeader from '../viewBlocks/viewHeader.svelte';
	import ViewList from '../viewBlocks/viewList.svelte';
	import ViewParagraph from '../viewBlocks/viewParagraph.svelte';
	import ViewQuote from '../viewBlocks/viewQuote.svelte';
	import type { dataBlock, languages } from '../../utils/consts.js';
	import ViewMode from './viewMode.svelte';
	import EditMode from './editMode.svelte';

	// exports
	export let initialData: dataBlock[] = [];
	export let viewMode = false;
	export let headerFont = `Verdana, sans-serif`;
	export let bodyFont = `Helvetica, sans-serif`;
	export let primaryColor = '#3366FF';
	export let secondaryColor = '#1eeb36';
	export let textColor = '#121212';
	export let bgColor = '#ffffff';
	export let blocksGap = 10;
	export let marginBlock = 30;
	export let h1 = 'clamp(1.8rem, calc(1.8rem + ((1vw - 0.48rem) * 0.9722)), 2.1rem)';
	export let h2 = 'clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.9722)), 1.8rem)';
	export let h3 = 'clamp(1.2rem, calc(1.2rem + ((1vw - 0.48rem) * 0.9722)), 1.5rem)';
	export let h4 = 'clamp(1.125rem, calc(1.15rem + ((1vw - 0.48rem) * 0.3472)), 1.2rem)';
	export let body = 'clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem)';
	export let small = 'clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) * 0.1736)), 1rem)';
	export let lh1 = '1.3';
	export let lh2 = '1.35';
	export let lh3 = '1.4';
	export let lh4 = '1.5';
	export let lbody = '1.6';
	export let customImage: ComponentType<
		SvelteComponent<{ base64: string; name: string; caption: string }>
	> = ViewImage;
	export let customCode: ComponentType<SvelteComponent<{ text: string; lang: languages }>> =
		ViewCode;
	export let customList: ComponentType<
		SvelteComponent<{ items: string[]; type: 'ordered' | 'unordered' }>
	> = ViewList;
	export let customHeader: ComponentType<SvelteComponent<{ text: string; level: 1 | 2 | 3 | 4 }>> =
		ViewHeader;
	export let customParagraph: ComponentType<SvelteComponent<{ text: string }>> = ViewParagraph;
	export let customQuote: ComponentType<SvelteComponent<{ text: string; owner: string }>> =
		ViewQuote;
		export let codeBlockLanguages: languages[] = [
    'actionscript',
    'angular', // For Angular templates
    'assembly',
    'bash',
    'c',
    'clojure',
    'cobol',
    'cpp', // C++
    'csharp', // C#
    'css',
    'dart',
    'dockerfile',
    'elixir',
    'elm',
    'erlang',
    'fortran',
    'fsharp', // F#
    'graphql',
    'groovy',
    'haskell',
    'html',
    'java',
    'javascript',
    'json',
    'julia',
    'kotlin',
    'less',
    'lua',
    'markdown',
    'matlab',
    'nim',
    'nodejs',
    'objective-c',
    'ocaml',
    'pascal',
    'perl',
    'php',
    'plaintext',
    'powershell',
    'python',
    'r',
    'react', // JSX
    'reason', // ReasonML
    'ruby',
    'rust',
    'sass',
    'scala',
    'scheme',
    'shell', // General shell scripting
    'sql',
    'stylus',
    'svelte',
    'swift',
    'toml',
    'typescript',
    'vbnet', // Visual Basic .NET
    'vue',
    'wasm', // WebAssembly
    'xml',
    'yaml'
];


	// context setup
	setContext('Image', customImage);
	setContext('Code', customCode);
	setContext('Header', customHeader);
	setContext('Paragraph', customParagraph);
	setContext('List', customList);
	setContext('Quote', customQuote);
	setContext('languages', codeBlockLanguages);

	data.set(initialData);
</script>

<div
	class="main"
	style:--primaryColor={primaryColor}
	style:--secondaryColor={secondaryColor}
	style:--textColor={textColor}
	style:--headingFont={headerFont}
	style:--bodyFont={bodyFont}
	style:--bgColor={bgColor}
	style:--h1={h1}
	style:--h2={h2}
	style:--h3={h3}
	style:--h4={h4}
	style:--body={body}
	style:--small={small}
	style:--lh1={lh1}
	style:gap="{blocksGap}px"
	style:--lh2={lh2}
	style:--lh3={lh3}
	style:--lh4={lh4}
	style:--lbody={lbody}
	style:margin-block="{marginBlock}px"
>
	{#if viewMode}
		<ViewMode />
	{:else}
		<EditMode />
	{/if}
</div>

<style>
	.main {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.main :global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	.main :global(h1),
	.main :global(h2),
	.main :global(h3),
	.main :global(h4) {
		font-family: var(--headingFont);
		font-weight: bold;
		color: var(--textColor);
		word-break: break-word;
	}
	.main :global(h1) {
		font-size: var(--h1);
		line-height: var(--lh1);
	}
	.main :global(h2) {
		font-size: var(--h2);
		line-height: var(--lh2);
	}
	.main :global(h3) {
		font-size: var(--h3);
		line-height: var(--lh3);
	}
	.main :global(h4) {
		font-size: var(--h4);
		line-height: var(--lh4);
	}

	.main :global(span),
	.main :global(li),
	.main :global(p),
	.main :global(i),
	.main :global(label) {
		word-break: break-word;
		font-family: var(--bodyFont);
		font-size: var(--body);
		font-weight: 400;
		line-height: var(--lbody);
	}
</style>
