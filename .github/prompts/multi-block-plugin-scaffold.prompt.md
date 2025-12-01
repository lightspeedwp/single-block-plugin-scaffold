---
title: Multi-Block Plugin Scaffold Prompt
description: Comprehensive reference prompt for GitHub Copilot to bootstrap multi-block plugins
category: Documentation
type: Copilot Prompt
audience: Developers, AI Agents
date: 2025-12-01
---

## Multi-Block Plugin Scaffold Prompt

> **Purpose:** Reference file for GitHub Copilot coding agent to bootstrap a multi-block WordPress plugin with custom post types, taxonomies, fields, block templates, and patterns.

---

## Quick Start for Copilot Coding Agent

Use this file as a comprehensive reference when creating the `multi-block-plugin-scaffold` repository. This scaffold extends the single-block-plugin-scaffold architecture to support:

1. Multiple blocks in `src/blocks/` directory
2. Custom Post Types with block templates
3. Custom Taxonomies
4. Custom Fields via Secure Custom Fields (SCF) with repeater support
5. Block Patterns and Template Parts
6. Block Bindings for dynamic content
7. Shared React components (Slider, Repeater, etc.)
8. Post Collection block (similar to WooCommerce Product Collection)
9. Complete uninstall cleanup and test suite
10. **WordPress Plugin Dependencies** (`Requires Plugins` header) for SCF dependency

---

## Repository Structure

```text
multi-block-plugin-scaffold/
├── {{slug}}.php                    # Main plugin file
├── uninstall.php                   # Uninstall cleanup
├── package.json                    # NPM configuration
├── composer.json                   # Composer configuration
├── webpack.config.cjs              # Multi-block webpack config
├── phpcs.xml                       # PHP coding standards
├── phpstan.neon                    # Static analysis
├── phpunit.xml                     # PHP unit testing
├── .wp-env.json                    # Local dev environment
│
├── inc/                            # PHP includes
│   ├── class-post-types.php        # CPT registration
│   ├── class-taxonomies.php        # Taxonomy registration
│   ├── class-fields.php            # SCF field registration
│   ├── class-repeater-fields.php   # SCF repeater/flexible content
│   ├── class-block-templates.php   # Block template registration
│   ├── class-block-bindings.php    # Block bindings registration
│   ├── class-patterns.php          # Pattern registration
│   ├── class-rest-api.php          # Custom REST API endpoints
│   ├── db-migration.php            # Database migrations
│   ├── deprecation.php             # Deprecation notices
│   └── nonce.php                   # Nonce utilities
│
├── src/                            # Source files
│   ├── index.js                    # Main entry point (registers all blocks)
│   ├── blocks/                     # Block source files
│   │   ├── {{slug}}-card/          # Single post card block
│   │   │   ├── block.json
│   │   │   ├── index.js
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   ├── render.php
│   │   │   ├── style.scss
│   │   │   ├── editor.scss
│   │   │   └── view.js
│   │   ├── {{slug}}-collection/    # Post collection block (like WC Product Collection)
│   │   │   ├── block.json
│   │   │   ├── index.js
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   ├── render.php
│   │   │   ├── style.scss
│   │   │   ├── editor.scss
│   │   │   └── variations.js       # Block variations for different layouts
│   │   ├── {{slug}}-slider/        # Slider/carousel block
│   │   │   ├── block.json
│   │   │   ├── index.js
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   ├── render.php
│   │   │   ├── style.scss
│   │   │   ├── editor.scss
│   │   │   └── view.js             # Frontend slider functionality
│   │   ├── {{slug}}-single/        # Single post display block
│   │   │   └── ... (same structure)
│   │   └── {{slug}}-featured/      # Featured posts block
│   │       └── ... (same structure)
│   │
│   ├── components/                 # Shared React components
│   │   ├── index.js
│   │   ├── Slider/                 # Reusable slider component
│   │   │   ├── index.js
│   │   │   ├── Slider.js
│   │   │   ├── SliderControls.js
│   │   │   ├── SliderDots.js
│   │   │   └── style.scss
│   │   ├── PostSelector/           # Post selection UI
│   │   │   ├── index.js
│   │   │   └── PostSelector.js
│   │   ├── TaxonomyFilter/         # Taxonomy filtering UI
│   │   │   ├── index.js
│   │   │   └── TaxonomyFilter.js
│   │   ├── FieldDisplay/           # ACF field display
│   │   │   ├── index.js
│   │   │   └── FieldDisplay.js
│   │   ├── RepeaterField/          # Repeater field display
│   │   │   ├── index.js
│   │   │   └── RepeaterField.js
│   │   ├── Gallery/                # Image gallery component
│   │   │   ├── index.js
│   │   │   └── Gallery.js
│   │   └── QueryControls/          # Query/collection controls
│   │       ├── index.js
│   │       └── QueryControls.js
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── index.js
│   │   ├── usePostType.js          # Post type data hook
│   │   ├── useTaxonomies.js        # Taxonomy data hook
│   │   ├── useFields.js            # ACF fields hook
│   │   ├── useRepeater.js          # Repeater field hook
│   │   ├── useSlider.js            # Slider state hook
│   │   └── useCollection.js        # Collection query hook
│   │
│   ├── utils/                      # Utility functions
│   │   ├── index.js
│   │   ├── query.js                # Query building utilities
│   │   └── fields.js               # Field processing utilities
│   │
│   └── scss/                       # Global styles
│       ├── style.scss
│       ├── editor.scss
│       └── _slider.scss            # Slider-specific styles
│
├── patterns/                       # Block patterns (PHP)
│   ├── {{slug}}-archive.php        # Archive pattern
│   ├── {{slug}}-single.php         # Single post pattern
│   ├── {{slug}}-card.php           # Card pattern
│   ├── {{slug}}-grid.php           # Grid pattern
│   ├── {{slug}}-slider.php         # Slider pattern
│   └── {{slug}}-featured.php       # Featured posts pattern
│
├── templates/                      # Block templates (HTML)
│   ├── single-{{slug}}.html        # Single CPT template
│   └── archive-{{slug}}.html       # Archive CPT template
│
├── parts/                          # Template parts (HTML)
│   ├── {{slug}}-header.html        # CPT-specific header
│   ├── {{slug}}-meta.html          # CPT meta display
│   └── {{slug}}-sidebar.html       # CPT-specific sidebar
│
├── languages/                      # Translations
│   └── {{slug}}.pot
│
├── assets/                         # Static assets
│   ├── images/
│   └── icons/
│
├── tests/                          # Test files
│   ├── bootstrap.php               # PHPUnit bootstrap
│   ├── phpstan-bootstrap.php       # PHPStan bootstrap
│   ├── setup-tests.js              # Jest setup
│   ├── php/                        # PHP unit tests
│   │   ├── test-post-types.php     # CPT registration tests
│   │   ├── test-taxonomies.php     # Taxonomy tests
│   │   ├── test-fields.php         # SCF field tests
│   │   ├── test-block-registration.php  # Block registration tests
│   │   ├── test-plugin-main.php    # Main plugin tests
│   │   └── test-uninstall.php      # Uninstall cleanup tests
│   ├── js/                         # JS unit tests
│   │   ├── blocks.test.js          # Block unit tests
│   │   ├── components.test.js      # Component tests
│   │   └── hooks.test.js           # Hook tests
│   └── e2e/                        # E2E tests (Playwright)
│       ├── blocks.spec.js          # Block editor tests
│       ├── post-type.spec.js       # CPT admin tests
│       ├── collection.spec.js      # Collection block tests
│       └── slider.spec.js          # Slider block tests
│
└── bin/                            # Build scripts
    ├── build.js
    ├── install-wp-tests.sh
    └── update-version.js
```

