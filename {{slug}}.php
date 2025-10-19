<?php
/**
 * Plugin Name: {{projectName}}
 * Plugin URI: https://github.com/{{author}}/{{slug}}
 * Description: {{description}}
 * Version: {{version}}
 * Author: {{author}}
 * License: {{license}}
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: {{textdomain}}
 * Domain Path: /languages
 * Requires at least: 6.0
 * Tested up to: 6.5
 * Requires PHP: 8.0
 * Network: false
 * Update URI: https://github.com/{{author}}/{{slug}}
 *
 * {{projectName}} is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * {{projectName}} is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with {{projectName}}. If not, see <https://www.gnu.org/licenses/>.
 *
 * @package {{namespace}}
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