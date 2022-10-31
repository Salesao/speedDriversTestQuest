module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: [
					'.ios.ts',
					'.android.ts',
					'.ts',
					'.ios.tsx',
					'.android.tsx',
					'.tsx',
					'.jsx',
					'.js',
					'.json',
				],
				alias: {
					'@api': './src/api',
					'@layouts': './src/layouts',
					'@pages': './src/pages',
					'@redux': './src/redux',
					'@UI': './src/UI',
					'@utils': './src/utils',
				},
			},
		],
		[
			'module:react-native-dotenv',
			{
				envName: 'APP_ENV',
				moduleName: '@env',
				path: '.env',
				safe: false,
				allowUndefined: true,
				verbose: false,
			},
		],
	],
};