---

## Core Files Reference

### Main Plugin File (`{{slug}}.php`)

**Important:** WordPress 6.5+ introduced Plugin Dependencies. The `Requires Plugins` header declares that this plugin requires Secure Custom Fields. WordPress will prevent activation until SCF is installed and active.

See: [WordPress Plugin Dependencies](https://make.wordpress.org/core/2024/03/05/introducing-plugin-dependencies-in-wordpress-6-5/)

```php
<?php
/**
 * Plugin Name:       {{name}}
 * Plugin URI:        {{plugin_uri}}
 * Description:       {{description}}
 * Version:           {{version}}
 * Requires at least: {{requires_wp}}
 * Requires PHP:      {{requires_php}}
 * Requires Plugins:  secure-custom-fields
 * Author:            {{author}}
 * Author URI:        {{author_uri}}
 * License:           {{license}}
 * License URI:       {{license_uri}}
 * Text Domain:       {{textdomain}}
 * Domain Path:       /languages
 *
 * @package {{namespace}}
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Plugin constants.
define( '{{namespace|upper}}_VERSION', '{{version}}' );
define( '{{namespace|upper}}_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( '{{namespace|upper}}_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( '{{namespace|upper}}_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Defensive coding: Check for SCF/ACF functions before using them.
 *
 * While Plugin Dependencies ensures SCF is active, defensive coding is still
 * recommended for:
 * - Edge cases (FTP deletion, deployment issues)
 * - Loading order variations
 * - Future compatibility
 *
 * @see https://make.wordpress.org/core/2024/03/05/introducing-plugin-dependencies-in-wordpress-6-5/
 */
if ( ! function_exists( 'acf_add_local_field_group' ) ) {
    add_action( 'admin_notices', function() {
        echo '<div class="error"><p>' .
            esc_html__( '{{name}} requires Secure Custom Fields to be active.', '{{textdomain}}' ) .
            '</p></div>';
    } );
    return;
}

// Autoloader.
require_once {{namespace|upper}}_PLUGIN_DIR . 'vendor/autoload.php';

// Include core classes.
require_once {{namespace|upper}}_PLUGIN_DIR . 'inc/class-post-types.php';
require_once {{namespace|upper}}_PLUGIN_DIR . 'inc/class-taxonomies.php';
require_once {{namespace|upper}}_PLUGIN_DIR . 'inc/class-fields.php';
require_once {{namespace|upper}}_PLUGIN_DIR . 'inc/class-block-templates.php';
require_once {{namespace|upper}}_PLUGIN_DIR . 'inc/class-block-bindings.php';
require_once {{namespace|upper}}_PLUGIN_DIR . 'inc/class-patterns.php';

/**
 * Main plugin class.
 */
class {{namespace|pascalCase}}_Plugin {

    public function __construct() {
        add_action( 'init', array( $this, 'init' ) );
        add_action( 'init', array( $this, 'register_blocks' ) );
        add_action( 'plugins_loaded', array( $this, 'load_textdomain' ) );

        // Initialize components.
        new {{namespace|pascalCase}}_Post_Types();
        new {{namespace|pascalCase}}_Taxonomies();
        new {{namespace|pascalCase}}_Fields();
        new {{namespace|pascalCase}}_Block_Templates();
        new {{namespace|pascalCase}}_Block_Bindings();
        new {{namespace|pascalCase}}_Patterns();
    }

    public function init() {
        // Register block category.
        add_filter( 'block_categories_all', array( $this, 'register_block_category' ) );
    }

    public function register_blocks() {
        // Auto-register all blocks in src/blocks/.
        $blocks_dir = {{namespace|upper}}_PLUGIN_DIR . 'src/blocks/';

        if ( is_dir( $blocks_dir ) ) {
            $blocks = glob( $blocks_dir . '*/block.json' );

            foreach ( $blocks as $block_json ) {
                register_block_type( dirname( $block_json ) );
            }
        }
    }

    public function register_block_category( $categories ) {
        return array_merge(
            array(
                array(
                    'slug'  => '{{slug}}',
                    'title' => __( '{{name}}', '{{textdomain}}' ),
                    'icon'  => 'admin-generic',
                ),
            ),
            $categories
        );
    }

    public function load_textdomain() {
        load_plugin_textdomain(
            '{{textdomain}}',
            false,
            dirname( {{namespace|upper}}_PLUGIN_BASENAME ) . '/languages'
        );
    }
}

new {{namespace|pascalCase}}_Plugin();
```

---

### Custom Post Type Registration (`inc/class-post-types.php`)

```php
<?php
/**
 * Custom Post Type Registration.
 *
 * @package {{namespace}}
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Post Types class.
 */
class {{namespace|pascalCase}}_Post_Types {

    /**
     * Post type slug.
     *
     * @var string
     */
    const POST_TYPE = '{{slug}}';

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'init', array( $this, 'register_post_types' ) );
    }

    /**
     * Register custom post types.
     */
    public function register_post_types() {
        $labels = array(
            'name'                  => _x( '{{name_plural}}', 'Post type general name', '{{textdomain}}' ),
            'singular_name'         => _x( '{{name_singular}}', 'Post type singular name', '{{textdomain}}' ),
            'menu_name'             => _x( '{{name_plural}}', 'Admin Menu text', '{{textdomain}}' ),
            'add_new'               => __( 'Add New', '{{textdomain}}' ),
            'add_new_item'          => __( 'Add New {{name_singular}}', '{{textdomain}}' ),
            'edit_item'             => __( 'Edit {{name_singular}}', '{{textdomain}}' ),
            'new_item'              => __( 'New {{name_singular}}', '{{textdomain}}' ),
            'view_item'             => __( 'View {{name_singular}}', '{{textdomain}}' ),
            'view_items'            => __( 'View {{name_plural}}', '{{textdomain}}' ),
            'search_items'          => __( 'Search {{name_plural}}', '{{textdomain}}' ),
            'not_found'             => __( 'No {{name_plural_lower}} found.', '{{textdomain}}' ),
            'not_found_in_trash'    => __( 'No {{name_plural_lower}} found in Trash.', '{{textdomain}}' ),
            'all_items'             => __( 'All {{name_plural}}', '{{textdomain}}' ),
            'archives'              => __( '{{name_singular}} Archives', '{{textdomain}}' ),
            'attributes'            => __( '{{name_singular}} Attributes', '{{textdomain}}' ),
            'insert_into_item'      => __( 'Insert into {{name_singular_lower}}', '{{textdomain}}' ),
            'uploaded_to_this_item' => __( 'Uploaded to this {{name_singular_lower}}', '{{textdomain}}' ),
            'filter_items_list'     => __( 'Filter {{name_plural_lower}} list', '{{textdomain}}' ),
            'items_list_navigation' => __( '{{name_plural}} list navigation', '{{textdomain}}' ),
            'items_list'            => __( '{{name_plural}} list', '{{textdomain}}' ),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'show_in_rest'       => true,  // Required for block editor.
            'query_var'          => true,
            'rewrite'            => array( 'slug' => '{{slug}}' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => 20,
            'menu_icon'          => 'dashicons-admin-generic',
            'supports'           => array(
                'title',
                'editor',
                'author',
                'thumbnail',
                'excerpt',
                'custom-fields',
                'revisions',
            ),
            'template'           => array(
                array( '{{namespace}}/{{slug}}-single' ),
            ),
            'template_lock'      => false,
        );

        register_post_type( self::POST_TYPE, $args );
    }
}
```

---

### Custom Taxonomy Registration (`inc/class-taxonomies.php`)

```php
<?php
/**
 * Custom Taxonomy Registration.
 *
 * @package {{namespace}}
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Taxonomies class.
 */
class {{namespace|pascalCase}}_Taxonomies {

    /**
     * Taxonomy slug.
     *
     * @var string
     */
    const TAXONOMY = '{{slug}}_category';

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'init', array( $this, 'register_taxonomies' ) );
    }

    /**
     * Register custom taxonomies.
     */
    public function register_taxonomies() {
        $labels = array(
            'name'                       => _x( '{{taxonomy_plural}}', 'Taxonomy general name', '{{textdomain}}' ),
            'singular_name'              => _x( '{{taxonomy_singular}}', 'Taxonomy singular name', '{{textdomain}}' ),
            'search_items'               => __( 'Search {{taxonomy_plural}}', '{{textdomain}}' ),
            'popular_items'              => __( 'Popular {{taxonomy_plural}}', '{{textdomain}}' ),
            'all_items'                  => __( 'All {{taxonomy_plural}}', '{{textdomain}}' ),
            'edit_item'                  => __( 'Edit {{taxonomy_singular}}', '{{textdomain}}' ),
            'update_item'                => __( 'Update {{taxonomy_singular}}', '{{textdomain}}' ),
            'add_new_item'               => __( 'Add New {{taxonomy_singular}}', '{{textdomain}}' ),
            'new_item_name'              => __( 'New {{taxonomy_singular}} Name', '{{textdomain}}' ),
            'separate_items_with_commas' => __( 'Separate {{taxonomy_plural_lower}} with commas', '{{textdomain}}' ),
            'add_or_remove_items'        => __( 'Add or remove {{taxonomy_plural_lower}}', '{{textdomain}}' ),
            'choose_from_most_used'      => __( 'Choose from the most used {{taxonomy_plural_lower}}', '{{textdomain}}' ),
            'not_found'                  => __( 'No {{taxonomy_plural_lower}} found.', '{{textdomain}}' ),
            'menu_name'                  => __( '{{taxonomy_plural}}', '{{textdomain}}' ),
        );

        $args = array(
            'labels'            => $labels,
            'hierarchical'      => true,
            'public'            => true,
            'show_ui'           => true,
            'show_in_rest'      => true,  // Required for block editor.
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array( 'slug' => '{{slug}}-category' ),
        );

        register_taxonomy(
            self::TAXONOMY,
            {{namespace|pascalCase}}_Post_Types::POST_TYPE,
            $args
        );
    }
}
```

---

### Secure Custom Fields Integration (`inc/class-fields.php`)

```php
<?php
/**
 * Custom Fields Registration using Secure Custom Fields.
 *
 * @package {{namespace}}
 * @see https://wordpress.org/plugins/secure-custom-fields/
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Fields class.
 */
class {{namespace|pascalCase}}_Fields {

    /**
     * Field group key.
     *
     * @var string
     */
    const FIELD_GROUP = 'group_{{slug}}_fields';

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'acf/init', array( $this, 'register_fields' ) );
        add_action( 'admin_notices', array( $this, 'scf_dependency_notice' ) );
    }

    /**
     * Check if Secure Custom Fields is active.
     *
     * @return bool
     */
    public function is_scf_active() {
        return function_exists( 'acf_add_local_field_group' );
    }

    /**
     * Display admin notice if SCF is not active.
     */
    public function scf_dependency_notice() {
        if ( ! $this->is_scf_active() ) {
            ?>
            <div class="notice notice-warning">
                <p>
                    <?php
                    printf(
                        /* translators: %s: Plugin name */
                        esc_html__( '%s requires Secure Custom Fields plugin to be installed and activated for custom fields functionality.', '{{textdomain}}' ),
                        '<strong>{{name}}</strong>'
                    );
                    ?>
                </p>
            </div>
            <?php
        }
    }

    /**
     * Register custom fields.
     */
    public function register_fields() {
        if ( ! $this->is_scf_active() ) {
            return;
        }

        acf_add_local_field_group( array(
            'key'      => self::FIELD_GROUP,
            'title'    => __( '{{name_singular}} Details', '{{textdomain}}' ),
            'fields'   => array(
                array(
                    'key'          => 'field_{{slug}}_subtitle',
                    'label'        => __( 'Subtitle', '{{textdomain}}' ),
                    'name'         => '{{slug}}_subtitle',
                    'type'         => 'text',
                    'instructions' => __( 'Enter a subtitle for this {{name_singular_lower}}.', '{{textdomain}}' ),
                ),
                array(
                    'key'          => 'field_{{slug}}_featured',
                    'label'        => __( 'Featured', '{{textdomain}}' ),
                    'name'         => '{{slug}}_featured',
                    'type'         => 'true_false',
                    'ui'           => 1,
                    'instructions' => __( 'Mark this {{name_singular_lower}} as featured.', '{{textdomain}}' ),
                ),
                array(
                    'key'          => 'field_{{slug}}_gallery',
                    'label'        => __( 'Gallery', '{{textdomain}}' ),
                    'name'         => '{{slug}}_gallery',
                    'type'         => 'gallery',
                    'instructions' => __( 'Add images to the gallery.', '{{textdomain}}' ),
                    'return_format' => 'array',
                    'preview_size'  => 'medium',
                    'library'       => 'all',
                ),
                array(
                    'key'           => 'field_{{slug}}_related',
                    'label'         => __( 'Related {{name_plural}}', '{{textdomain}}' ),
                    'name'          => '{{slug}}_related',
                    'type'          => 'relationship',
                    'post_type'     => array( {{namespace|pascalCase}}_Post_Types::POST_TYPE ),
                    'filters'       => array( 'search', 'taxonomy' ),
                    'return_format' => 'object',
                    'instructions'  => __( 'Select related {{name_plural_lower}}.', '{{textdomain}}' ),
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param'    => 'post_type',
                        'operator' => '==',
                        'value'    => {{namespace|pascalCase}}_Post_Types::POST_TYPE,
                    ),
                ),
            ),
            'menu_order'      => 0,
            'position'        => 'normal',
            'style'           => 'default',
            'label_placement' => 'top',
        ) );
    }
}
```

---

### Block Bindings (`inc/class-block-bindings.php`)

```php
<?php
/**
 * Block Bindings Registration.
 *
 * @package {{namespace}}
 * @since 6.5.0 Block Bindings API
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Block Bindings class.
 */
class {{namespace|pascalCase}}_Block_Bindings {

    /**
     * Binding source name.
     *
     * @var string
     */
    const SOURCE = '{{namespace}}/fields';

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'init', array( $this, 'register_bindings' ) );
    }

    /**
     * Register block bindings source.
     */
    public function register_bindings() {
        if ( ! function_exists( 'register_block_bindings_source' ) ) {
            return;
        }

        register_block_bindings_source(
            self::SOURCE,
            array(
                'label'              => __( '{{name}} Fields', '{{textdomain}}' ),
                'get_value_callback' => array( $this, 'get_binding_value' ),
                'uses_context'       => array( 'postId', 'postType' ),
            )
        );
    }

    /**
     * Get binding value callback.
     *
     * @param array    $source_args    Source arguments.
     * @param WP_Block $block_instance Block instance.
     * @param string   $attribute_name Attribute name.
     *
     * @return string|null
     */
    public function get_binding_value( $source_args, $block_instance, $attribute_name ) {
        if ( empty( $source_args['key'] ) ) {
            return null;
        }

        $post_id = $block_instance->context['postId'] ?? get_the_ID();
        $field   = $source_args['key'];

        // Get ACF field value if available.
        if ( function_exists( 'get_field' ) ) {
            $value = get_field( $field, $post_id );

            if ( is_array( $value ) ) {
                return wp_json_encode( $value );
            }

            return $value;
        }

        // Fallback to post meta.
        return get_post_meta( $post_id, $field, true );
    }
}
```

---

### Block Templates (`inc/class-block-templates.php`)

```php
<?php
/**
 * Block Templates Registration.
 *
 * @package {{namespace}}
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Block Templates class.
 */
class {{namespace|pascalCase}}_Block_Templates {

    /**
     * Constructor.
     */
    public function __construct() {
        add_filter( 'get_block_templates', array( $this, 'add_plugin_templates' ), 10, 3 );
        add_filter( 'pre_get_block_file_template', array( $this, 'get_plugin_template' ), 10, 3 );
    }

    /**
     * Add plugin templates to template list.
     *
     * @param array  $query_result  Array of found templates.
     * @param array  $query         Arguments to retrieve templates.
     * @param string $template_type Template type.
     *
     * @return array
     */
    public function add_plugin_templates( $query_result, $query, $template_type ) {
        $post_type = $query['post_type'] ?? '';

        if ( 'wp_template' !== $template_type ) {
            return $query_result;
        }

        $plugin_templates = $this->get_plugin_template_files();

        foreach ( $plugin_templates as $template_file ) {
            $template = $this->build_template_object( $template_file );

            if ( $template ) {
                $query_result[] = $template;
            }
        }

        return $query_result;
    }

    /**
     * Get plugin template files.
     *
     * @return array
     */
    private function get_plugin_template_files() {
        $templates_dir = {{namespace|upper}}_PLUGIN_DIR . 'templates/';

        if ( ! is_dir( $templates_dir ) ) {
            return array();
        }

        return glob( $templates_dir . '*.html' );
    }

    /**
     * Build template object from file.
     *
     * @param string $template_file Template file path.
     *
     * @return WP_Block_Template|null
     */
    private function build_template_object( $template_file ) {
        $template_slug = basename( $template_file, '.html' );

        $template                 = new WP_Block_Template();
        $template->id             = '{{namespace}}//' . $template_slug;
        $template->theme          = '{{namespace}}';
        $template->source         = 'plugin';
        $template->slug           = $template_slug;
        $template->type           = 'wp_template';
        $template->title          = $this->get_template_title( $template_slug );
        $template->description    = '';
        $template->status         = 'publish';
        $template->has_theme_file = true;
        $template->is_custom      = true;
        $template->content        = file_get_contents( $template_file );

        return $template;
    }

    /**
     * Get template title.
     *
     * @param string $slug Template slug.
     *
     * @return string
     */
    private function get_template_title( $slug ) {
        $titles = array(
            'single-{{slug}}'  => __( 'Single {{name_singular}}', '{{textdomain}}' ),
            'archive-{{slug}}' => __( '{{name_singular}} Archive', '{{textdomain}}' ),
        );

        return $titles[ $slug ] ?? ucwords( str_replace( '-', ' ', $slug ) );
    }

    /**
     * Get plugin template.
     *
     * @param WP_Block_Template|null $template      Return a block template object to short-circuit the default query.
     * @param string                 $id            Template unique identifier.
     * @param string                 $template_type Template type.
     *
     * @return WP_Block_Template|null
     */
    public function get_plugin_template( $template, $id, $template_type ) {
        if ( 'wp_template' !== $template_type ) {
            return $template;
        }

        $parts = explode( '//', $id, 2 );

        if ( count( $parts ) < 2 || '{{namespace}}' !== $parts[0] ) {
            return $template;
        }

        $template_slug = $parts[1];
        $template_file = {{namespace|upper}}_PLUGIN_DIR . 'templates/' . $template_slug . '.html';

        if ( ! file_exists( $template_file ) ) {
            return $template;
        }

        return $this->build_template_object( $template_file );
    }
}
```

---

### Patterns Registration (`inc/class-patterns.php`)

```php
<?php
/**
 * Block Patterns Registration.
 *
 * @package {{namespace}}
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Patterns class.
 */
class {{namespace|pascalCase}}_Patterns {

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'init', array( $this, 'register_pattern_category' ) );
        add_action( 'init', array( $this, 'register_patterns' ) );
    }

    /**
     * Register pattern category.
     */
    public function register_pattern_category() {
        register_block_pattern_category(
            '{{slug}}',
            array(
                'label' => __( '{{name}}', '{{textdomain}}' ),
            )
        );
    }

    /**
     * Register patterns from patterns directory.
     */
    public function register_patterns() {
        $patterns_dir = {{namespace|upper}}_PLUGIN_DIR . 'patterns/';

        if ( ! is_dir( $patterns_dir ) ) {
            return;
        }

        $pattern_files = glob( $patterns_dir . '*.php' );

        foreach ( $pattern_files as $pattern_file ) {
            // The pattern files register themselves via the file header.
            require_once $pattern_file;
        }
    }
}
```

---

### Repeater Fields (`inc/class-repeater-fields.php`)

```php
<?php
/**
 * Repeater and Flexible Content Fields using Secure Custom Fields.
 *
 * @package {{namespace}}
 * @see https://wordpress.org/plugins/secure-custom-fields/
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Repeater Fields class.
 */
class {{namespace|pascalCase}}_Repeater_Fields {

    /**
     * Constructor.
     */
    public function __construct() {
        add_action( 'acf/init', array( $this, 'register_repeater_fields' ) );
    }

    /**
     * Register repeater field groups.
     */
    public function register_repeater_fields() {
        if ( ! function_exists( 'acf_add_local_field_group' ) ) {
            return;
        }

        // Slider/Gallery Repeater Field Group.
        acf_add_local_field_group( array(
            'key'      => 'group_{{slug}}_slider',
            'title'    => __( '{{name_singular}} Slider', '{{textdomain}}' ),
            'fields'   => array(
                array(
                    'key'          => 'field_{{slug}}_slides',
                    'label'        => __( 'Slides', '{{textdomain}}' ),
                    'name'         => '{{slug}}_slides',
                    'type'         => 'repeater',
                    'instructions' => __( 'Add slides to the slider.', '{{textdomain}}' ),
                    'min'          => 0,
                    'max'          => 20,
                    'layout'       => 'block',
                    'button_label' => __( 'Add Slide', '{{textdomain}}' ),
                    'sub_fields'   => array(
                        array(
                            'key'           => 'field_{{slug}}_slide_image',
                            'label'         => __( 'Image', '{{textdomain}}' ),
                            'name'          => 'image',
                            'type'          => 'image',
                            'return_format' => 'array',
                            'preview_size'  => 'medium',
                            'library'       => 'all',
                        ),
                        array(
                            'key'   => 'field_{{slug}}_slide_title',
                            'label' => __( 'Title', '{{textdomain}}' ),
                            'name'  => 'title',
                            'type'  => 'text',
                        ),
                        array(
                            'key'   => 'field_{{slug}}_slide_caption',
                            'label' => __( 'Caption', '{{textdomain}}' ),
                            'name'  => 'caption',
                            'type'  => 'textarea',
                            'rows'  => 2,
                        ),
                        array(
                            'key'   => 'field_{{slug}}_slide_link',
                            'label' => __( 'Link', '{{textdomain}}' ),
                            'name'  => 'link',
                            'type'  => 'link',
                        ),
                    ),
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param'    => 'post_type',
                        'operator' => '==',
                        'value'    => {{namespace|pascalCase}}_Post_Types::POST_TYPE,
                    ),
                ),
            ),
        ) );

        // Flexible Content Field Group for sections.
        acf_add_local_field_group( array(
            'key'      => 'group_{{slug}}_sections',
            'title'    => __( '{{name_singular}} Sections', '{{textdomain}}' ),
            'fields'   => array(
                array(
                    'key'          => 'field_{{slug}}_sections',
                    'label'        => __( 'Content Sections', '{{textdomain}}' ),
                    'name'         => '{{slug}}_sections',
                    'type'         => 'flexible_content',
                    'instructions' => __( 'Add content sections.', '{{textdomain}}' ),
                    'button_label' => __( 'Add Section', '{{textdomain}}' ),
                    'layouts'      => array(
                        'layout_text' => array(
                            'key'        => 'layout_{{slug}}_text',
                            'name'       => 'text_section',
                            'label'      => __( 'Text Section', '{{textdomain}}' ),
                            'sub_fields' => array(
                                array(
                                    'key'   => 'field_{{slug}}_section_heading',
                                    'label' => __( 'Heading', '{{textdomain}}' ),
                                    'name'  => 'heading',
                                    'type'  => 'text',
                                ),
                                array(
                                    'key'   => 'field_{{slug}}_section_content',
                                    'label' => __( 'Content', '{{textdomain}}' ),
                                    'name'  => 'content',
                                    'type'  => 'wysiwyg',
                                ),
                            ),
                        ),
                        'layout_gallery' => array(
                            'key'        => 'layout_{{slug}}_gallery',
                            'name'       => 'gallery_section',
                            'label'      => __( 'Gallery Section', '{{textdomain}}' ),
                            'sub_fields' => array(
                                array(
                                    'key'           => 'field_{{slug}}_section_gallery',
                                    'label'         => __( 'Gallery', '{{textdomain}}' ),
                                    'name'          => 'gallery',
                                    'type'          => 'gallery',
                                    'return_format' => 'array',
                                ),
                            ),
                        ),
                        'layout_cta' => array(
                            'key'        => 'layout_{{slug}}_cta',
                            'name'       => 'cta_section',
                            'label'      => __( 'Call to Action', '{{textdomain}}' ),
                            'sub_fields' => array(
                                array(
                                    'key'   => 'field_{{slug}}_cta_text',
                                    'label' => __( 'CTA Text', '{{textdomain}}' ),
                                    'name'  => 'cta_text',
                                    'type'  => 'text',
                                ),
                                array(
                                    'key'   => 'field_{{slug}}_cta_link',
                                    'label' => __( 'CTA Link', '{{textdomain}}' ),
                                    'name'  => 'cta_link',
                                    'type'  => 'link',
                                ),
                            ),
                        ),
                    ),
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param'    => 'post_type',
                        'operator' => '==',
                        'value'    => {{namespace|pascalCase}}_Post_Types::POST_TYPE,
                    ),
                ),
            ),
        ) );
    }
}
```

---

### Collection Block (`src/blocks/{{slug}}-collection/block.json`)

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "{{namespace}}/{{slug}}-collection",
    "title": "{{name}} Collection",
    "category": "{{slug}}",
    "icon": "grid-view",
    "description": "Display a collection of {{name_plural_lower}} with filtering and layout options.",
    "version": "{{version}}",
    "textdomain": "{{textdomain}}",
    "keywords": ["collection", "{{slug}}", "grid", "list", "query"],
    "usesContext": ["postId", "postType"],
    "providesContext": {
        "{{namespace}}/queryId": "queryId"
    },
    "supports": {
        "html": false,
        "align": ["wide", "full"],
        "anchor": true,
        "className": true,
        "color": {
            "background": true,
            "text": true
        },
        "spacing": {
            "margin": true,
            "padding": true,
            "blockGap": true
        }
    },
    "attributes": {
        "queryId": {
            "type": "number"
        },
        "query": {
            "type": "object",
            "default": {
                "postType": "{{slug}}",
                "perPage": 6,
                "pages": 0,
                "offset": 0,
                "order": "desc",
                "orderBy": "date",
                "author": "",
                "search": "",
                "exclude": [],
                "sticky": "",
                "inherit": false,
                "taxQuery": null,
                "featured": false
            }
        },
        "layout": {
            "type": "string",
            "default": "grid",
            "enum": ["grid", "list", "slider"]
        },
        "columns": {
            "type": "number",
            "default": 3
        },
        "displayFeaturedImage": {
            "type": "boolean",
            "default": true
        },
        "displayTitle": {
            "type": "boolean",
            "default": true
        },
        "displayExcerpt": {
            "type": "boolean",
            "default": true
        },
        "displayMeta": {
            "type": "boolean",
            "default": true
        },
        "displayPagination": {
            "type": "boolean",
            "default": true
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./editor.css",
    "style": "file:./style.css",
    "render": "file:./render.php",
    "viewScript": "file:./view.js"
}
```

---

### Slider Component (`src/components/Slider/Slider.js`)

```javascript
/**
 * Slider Component
 *
 * A reusable slider/carousel component for the block editor and frontend.
 *
 * @package {{namespace}}
 */

import { useState, useEffect, useRef, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { chevronLeft, chevronRight } from '@wordpress/icons';

import './style.scss';

/**
 * Slider component.
 *
 * @param {Object}   props                   Component props.
 * @param {Array}    props.slides            Array of slide objects.
 * @param {boolean}  props.autoplay          Enable autoplay.
 * @param {number}   props.autoplaySpeed     Autoplay interval in ms.
 * @param {boolean}  props.showDots          Show navigation dots.
 * @param {boolean}  props.showArrows        Show prev/next arrows.
 * @param {boolean}  props.infinite          Enable infinite loop.
 * @param {number}   props.slidesToShow      Number of slides visible.
 * @param {number}   props.slidesToScroll    Number of slides to scroll.
 * @param {Function} props.renderSlide       Custom slide render function.
 * @param {string}   props.className         Additional CSS class.
 *
 * @return {Element} Slider component.
 */
export default function Slider( {
    slides = [],
    autoplay = false,
    autoplaySpeed = 5000,
    showDots = true,
    showArrows = true,
    infinite = true,
    slidesToShow = 1,
    slidesToScroll = 1,
    renderSlide,
    className = '',
} ) {
    const [ currentIndex, setCurrentIndex ] = useState( 0 );
    const [ isPlaying, setIsPlaying ] = useState( autoplay );
    const sliderRef = useRef( null );
    const autoplayRef = useRef( null );

    const totalSlides = slides.length;
    const maxIndex = Math.max( 0, totalSlides - slidesToShow );

    /**
     * Go to next slide.
     */
    const nextSlide = useCallback( () => {
        setCurrentIndex( ( prev ) => {
            if ( prev >= maxIndex ) {
                return infinite ? 0 : prev;
            }
            return Math.min( prev + slidesToScroll, maxIndex );
        } );
    }, [ maxIndex, infinite, slidesToScroll ] );

    /**
     * Go to previous slide.
     */
    const prevSlide = useCallback( () => {
        setCurrentIndex( ( prev ) => {
            if ( prev <= 0 ) {
                return infinite ? maxIndex : 0;
            }
            return Math.max( prev - slidesToScroll, 0 );
        } );
    }, [ maxIndex, infinite, slidesToScroll ] );

    /**
     * Go to specific slide.
     *
     * @param {number} index Slide index.
     */
    const goToSlide = ( index ) => {
        setCurrentIndex( Math.min( Math.max( 0, index ), maxIndex ) );
    };

    // Autoplay effect.
    useEffect( () => {
        if ( isPlaying && totalSlides > slidesToShow ) {
            autoplayRef.current = setInterval( nextSlide, autoplaySpeed );
        }

        return () => {
            if ( autoplayRef.current ) {
                clearInterval( autoplayRef.current );
            }
        };
    }, [ isPlaying, nextSlide, autoplaySpeed, totalSlides, slidesToShow ] );

    // Pause on hover.
    const handleMouseEnter = () => setIsPlaying( false );
    const handleMouseLeave = () => setIsPlaying( autoplay );

    // Keyboard navigation.
    const handleKeyDown = ( event ) => {
        if ( event.key === 'ArrowLeft' ) {
            prevSlide();
        } else if ( event.key === 'ArrowRight' ) {
            nextSlide();
        }
    };

    if ( totalSlides === 0 ) {
        return null;
    }

    const slideWidth = 100 / slidesToShow;
    const translateX = -currentIndex * slideWidth;

    return (
        <div
            className={ `wp-block-{{namespace}}-slider ${ className }` }
            ref={ sliderRef }
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseLeave }
            onKeyDown={ handleKeyDown }
            role="region"
            aria-label={ __( 'Slider', '{{textdomain}}' ) }
            aria-roledescription="carousel"
            tabIndex="0"
        >
            <div className="wp-block-{{namespace}}-slider__viewport">
                <div
                    className="wp-block-{{namespace}}-slider__track"
                    style={ {
                        transform: `translateX(${ translateX }%)`,
                        transition: 'transform 0.5s ease-in-out',
                    } }
                >
                    { slides.map( ( slide, index ) => (
                        <div
                            key={ slide.id || index }
                            className="wp-block-{{namespace}}-slider__slide"
                            style={ { width: `${ slideWidth }%` } }
                            role="group"
                            aria-roledescription="slide"
                            aria-label={ `${ index + 1 } of ${ totalSlides }` }
                        >
                            { renderSlide ? renderSlide( slide, index ) : (
                                <>
                                    { slide.image && (
                                        <img
                                            src={ slide.image.url }
                                            alt={ slide.image.alt || slide.title || '' }
                                            className="wp-block-{{namespace}}-slider__image"
                                        />
                                    ) }
                                    { slide.title && (
                                        <h3 className="wp-block-{{namespace}}-slider__title">
                                            { slide.title }
                                        </h3>
                                    ) }
                                    { slide.caption && (
                                        <p className="wp-block-{{namespace}}-slider__caption">
                                            { slide.caption }
                                        </p>
                                    ) }
                                </>
                            ) }
                        </div>
                    ) ) }
                </div>
            </div>

            { showArrows && totalSlides > slidesToShow && (
                <>
                    <Button
                        className="wp-block-{{namespace}}-slider__arrow wp-block-{{namespace}}-slider__arrow--prev"
                        onClick={ prevSlide }
                        icon={ chevronLeft }
                        label={ __( 'Previous slide', '{{textdomain}}' ) }
                        disabled={ ! infinite && currentIndex === 0 }
                    />
                    <Button
                        className="wp-block-{{namespace}}-slider__arrow wp-block-{{namespace}}-slider__arrow--next"
                        onClick={ nextSlide }
                        icon={ chevronRight }
                        label={ __( 'Next slide', '{{textdomain}}' ) }
                        disabled={ ! infinite && currentIndex >= maxIndex }
                    />
                </>
            ) }

            { showDots && totalSlides > slidesToShow && (
                <div
                    className="wp-block-{{namespace}}-slider__dots"
                    role="tablist"
                    aria-label={ __( 'Slider navigation', '{{textdomain}}' ) }
                >
                    { Array.from( { length: maxIndex + 1 } ).map( ( _, index ) => (
                        <button
                            key={ index }
                            className={ `wp-block-{{namespace}}-slider__dot ${
                                index === currentIndex ? 'is-active' : ''
                            }` }
                            onClick={ () => goToSlide( index ) }
                            role="tab"
                            aria-selected={ index === currentIndex }
                            aria-label={ `Go to slide ${ index + 1 }` }
                        />
                    ) ) }
                </div>
            ) }
        </div>
    );
}
```

---

### Uninstall File (`uninstall.php`)

```php
<?php
/**
 * {{name}} Uninstall
 *
 * Fired when the plugin is uninstalled to clean up all plugin data.
 *
 * @package {{namespace}}
 */

// If uninstall not called from WordPress, exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

global $wpdb;

$slug      = '{{slug}}';
$post_type = '{{slug}}';
$taxonomy  = '{{slug}}_category';

/**
 * Delete all posts of the custom post type.
 */
$posts = get_posts( array(
    'post_type'      => $post_type,
    'post_status'    => 'any',
    'posts_per_page' => -1,
    'fields'         => 'ids',
) );

foreach ( $posts as $post_id ) {
    wp_delete_post( $post_id, true );
}

/**
 * Delete all terms from the custom taxonomy.
 */
$terms = get_terms( array(
    'taxonomy'   => $taxonomy,
    'hide_empty' => false,
    'fields'     => 'ids',
) );

if ( ! is_wp_error( $terms ) ) {
    foreach ( $terms as $term_id ) {
        wp_delete_term( $term_id, $taxonomy );
    }
}

/**
 * Delete plugin options.
 */
$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
        $slug . '_%'
    )
);

