module.exports = {
	root: true,
	extends: '@react-native-community',
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/no-shadow': ['warn'],
				'no-shadow': 'off',
				'no-undef': 'off',
				'react-hooks/rules-of-hooks': 'off',
				'react-hooks/exhaustive-deps': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'react/self-closing-comp': 'off',
				'react-native/no-inline-styles': 'off',
				curly: 'off',
			},
		},
	],
};
