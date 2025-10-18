/**
 * Jest setup file for {{projectName}}.
 *
 * @package {{namespace}}
 */

// Import testing utilities
import '@testing-library/jest-dom';

// Mock WordPress dependencies
jest.mock( '@wordpress/i18n', () => ( {
	__: jest.fn( ( text ) => text ),
	_x: jest.fn( ( text ) => text ),
	_n: jest.fn( ( single, plural, number ) => ( number === 1 ? single : plural ) ),
	sprintf: jest.fn( ( format, ...args ) => {
		return format.replace( /%[sdifF%]/g, () => args.shift() );
	} ),
} ) );

jest.mock( '@wordpress/blocks', () => ( {
	registerBlockType: jest.fn(),
} ) );

jest.mock( '@wordpress/block-editor', () => ( {
	useBlockProps: jest.fn( () => ( {} ) ),
	RichText: {
		Content: ( { tagName: Tag = 'div', value } ) => <Tag>{ value }</Tag>,
	},
} ) );

// Mock console methods to reduce noise in tests
global.console = {
	...console,
	warn: jest.fn(),
	error: jest.fn(),
	log: jest.fn(),
};

// Set up global test environment
global.wp = {
	blocks: {
		registerBlockType: jest.fn(),
	},
	i18n: {
		__: jest.fn( ( text ) => text ),
		_x: jest.fn( ( text ) => text ),
		_n: jest.fn( ( single, plural, number ) => ( number === 1 ? single : plural ) ),
		sprintf: jest.fn(),
	},
};

// Mock fetch for API calls
global.fetch = jest.fn( () =>
	Promise.resolve( {
		ok: true,
		json: () => Promise.resolve( {} ),
	} )
);