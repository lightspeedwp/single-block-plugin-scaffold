/**
 * Date utilities for {{slug}} plugin
 * 
 * Provides common date-related functions used throughout the plugin.
 * 
 * @package {{namespace}}
 */

/**
 * Get the current year.
 * 
 * @return {number} Current year
 */
export function getCurrentYear() {
	return new Date().getFullYear();
}

/**
 * Format a date range string.
 * 
 * @param {number} startYear - Start year
 * @param {number} endYear   - End year (optional)
 * @return {string} Formatted date range
 */
export function formatDateRange( startYear, endYear = null ) {
	if ( ! startYear ) {
		return '';
	}
	
	if ( ! endYear || endYear === startYear ) {
		return startYear.toString();
	}
	
	return `${startYear}-${endYear}`;
}

/**
 * Validate if a year is reasonable for copyright purposes.
 * 
 * @param {number} year - Year to validate
 * @return {boolean} True if valid
 */
export function isValidCopyrightYear( year ) {
	const currentYear = getCurrentYear();
	const minYear = 1900; // Reasonable minimum for copyright
	
	return (
		typeof year === 'number' &&
		Number.isInteger( year ) &&
		year >= minYear &&
		year <= currentYear
	);
}

/**
 * Get copyright text with automatic year range.
 * 
 * @param {number} startYear - Start year
 * @param {string} holder    - Copyright holder name
 * @return {string} Copyright notice
 */
export function getCopyrightText( startYear, holder = '' ) {
	if ( ! isValidCopyrightYear( startYear ) ) {
		return '';
	}
	
	const currentYear = getCurrentYear();
	const yearRange = formatDateRange( startYear, currentYear );
	const copyrightHolder = holder ? ` ${holder}` : '';
	
	return `© ${yearRange}${copyrightHolder}`;
}