/**
 * Delete transients.
 */
$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s",
        '_transient_' . $slug . '_%',
        '_site_transient_' . $slug . '_%'
    )
);

/**
 * Delete user meta.
 */
$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->usermeta} WHERE meta_key LIKE %s",
        $slug . '_%'
    )
);

/**
 * Delete post meta (including ACF fields).
 */
$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE %s",
        $slug . '_%'
    )
);

/**
 * Delete term meta.
 */
$wpdb->query(
    $wpdb->prepare(
        "DELETE FROM {$wpdb->termmeta} WHERE meta_key LIKE %s",
        $slug . '_%'
    )
);

/**
 * Clear scheduled cron hooks.
 */
$hooks = array(
    "{$slug}_cron",
    "{$slug}_daily",
    "{$slug}_hourly",
    "{$slug}_cleanup",
);

foreach ( $hooks as $hook ) {
    $timestamp = wp_next_scheduled( $hook );
    if ( $timestamp ) {
        wp_unschedule_event( $timestamp, $hook );
    }
    wp_clear_scheduled_hook( $hook );
}

/**
 * Flush rewrite rules.
 */
flush_rewrite_rules();

/**
 * Clear any cached data.
 */
wp_cache_flush();
```

---

### Test Bootstrap (`tests/bootstrap.php`)

```php
<?php
/**
 * PHPUnit bootstrap file for {{name}}.
 *
 * @package {{namespace}}
 */

