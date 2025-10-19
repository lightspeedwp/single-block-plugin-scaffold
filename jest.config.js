// Jest configuration for {{projectName}}
module.exports = {
	...require( '@wordpress/jest-preset-default' ),
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: [ '<rootDir>/tests/setup-tests.js' ],
	moduleNameMapping: {
		'\\.(css|scss)$': 'identity-obj-proxy',
	},
	collectCoverageFrom: [
		'src/**/*.{js,jsx}',
		'!src/**/*.test.{js,jsx}',
		'!src/**/index.js',
		'!**/node_modules/**',
		'!**/vendor/**',
	],
	coverageDirectory: 'coverage',
	coverageReporters: [ 'text', 'lcov', 'html' ],
	testMatch: [
		'**/tests/**/*.test.js',
		'**/src/**/*.test.js',
	],
	transform: {
		'^.+\\.[jt]sx?$': [ 'babel-jest', { presets: [ '@wordpress/babel-preset-default' ] } ],
	},
};