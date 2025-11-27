<?php
class Test_Plugin_Main extends WP_UnitTestCase {

	protected $plugin_instance;

	public function setUp(): void {
		parent::setUp();
		global $wp_filter;
		$wp_filter = array();
		$this->plugin_instance = new stdClass();
	}

	public function tearDown(): void {
		parent::tearDown();
		global $wp_filter;
		$wp_filter = array();
	}

	public function test_plugin_constants_defined() {
		$this->assertTrue(defined('{{namespace|upper}}_VERSION'));
		$this->assertTrue(defined('{{namespace|upper}}_PLUGIN_DIR'));
		$this->assertTrue(defined('{{namespace|upper}}_PLUGIN_URL'));
		$this->assertTrue(defined('{{namespace|upper}}_PLUGIN_BASENAME'));
	}

	public function test_plugin_class_exists() {
		$this->assertTrue(class_exists('{{namespace|pascalCase}}_Plugin'));
	}

	public function test_init_hook_registered() {
		$this->assertGreaterThan(0, has_action('init'));
	}

	public function test_enqueue_scripts_hook_registered() {
		$this->assertGreaterThan(0, has_action('wp_enqueue_scripts'));
	}

	public function test_enqueue_editor_assets_hook_registered() {
		$this->assertGreaterThan(0, has_action('enqueue_block_editor_assets'));
	}

	public function test_textdomain_hook_registered() {
		$this->assertGreaterThan(0, has_action('plugins_loaded'));
	}

	public function test_plugin_version_format() {
		$version = defined('{{namespace|upper}}_VERSION') ? constant('{{namespace|upper}}_VERSION') : '';
		$this->assertMatchesRegularExpression('/^\d+\.\d+\.\d+/', $version);
	}

	public function test_plugin_dir_exists() {
		$dir = defined('{{namespace|upper}}_PLUGIN_DIR') ? constant('{{namespace|upper}}_PLUGIN_DIR') : '';
		$this->assertNotEmpty($dir);
		$this->assertDirectoryExists($dir);
	}

	public function test_plugin_url_is_valid() {
		$url = defined('{{namespace|upper}}_PLUGIN_URL') ? constant('{{namespace|upper}}_PLUGIN_URL') : '';
		$this->assertNotEmpty($url);
		$this->assertStringContainsString('http', $url);
	}
}