// Composer autoloader.
if ( file_exists( dirname( __DIR__ ) . '/vendor/autoload.php' ) ) {
    require dirname( __DIR__ ) . '/vendor/autoload.php';
}

$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
    $_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
    echo "Could not find $_tests_dir/includes/functions.php" . PHP_EOL;
    echo "Have you run bin/install-wp-tests.sh?" . PHP_EOL;
    exit( 1 );
}

// Give access to tests_add_filter() function.
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
    require dirname( __DIR__ ) . '/{{slug}}.php';
}
tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Start up the WP testing environment.
require $_tests_dir . '/includes/bootstrap.php';
```

---

### Post Type Tests (`tests/php/test-post-types.php`)

```php
<?php
/**
 * Post Types Tests.
 *
 * @package {{namespace}}
 */

class Test_Post_Types extends WP_UnitTestCase {

    public function setUp(): void {
        parent::setUp();
        do_action( 'init' );
    }

    public function test_post_type_registered() {
        $this->assertTrue( post_type_exists( '{{slug}}' ) );
    }

    public function test_post_type_supports_editor() {
        $this->assertTrue( post_type_supports( '{{slug}}', 'editor' ) );
    }

    public function test_post_type_supports_thumbnail() {
        $this->assertTrue( post_type_supports( '{{slug}}', 'thumbnail' ) );
    }

