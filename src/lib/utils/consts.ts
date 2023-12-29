import type { ComponentType, SvelteComponent } from 'svelte';

export type blocks = 'image' | 'code' | 'quote' | 'paragraph' | 'header' | 'list' | 'space';

// *TODO: add links and bold text
// *TODO: add pdf files and tables

export type dataBlock =
	| { name: 'image'; id: string; data: { base64: string; name: string; caption: string } }
	| { name: 'paragraph'; id: string; data: { text: string } }
	| { name: 'code'; id: string; data: { text: string; lang: languages } }
	| { name: 'quote'; id: string; data: { text: string; owner: string } }
	| { name: 'header'; id: string; data: { text: string; level: 1 | 2 | 3 | 4 } }
	| { name: 'space'; id: string; data: { size: number } }
	| { name: 'list'; id: string; data: { items: string[]; type: 'ordered' | 'unordered' } };

export type viewBlocks = [
	{
		name: 'image';
		component: ComponentType<SvelteComponent<{ base64: string; name: string; caption: string }>>;
	},
	{ name: 'quote'; component: ComponentType<SvelteComponent<{ text: string; owner: string }>> },
	{ name: 'code'; component: ComponentType<SvelteComponent<{ text: string; lang: languages }>> },
	{
		name: 'header';
		component: ComponentType<SvelteComponent<{ text: string; level: 1 | 2 | 3 | 4 }>>;
	},
	{ name: 'paragraph'; component: ComponentType<SvelteComponent<{ text: string }>> },
	{
		name: 'list';
		component: ComponentType<SvelteComponent<{ items: string[]; type: 'ordered' | 'unordered' }>>;
	}
];

export type languages =
    | 'typescript'
    | 'javascript'
    | 'java'
    | 'css'
    | 'json'
    | 'c'
    | 'cpp' // C++
    | 'csharp' // C#
    | 'python'
    | 'php'
    | 'sql'
    | 'plaintext'
    | 'yaml'
    | 'xml'
    | 'rust'
    | 'lua'
    | 'bash'
    | 'markdown'
    | 'swift'
    | 'dart'
    | 'dockerfile'
    | 'kotlin'
    | 'ruby'
    | 'perl'
    | 'scala'
    | 'groovy'
    | 'haskell'
    | 'r'
    | 'erlang'
    | 'elixir'
    | 'assembly'
    | 'powershell'
    | 'matlab'
    | 'fortran'
    | 'pascal'
    | 'cobol'
    | 'actionscript'
    | 'scheme'
    | 'svelte'
    | 'html'
    | 'sass'
    | 'less'
    | 'stylus'
    | 'vue'
    | 'react' // JSX
    | 'angular' // For Angular templates
    | 'graphql'
    | 'nodejs'
    | 'shell' // General shell scripting
    | 'objective-c'
    | 'fsharp' // F#
    | 'vbnet' // Visual Basic .NET
    | 'julia'
    | 'clojure'
    | 'nim'
    | 'reason' // ReasonML
    | 'elm'
    | 'ocaml'
    | 'wasm' // WebAssembly
    | 'toml';

