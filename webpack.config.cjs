/**
 * Webpack Configuration
 *
 * @package {{slug}}
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve( process.cwd(), 'src', 'index.js' ),
		'{{slug}}': path.resolve( process.cwd(), 'src', '{{slug}}', 'index.js' ),
	},
	output: {
		filename: '[name].js',
		path: path.resolve( process.cwd(), 'build' ),
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@': path.resolve( process.cwd(), 'src' ),
			'@blocks': path.resolve( process.cwd(), 'src', '{{slug}}' ),
			'@utils': path.resolve( process.cwd(), 'src', 'utils' ),
			'@components': path.resolve( process.cwd(), 'src', 'components' ),
		},
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules.filter(
				( rule ) =>
					rule.test &&
					! rule.test.toString().includes( '\\.(j|t)sx?$' )
			),
			{
				test: /\.(j|t)sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve( 'babel-loader' ),
						options: {
							cacheDirectory:
								process.env.BABEL_CACHE_DIRECTORY || true,
							babelrc: false,
							configFile: false,
							presets: [
								require.resolve(
									'@wordpress/babel-preset-default'
								),
							],
							plugins: [
								[
									require.resolve(
										'@wordpress/babel-plugin-makepot'
									),
									{
										output: 'languages/{{slug}}-js.pot',
									},
								],
							],
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: [ '@svgr/webpack', 'url-loader' ],
				issuer: /\.(js|jsx|ts|tsx)$/,
			},
		],
	},
	externals: {
		...defaultConfig.externals,
		// WordPress dependencies are externalized by default
		// Add any additional externals here if needed
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			cacheGroups: {
				style: {
					name: 'style',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
				editor: {
					name: 'editor',
					test: /editor\.scss$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	performance: {
		...defaultConfig.performance,
		maxAssetSize: 512000,
		maxEntrypointSize: 512000,
	},
};