    public function test_post_type_is_public() {
        $post_type = get_post_type_object( '{{slug}}' );
        $this->assertTrue( $post_type->public );
    }

    public function test_post_type_shows_in_rest() {
        $post_type = get_post_type_object( '{{slug}}' );
        $this->assertTrue( $post_type->show_in_rest );
    }

    public function test_post_type_has_archive() {
        $post_type = get_post_type_object( '{{slug}}' );
        $this->assertTrue( $post_type->has_archive );
    }

    public function test_can_create_post() {
        $post_id = $this->factory->post->create( array(
            'post_type'  => '{{slug}}',
            'post_title' => 'Test {{name_singular}}',
        ) );

        $this->assertIsInt( $post_id );
        $this->assertGreaterThan( 0, $post_id );

        $post = get_post( $post_id );
        $this->assertEquals( '{{slug}}', $post->post_type );
    }
}
```

---

### Block Registration Tests (`tests/php/test-block-registration.php`)

```php
<?php
/**
 * Block Registration Tests.
 *
 * @package {{namespace}}
 */

class Test_Block_Registration extends WP_UnitTestCase {

    public function setUp(): void {
        parent::setUp();
        do_action( 'init' );
    }

    public function test_blocks_registered() {
        $registry   = WP_Block_Type_Registry::get_instance();
        $registered = $registry->get_all_registered();

        $plugin_blocks = array_filter(
            array_keys( $registered ),
            function ( $name ) {
                return strpos( $name, '{{namespace}}/' ) === 0;
            }
        );

        $this->assertNotEmpty( $plugin_blocks, 'No plugin blocks registered' );
    }

