/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'standard-with-typescript'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},
	],
	rules: {
		'no-tabs': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/return-await': 'off',
    '@typescript-eslint/indent': "off",
		'@typescript-eslint/promise-function-async': 'off',
		'no-self-assign': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
};
