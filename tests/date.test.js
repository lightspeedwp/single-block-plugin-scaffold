/**
 * Tests for date utilities used in {{slug}} plugin
 * 
 * @package {{namespace}}
 */

import {
	getCurrentYear,
	formatDateRange,
	isValidCopyrightYear,
	getCopyrightText,
} from './date.js';

describe( '{{namespace}} Date Utilities', () => {
	// Mock the current year for consistent testing
	const mockCurrentYear = 2024;
	
	beforeAll( () => {
		// Mock Date.prototype.getFullYear
		jest.spyOn( Date.prototype, 'getFullYear' ).mockReturnValue( mockCurrentYear );
	} );
	
	afterAll( () => {
		// Restore original implementation
		jest.restoreAllMocks();
	} );

	describe( 'getCurrentYear', () => {
		it( 'should return the current year', () => {
			expect( getCurrentYear() ).toBe( mockCurrentYear );
		} );
	} );

	describe( 'formatDateRange', () => {
		it( 'should return empty string for falsy start year', () => {
			expect( formatDateRange( 0 ) ).toBe( '' );
			expect( formatDateRange( null ) ).toBe( '' );
			expect( formatDateRange( undefined ) ).toBe( '' );
		} );

		it( 'should return single year when no end year provided', () => {
			expect( formatDateRange( 2020 ) ).toBe( '2020' );
		} );

		it( 'should return single year when start and end years are the same', () => {
			expect( formatDateRange( 2020, 2020 ) ).toBe( '2020' );
		} );

		it( 'should return year range when start and end years differ', () => {
			expect( formatDateRange( 2020, 2024 ) ).toBe( '2020-2024' );
		} );
	} );

	describe( 'isValidCopyrightYear', () => {
		it( 'should return false for non-numbers', () => {
			expect( isValidCopyrightYear( '2020' ) ).toBe( false );
			expect( isValidCopyrightYear( null ) ).toBe( false );
			expect( isValidCopyrightYear( undefined ) ).toBe( false );
		} );

		it( 'should return false for non-integer numbers', () => {
			expect( isValidCopyrightYear( 2020.5 ) ).toBe( false );
		} );

		it( 'should return false for years before 1900', () => {
			expect( isValidCopyrightYear( 1899 ) ).toBe( false );
		} );

		it( 'should return false for future years', () => {
			expect( isValidCopyrightYear( mockCurrentYear + 1 ) ).toBe( false );
		} );

		it( 'should return true for valid years', () => {
			expect( isValidCopyrightYear( 1900 ) ).toBe( true );
			expect( isValidCopyrightYear( 2020 ) ).toBe( true );
			expect( isValidCopyrightYear( mockCurrentYear ) ).toBe( true );
		} );
	} );

	describe( 'getCopyrightText', () => {
		it( 'should return empty string for invalid start year', () => {
			expect( getCopyrightText( 1899 ) ).toBe( '' );
			expect( getCopyrightText( '2020' ) ).toBe( '' );
		} );

		it( 'should generate copyright text without holder', () => {
			expect( getCopyrightText( 2020 ) ).toBe( '© 2020-2024' );
			expect( getCopyrightText( mockCurrentYear ) ).toBe( `© ${mockCurrentYear}` );
		} );

		it( 'should generate copyright text with holder', () => {
			expect( getCopyrightText( 2020, 'John Doe' ) ).toBe( '© 2020-2024 John Doe' );
			expect( getCopyrightText( mockCurrentYear, 'Acme Corp' ) ).toBe( `© ${mockCurrentYear} Acme Corp` );
		} );

		it( 'should handle empty holder string', () => {
			expect( getCopyrightText( 2020, '' ) ).toBe( '© 2020-2024' );
		} );
	} );
} );