    public function test_collection_block_registered() {
        $registry = WP_Block_Type_Registry::get_instance();
        $this->assertTrue(
            $registry->is_registered( '{{namespace}}/{{slug}}-collection' ),
            'Collection block not registered'
        );
    }

    public function test_card_block_registered() {
        $registry = WP_Block_Type_Registry::get_instance();
        $this->assertTrue(
            $registry->is_registered( '{{namespace}}/{{slug}}-card' ),
            'Card block not registered'
        );
    }

    public function test_slider_block_registered() {
        $registry = WP_Block_Type_Registry::get_instance();
        $this->assertTrue(
            $registry->is_registered( '{{namespace}}/{{slug}}-slider' ),
            'Slider block not registered'
        );
    }

    public function test_blocks_have_render_callback() {
        $registry = WP_Block_Type_Registry::get_instance();

        $plugin_blocks = array(
            '{{namespace}}/{{slug}}-collection',
            '{{namespace}}/{{slug}}-card',
            '{{namespace}}/{{slug}}-slider',
        );

        foreach ( $plugin_blocks as $block_name ) {
            $block = $registry->get_registered( $block_name );
            if ( $block ) {
                $this->assertNotEmpty(
                    $block->render_callback,
                    "$block_name missing render callback"
                );
            }
        }
    }
}
```

---

### E2E Collection Block Tests (`tests/e2e/collection.spec.js`)

```javascript
/**
 * E2E tests for {{name}} Collection block.
 *
 * @package {{namespace}}
 */

