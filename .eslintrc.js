module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'standard',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	settings: {
		react: {
			version: 'detect',
		},
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'quotes': ['error', 'single'],
		'no-unused-vars': 'warn',
		'semi': ['error', 'always'],
		'indent': ['error', 'tab'],
		'quote-props': ['error', 'consistent'],
		'curly': 'off',
		'no-tabs': 'off',
		'comma-dangle': ['off'],
		'space-before-function-paren': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
