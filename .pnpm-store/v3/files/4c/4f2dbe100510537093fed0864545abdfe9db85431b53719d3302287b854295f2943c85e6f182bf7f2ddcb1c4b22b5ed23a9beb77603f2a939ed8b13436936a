"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        plugins: {
            get svelte() {
                return require('../../index');
            }
        }
    },
    {
        files: ['*.svelte', '**/*.svelte'],
        languageOptions: {
            parser: require('svelte-eslint-parser')
        },
        rules: {
            'no-inner-declarations': 'off',
            'no-self-assign': 'off',
            'svelte/comment-directive': 'error',
            'svelte/system': 'error'
        },
        processor: 'svelte/svelte'
    }
];