import { test, expect } from '@playwright/test';

test.describe( '{{name}} Collection Block', () => {
    test.beforeEach( async ( { page } ) => {
        // Login to WordPress admin.
        await page.goto( '/wp-admin' );
        await page.fill( '#user_login', 'admin' );
        await page.fill( '#user_pass', 'password' );
        await page.click( '#wp-submit' );

        // Create a new post.
        await page.goto( '/wp-admin/post-new.php' );
        await page.waitForSelector( '.block-editor-page' );
    } );

    test( 'should insert collection block', async ( { page } ) => {
        // Open block inserter.
        await page.click( '.edit-post-header-toolbar__inserter-toggle' );
        await page.fill( '.block-editor-inserter__search input', '{{name}} Collection' );

        // Insert the block.
        const blockItem = page.locator(
            '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}-collection"]'
        );
        await blockItem.click();

        // Verify block is inserted.
        const block = page.locator( '.wp-block-{{namespace}}-{{slug}}-collection' );
        await expect( block ).toBeVisible();
    } );

    test( 'should show layout options in sidebar', async ( { page } ) => {
        // Insert the block.
        await page.click( '.edit-post-header-toolbar__inserter-toggle' );
        await page.fill( '.block-editor-inserter__search input', '{{name}} Collection' );
        await page.click(
            '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}-collection"]'
        );

        // Select the block.
        const block = page.locator( '.wp-block-{{namespace}}-{{slug}}-collection' );
        await block.click();

        // Check sidebar settings.
        const layoutControl = page.locator( 'select[aria-label*="Layout"]' );
        await expect( layoutControl ).toBeVisible();
    } );

    test( 'should filter by taxonomy', async ( { page } ) => {
        // Insert the block.
        await page.click( '.edit-post-header-toolbar__inserter-toggle' );
        await page.fill( '.block-editor-inserter__search input', '{{name}} Collection' );
        await page.click(
            '.block-editor-block-types-list__item[data-id="{{namespace}}/{{slug}}-collection"]'
        );

        // Open block settings.
        const block = page.locator( '.wp-block-{{namespace}}-{{slug}}-collection' );
        await block.click();

        // Check for taxonomy filter.
        const taxonomyPanel = page.locator( 'text=Filter by' );
        await expect( taxonomyPanel ).toBeVisible();
    } );
} );
```

---

### Webpack Configuration (`webpack.config.cjs`)

```javascript
/**
 * Webpack Configuration for Multi-Block Plugin.
 *
 * @package {{slug}}
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const glob = require( 'glob' );

// Dynamically find all block entry points.
const blockEntries = {};
const blockDirs = glob.sync( './src/blocks/*/index.js' );

blockDirs.forEach( ( blockPath ) => {
    const blockName = path.basename( path.dirname( blockPath ) );
    blockEntries[ `blocks/${ blockName }/index` ] = path.resolve(
        process.cwd(),
        blockPath
    );
} );

module.exports = {
    ...defaultConfig,
    entry: {
        index: path.resolve( process.cwd(), 'src', 'index.js' ),
        ...blockEntries,
    },
    output: {
        filename: '[name].js',
        path: path.resolve( process.cwd(), 'build' ),
    },
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            ...defaultConfig.resolve.alias,
            '@': path.resolve( process.cwd(), 'src' ),
            '@blocks': path.resolve( process.cwd(), 'src', 'blocks' ),
            '@components': path.resolve( process.cwd(), 'src', 'components' ),
            '@hooks': path.resolve( process.cwd(), 'src', 'hooks' ),
            '@utils': path.resolve( process.cwd(), 'src', 'utils' ),
        },
    },
};
```

---

### Example Block Pattern (`patterns/{{slug}}-archive.php`)

```php
<?php
/**
 * Title: {{name_singular}} Archive
 * Slug: {{namespace}}/{{slug}}-archive
 * Categories: {{slug}}
 * Keywords: archive, {{slug}}, grid
 * Description: Displays an archive grid of {{name_plural_lower}}.
 * Block Types: core/query
 * Viewport Width: 1200
 */
