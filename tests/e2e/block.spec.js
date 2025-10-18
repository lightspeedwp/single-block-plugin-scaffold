/**
 * E2E tests for {{projectName}} block.
 *
 * @package {{namespace}}
 */

import { test, expect } from '@playwright/test';

test.describe( '{{projectName}} Block', () => {
	test.beforeEach( async ( { page } ) => {
		// Login to WordPress admin
		await page.goto( '/wp-admin' );
		await page.fill( '#user_login', 'admin' );
		await page.fill( '#user_pass', 'password' );
		await page.click( '#wp-submit' );
		
		// Create a new post
		await page.goto( '/wp-admin/post-new.php' );
		
		// Wait for editor to load
		await page.waitForSelector( '.block-editor-page' );
	} );

	test( 'should be available in the block inserter', async ( { page } ) => {
		// Open block inserter
		await page.click( '.edit-post-header-toolbar__inserter-toggle' );
		
		// Search for the block
		await page.fill( '.block-editor-inserter__search input', '{{projectName}}' );
		
		// Check if block appears in search results
		const blockResult = page.locator( '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}"]' );
		await expect( blockResult ).toBeVisible();
	} );

	test( 'should insert and render correctly', async ( { page } ) => {
		// Insert the block
		await page.click( '.edit-post-header-toolbar__inserter-toggle' );
		await page.fill( '.block-editor-inserter__search input', '{{projectName}}' );
		await page.click( '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}"]' );
		
		// Check if block is inserted
		const block = page.locator( '.wp-block-{{namespace}}-{{slug}}' );
		await expect( block ).toBeVisible();
		
		// Add some content
		const textArea = block.locator( '[contenteditable="true"]' );
		await textArea.fill( 'Test content for E2E testing' );
		
		// Verify content is saved
		await expect( textArea ).toHaveText( 'Test content for E2E testing' );
	} );

	test( 'should allow alignment changes', async ( { page } ) => {
		// Insert the block
		await page.click( '.edit-post-header-toolbar__inserter-toggle' );
		await page.fill( '.block-editor-inserter__search input', '{{projectName}}' );
		await page.click( '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}"]' );
		
		// Select the block
		const block = page.locator( '.wp-block-{{namespace}}-{{slug}}' );
		await block.click();
		
		// Change alignment to left
		await page.click( '[aria-label="Align text left"]' );
		
		// Check if alignment class is applied
		await expect( block ).toHaveClass( /has-text-align-left/ );
		
		// Change alignment to right
		await page.click( '[aria-label="Align text right"]' );
		
		// Check if alignment class is updated
		await expect( block ).toHaveClass( /has-text-align-right/ );
	} );

	test( 'should work with block settings', async ( { page } ) => {
		// Insert the block
		await page.click( '.edit-post-header-toolbar__inserter-toggle' );
		await page.fill( '.block-editor-inserter__search input', '{{projectName}}' );
		await page.click( '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}"]' );
		
		// Select the block
		const block = page.locator( '.wp-block-{{namespace}}-{{slug}}' );
		await block.click();
		
		// Open block settings sidebar if not open
		const settingsButton = page.locator( '[aria-label="Settings"]' );
		if ( await settingsButton.isVisible() ) {
			await settingsButton.click();
		}
		
		// Check if Block Settings panel is available
		const blockPanel = page.locator( '.block-editor-block-inspector .components-panel__body' ).first();
		await expect( blockPanel ).toBeVisible();
		
		// Test alignment dropdown in sidebar
		const alignmentSelect = page.locator( 'select' ).first();
		if ( await alignmentSelect.isVisible() ) {
			await alignmentSelect.selectOption( 'center' );
			await expect( block ).toHaveClass( /has-text-align-center/ );
		}
	} );

	test( 'should save and render on frontend', async ( { page } ) => {
		// Insert the block with content
		await page.click( '.edit-post-header-toolbar__inserter-toggle' );
		await page.fill( '.block-editor-inserter__search input', '{{projectName}}' );
		await page.click( '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}"]' );
		
		const block = page.locator( '.wp-block-{{namespace}}-{{slug}}' );
		const textArea = block.locator( '[contenteditable="true"]' );
		await textArea.fill( 'Frontend test content' );
		
		// Save the post
		await page.click( '.editor-post-publish-panel__toggle' );
		await page.click( '.editor-post-publish-button' );
		
		// Wait for save confirmation
		await page.waitForSelector( '.components-snackbar' );
		
		// Get the post URL and visit it
		const viewLink = page.locator( '.post-publish-panel__postpublish-buttons a' ).first();
		const postUrl = await viewLink.getAttribute( 'href' );
		
		// Visit the frontend
		await page.goto( postUrl );
		
		// Check if block renders correctly on frontend
		const frontendBlock = page.locator( '.wp-block-{{namespace}}-{{slug}}' );
		await expect( frontendBlock ).toBeVisible();
		
		// Check if content is preserved
		const content = frontendBlock.locator( 'p' );
		await expect( content ).toHaveText( 'Frontend test content' );
	} );

	test( 'should be accessible', async ( { page } ) => {
		// Insert the block
		await page.click( '.edit-post-header-toolbar__inserter-toggle' );
		await page.fill( '.block-editor-inserter__search input', '{{projectName}}' );
		await page.click( '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}"]' );
		
		// Test keyboard navigation
		const block = page.locator( '.wp-block-{{namespace}}-{{slug}}' );
		await block.focus();
		
		// Check if block is focusable
		await expect( block ).toBeFocused();
		
		// Test tab navigation within block
		await page.keyboard.press( 'Tab' );
		
		// Add content via keyboard
		await page.keyboard.type( 'Accessibility test content' );
		
		// Verify content was added
		const textArea = block.locator( '[contenteditable="true"]' );
		await expect( textArea ).toHaveText( 'Accessibility test content' );
	} );
} );