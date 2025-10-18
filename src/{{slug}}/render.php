<?php
/**
 * {{projectName}} Block - Server-side render callback.
 *
 * @package {{namespace}}
 * @since   {{version}}
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the `{{namespace}}/{{slug}}` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the rendered block HTML.
 */
function {{namespace}}_{{slug|snakeCase}}_render_callback( $attributes, $content, $block ) {
	// Get block attributes with defaults.
	$content_text = $attributes['content'] ?? '';
	$alignment    = $attributes['alignment'] ?? 'center';
	
	// Sanitize the content.
	$content_text = wp_kses_post( $content_text );
	
	// Build CSS classes.
	$classes = array(
		'wp-block-{{namespace}}-{{slug}}',
		'has-text-align-' . esc_attr( $alignment ),
	);
	
	// Add custom CSS classes if set.
	if ( ! empty( $attributes['className'] ) ) {
		$classes[] = esc_attr( $attributes['className'] );
	}
	
	// Build wrapper attributes.
	$wrapper_attributes = get_block_wrapper_attributes( array(
		'class' => implode( ' ', $classes ),
	) );
	
	// Return empty if no content.
	if ( empty( $content_text ) ) {
		return '';
	}
	
	// Build the block HTML.
	$block_html = sprintf(
		'<div %1$s><div class="wp-block-{{namespace}}-{{slug}}__content"><p>%2$s</p></div></div>',
		$wrapper_attributes,
		$content_text
	);
	
	return $block_html;
}