?>
<!-- wp:query {"queryId":1,"query":{"postType":"{{slug}}","perPage":12,"inherit":true},"layout":{"type":"constrained"}} -->
<div class="wp-block-query">
    <!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
        <!-- wp:pattern {"slug":"{{namespace}}/{{slug}}-card"} /-->
    <!-- /wp:post-template -->

    <!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"center"}} -->
        <!-- wp:query-pagination-previous /-->
        <!-- wp:query-pagination-numbers /-->
        <!-- wp:query-pagination-next /-->
    <!-- /wp:query-pagination -->

    <!-- wp:query-no-results -->
        <!-- wp:paragraph {"align":"center"} -->
        <p class="has-text-align-center"><?php esc_html_e( 'No {{name_plural_lower}} found.', '{{textdomain}}' ); ?></p>
        <!-- /wp:paragraph -->
    <!-- /wp:query-no-results -->
</div>
<!-- /wp:query -->
```

---

### Example Single Template (`templates/single-{{slug}}.html`)

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:post-featured-image {"isLink":false,"aspectRatio":"16/9"} /-->

    <!-- wp:group {"layout":{"type":"constrained","contentSize":"720px"}} -->
    <div class="wp-block-group">
        <!-- wp:post-title {"level":1} /-->

        <!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"{{namespace}}/fields","args":{"key":"{{slug}}_subtitle"}}}}} -->
        <p></p>
        <!-- /wp:paragraph -->

        <!-- wp:post-content {"layout":{"type":"constrained"}} /-->

        <!-- wp:pattern {"slug":"{{namespace}}/{{slug}}-meta"} /-->
    </div>
    <!-- /wp:group -->

    <!-- wp:pattern {"slug":"{{namespace}}/{{slug}}-related"} /-->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

---

## Mustache Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `{{slug}}` | Plugin slug (kebab-case) | `my-plugin` |
| `{{name}}` | Plugin display name | `My Plugin` |
| `{{name_singular}}` | Singular post type name | `Item` |
| `{{name_plural}}` | Plural post type name | `Items` |
| `{{namespace}}` | Plugin namespace | `my-plugin` |
| `{{namespace\|upper}}` | Uppercase namespace | `MY_PLUGIN` |
| `{{namespace\|pascalCase}}` | PascalCase namespace | `MyPlugin` |
| `{{textdomain}}` | Text domain | `my-plugin` |
| `{{taxonomy_singular}}` | Taxonomy singular | `Category` |
| `{{taxonomy_plural}}` | Taxonomy plural | `Categories` |
| `{{version}}` | Plugin version | `1.0.0` |
| `{{author}}` | Author name | `LightSpeed` |

---

## Key Differences from Single-Block Scaffold

| Feature | Single-Block | Multi-Block |
|---------|-------------|-------------|
| Block location | `src/{{slug}}/` | `src/blocks/{{slug}}-*/` |
| Auto-registration | Single block | Glob-based multi-block |
| Post Types | None | Full CPT support |
| Taxonomies | None | Custom taxonomy support |
| Custom Fields | None | SCF integration |
| Block Templates | None | Plugin-provided templates |
| Block Bindings | None | Field binding source |
| Patterns | None | PHP-based patterns |
| Template Parts | None | CPT-specific parts |

---

## Dependencies

### Required

- WordPress 6.5+ (for Block Bindings API and Plugin Dependencies)
- PHP 8.0+
- Node.js 18+
- **Secure Custom Fields** (declared via `Requires Plugins` header)

### WordPress Plugin Dependencies (WP 6.5+)

The `Requires Plugins` header in the main plugin file declares SCF as a required dependency:

```php
Requires Plugins: secure-custom-fields
```

**Behaviour:**

- Plugin cannot be installed until SCF is installed
- Plugin cannot be activated until SCF is activated
- SCF cannot be deactivated while this plugin is active
- SCF cannot be deleted while this plugin is installed

**Reference:** [WordPress Plugin Dependencies](https://make.wordpress.org/core/2024/03/05/introducing-plugin-dependencies-in-wordpress-6-5/)

### Defensive Coding

While Plugin Dependencies ensures SCF is active, defensive coding is still recommended:

```php
// Check for SCF/ACF functions before using them.
if ( function_exists( 'acf_add_local_field_group' ) ) {
    // Register fields.
}

if ( function_exists( 'get_field' ) ) {
    $value = get_field( 'my_field', $post_id );
}

if ( function_exists( 'have_rows' ) && have_rows( 'my_repeater', $post_id ) ) {
    while ( have_rows( 'my_repeater', $post_id ) ) {
        the_row();
        // Process row.
    }
}
```

---

## Secure Custom Fields Documentation

### Key SCF Resources

- **Plugin:** <https://wordpress.org/plugins/secure-custom-fields/>
- **GitHub:** <https://github.com/WordPress/secure-custom-fields>
- **Documentation:** <https://github.com/WordPress/secure-custom-fields/tree/trunk/docs>

### Field Types Used in This Scaffold

| Field Type | Description | Documentation |
|------------|-------------|---------------|
| Text | Single line text | `docs/features/field/text/` |
| Textarea | Multi-line text | `docs/features/field/textarea/` |
| Image | Image upload | `docs/features/field/image/` |
| Gallery | Multiple images | `docs/features/field/gallery/` |
| Repeater | Repeating subfields | `docs/features/field/repeater/` |
| Flexible Content | Layout-based editor | `docs/features/field/flexible-content/` |
| Post Object | Post relationships | `docs/features/field/post-object/` |
| Link | URL with title | `docs/features/field/link/` |
| Select | Dropdown selection | `docs/features/field/select/` |
| True/False | Boolean toggle | `docs/features/field/true-false/` |

### SCF API Functions

**Getting Field Values:**

```php
// Get single field value.
$value = get_field( 'field_name', $post_id );

// Get all fields for a post.
$fields = get_fields( $post_id );

// Get field object (with settings).
$field = get_field_object( 'field_name', $post_id );
```

**Repeater Fields:**

```php
// Loop through repeater.
if ( have_rows( 'repeater_name', $post_id ) ) {
    while ( have_rows( 'repeater_name', $post_id ) ) {
        the_row();

        // Get sub field values.
        $title = get_sub_field( 'title' );
        $image = get_sub_field( 'image' );
    }
}

// Reset repeater (if nested).
reset_rows();
```

**Flexible Content:**

```php
// Loop through flexible content.
if ( have_rows( 'sections', $post_id ) ) {
    while ( have_rows( 'sections', $post_id ) ) {
        the_row();

        // Get current layout name.
        $layout = get_row_layout();

        if ( 'text_section' === $layout ) {
            $heading = get_sub_field( 'heading' );
            $content = get_sub_field( 'content' );
        } elseif ( 'gallery_section' === $layout ) {
            $images = get_sub_field( 'gallery' );
        }
    }
}
```

**Registering Fields Programmatically:**

```php
// Register field group.
acf_add_local_field_group( array(
    'key'      => 'group_my_fields',
    'title'    => 'My Fields',
    'fields'   => array(
        array(
            'key'   => 'field_my_text',
            'label' => 'My Text',
            'name'  => 'my_text',
            'type'  => 'text',
        ),
    ),
    'location' => array(
        array(
            array(
                'param'    => 'post_type',
                'operator' => '==',
                'value'    => 'my_post_type',
            ),
        ),
    ),
) );
```

### SCF REST API

SCF fields are exposed via the WordPress REST API when enabled:

```php
// In field group settings, set 'show_in_rest' => true.
acf_add_local_field_group( array(
    'key'          => 'group_my_fields',
    'show_in_rest' => true,
    // ... other settings
) );
```

**REST API Endpoints:**

- `GET /wp-json/wp/v2/{post_type}?_fields=acf` – Get posts with ACF fields
- Fields appear in the `acf` object on post responses

---

## Reference Repository

This scaffold is based on: `lightspeedwp/single-block-plugin-scaffold`

See the source for additional configuration files, testing setup, and development workflows.
