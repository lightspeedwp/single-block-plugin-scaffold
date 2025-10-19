<?php
/**
 * PHPStan bootstrap file for {{projectName}}.
 *
 * @package {{namespace}}
 */

// Define WordPress constants for PHPStan analysis.
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', '/tmp/wordpress/' );
}

if ( ! defined( 'WPINC' ) ) {
	define( 'WPINC', 'wp-includes' );
}

if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', true );
}

if ( ! defined( 'WP_DEBUG_LOG' ) ) {
	define( 'WP_DEBUG_LOG', true );
}

if ( ! defined( 'WP_DEBUG_DISPLAY' ) ) {
	define( 'WP_DEBUG_DISPLAY', false );
}

// Plugin constants
if ( ! defined( '{{namespace|upper}}_VERSION' ) ) {
	define( '{{namespace|upper}}_VERSION', '{{version}}' );
}

if ( ! defined( '{{namespace|upper}}_PLUGIN_DIR' ) ) {
	define( '{{namespace|upper}}_PLUGIN_DIR', __DIR__ . '/../' );
}

if ( ! defined( '{{namespace|upper}}_PLUGIN_URL' ) ) {
	define( '{{namespace|upper}}_PLUGIN_URL', 'http://localhost/wp-content/plugins/{{slug}}/' );
}

if ( ! defined( '{{namespace|upper}}_PLUGIN_BASENAME' ) ) {
	define( '{{namespace|upper}}_PLUGIN_BASENAME', '{{slug}}/{{slug}}.php' );
}