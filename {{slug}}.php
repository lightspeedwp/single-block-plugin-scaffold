<?php
/**
 * Plugin Name:       {{name}}
 * Plugin URI:        {{plugin_uri}}
 * Description:       {{description}}
 * Version:           {{version}}
 * Requires at least: {{requires_wp}}
 * Requires PHP:      {{requires_php}}
 * Author:            {{author}}
 * Author URI:        {{author_uri}}
 * License:           {{license}}
 * License URI:       {{license_uri}}
 * Text Domain:       {{textdomain}}
 * Domain Path:       /languages
 * Update URI:        {{update_uri}}
 * Network:           false
 *
 * @package           {{namespace}}
 * @author            {{author}}
 * @copyright         {{copyright_year}} {{copyright_holder}}
 * @license           {{license}}
 *
 * {{name}} is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * {{name}} is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with {{name}}. If not, see {{license_uri}}.
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants.
define( '{{namespace|upper}}_VERSION', '{{version}}' );
define( '{{namespace|upper}}_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( '{{namespace|upper}}_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( '{{namespace|upper}}_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Main plugin class.
 */
class {{namespace|pascalCase}}_Plugin {

	/**
	 * Initialize the plugin.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'init' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );
	}

	/**
	 * Initialize plugin functionality.
	 */
	public function init() {
		// Register the block.
		register_block_type( {{namespace|upper}}_PLUGIN_DIR . 'src/{{slug}}/' );
	}

	/**
	 * Enqueue frontend assets.
	 */
	public function enqueue_frontend_assets() {
		$asset_file = {{namespace|upper}}_PLUGIN_DIR . 'build/index.asset.php';

		if ( file_exists( $asset_file ) ) {
			$asset = include $asset_file;

			wp_enqueue_script(
				'{{slug}}-frontend',
				{{namespace|upper}}_PLUGIN_URL . 'build/index.js',
				$asset['dependencies'] ?? array(),
				$asset['version'] ?? {{namespace|upper}}_VERSION,
				true
			);

			// Set script translations.
			wp_set_script_translations(
				'{{slug}}-frontend',
				'{{textdomain}}',
				{{namespace|upper}}_PLUGIN_DIR . 'languages'
			);
		}
	}

	/**
	 * Enqueue editor assets.
	 */
	public function enqueue_editor_assets() {
		$asset_file = {{namespace|upper}}_PLUGIN_DIR . 'build/index.asset.php';

		if ( file_exists( $asset_file ) ) {
			$asset = include $asset_file;

			wp_enqueue_script(
				'{{slug}}-editor',
				{{namespace|upper}}_PLUGIN_URL . 'build/index.js',
				$asset['dependencies'] ?? array(),
				$asset['version'] ?? {{namespace|upper}}_VERSION,
				true
			);

			// Set script translations.
			wp_set_script_translations(
				'{{slug}}-editor',
				'{{textdomain}}',
				{{namespace|upper}}_PLUGIN_DIR . 'languages'
			);
		}
	}

	/**
	 * Load plugin textdomain.
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'{{textdomain}}',
			false,
			dirname( {{namespace|upper}}_PLUGIN_BASENAME ) . '/languages'
		);
	}
}

// Initialize the plugin.
new {{namespace|pascalCase}}_Plugin();