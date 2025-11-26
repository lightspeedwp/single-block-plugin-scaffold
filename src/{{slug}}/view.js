/**
 * {{name}} Block - Frontend JavaScript
 *
 * This file contains frontend JavaScript for the {{slug}} block.
 * It only runs on the front end of the site, not in the editor.
 *
 * @package {{namespace}}
 * @since   {{version}}
 */

/**
 * Initialize the block's frontend functionality.
 *
 * This function runs when the DOM is ready.
 */
function init{{namespace|pascalCase}}{{slug|pascalCase}}Block() {
	// Get all {{slug}} block elements on the page
	const blocks = document.querySelectorAll( '.wp-block-{{namespace}}-{{slug}}' );

	// If no blocks found, exit early
	if ( ! blocks.length ) {
		return;
	}

	// Loop through each block and initialize
	blocks.forEach( ( block ) => {
		// Add your frontend JavaScript functionality here
		// Example: Add event listeners, animations, etc.
		console.log( '{{name}} block initialized:', block );
	} );
}

// Initialize when DOM is ready
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init{{namespace|pascalCase}}{{slug|pascalCase}}Block );
} else {
	init{{namespace|pascalCase}}{{slug|pascalCase}}Block();
}
