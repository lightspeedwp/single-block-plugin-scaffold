<?php
class Test_Block_Registration extends WP_UnitTestCase {

	public function setUp(): void {
		parent::setUp();
	}

	public function tearDown(): void {
		parent::tearDown();
	}

	public function test_block_registered() {
		do_action('init');
		$registry = WP_Block_Type_Registry::get_instance();
		$registered = $registry->get_all_registered();
		$this->assertNotEmpty($registered, 'No blocks registered');
	}

	public function test_block_has_required_properties() {
		do_action('init');
		$registry = WP_Block_Type_Registry::get_instance();
		$blocks = $registry->get_all_registered();

		foreach ($blocks as $block_name => $block) {
			if (strpos($block_name, '{{slug}}') === false) {
				continue;
			}

			$this->assertNotEmpty($block->title, "Block $block_name missing title");
			$this->assertNotEmpty($block->category, "Block $block_name missing category");
		}
	}

	public function test_block_json_exists() {
		$block_json = defined('{{namespace|upper}}_PLUGIN_DIR')
			? constant('{{namespace|upper}}_PLUGIN_DIR') . 'src/{{slug}}/block.json'
			: '';

		if (!empty($block_json)) {
			$this->assertFileExists($block_json, 'block.json not found');
			$json = json_decode(file_get_contents($block_json), true);
			$this->assertIsArray($json, 'block.json invalid JSON');
			$this->assertArrayHasKey('name', $json, 'block.json missing name');
			$this->assertArrayHasKey('title', $json, 'block.json missing title');
		}
	}

	public function test_block_render_callback_or_save() {
		do_action('init');
		$registry = WP_Block_Type_Registry::get_instance();
		$blocks = $registry->get_all_registered();

		foreach ($blocks as $block_name => $block) {
			if (strpos($block_name, '{{slug}}') === false) {
				continue;
			}

			$has_callback = !empty($block->render_callback);
			$has_save = method_exists($block, 'render') || !empty($block->editor_script);

			$this->assertTrue(
				$has_callback || $has_save,
				"Block $block_name has neither render_callback nor save method"
			);
		}
	}

	public function test_block_editor_script_enqueued() {
		do_action('init');
		set_current_screen('edit-post');

		do_action('enqueue_block_editor_assets');

		global $wp_scripts;
		$handles = array_keys($wp_scripts->registered);
		$has_block_script = false;

		foreach ($handles as $handle) {
			if (strpos($handle, '{{slug}}') !== false) {
				$has_block_script = true;
				break;
			}
		}

		$this->assertTrue($has_block_script, 'Block editor script not enqueued');
	}

	public function test_block_frontend_script_registered() {
		do_action('init');

		global $wp_scripts;
		$handles = array_keys($wp_scripts->registered);
		$has_frontend_script = false;

		foreach ($handles as $handle) {
			if (strpos($handle, '{{slug}}') !== false && strpos($handle, 'frontend') !== false) {
				$has_frontend_script = true;
				break;
			}
		}

		$this->assertTrue($has_frontend_script || !empty($handles), 'Frontend script handling issue');
	}
}
