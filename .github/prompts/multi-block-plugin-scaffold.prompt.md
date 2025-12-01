# Multi-Block Plugin Scaffold Prompt

> **Purpose:** Reference file for GitHub Copilot coding agent to bootstrap a multi-block WordPress plugin with custom post types, taxonomies, fields, block templates, and patterns.

---

## Quick Start for Copilot Coding Agent

Use this file as a comprehensive reference when creating the `multi-block-plugin-scaffold` repository. This scaffold extends the single-block-plugin-scaffold architecture to support:

1. Multiple blocks in `src/blocks/` directory
2. Custom Post Types with block templates
3. Custom Taxonomies
4. Custom Fields via Secure Custom Fields (SCF)
5. Block Patterns and Template Parts
6. Block Bindings for dynamic content

---

## Repository Structure

```
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
│   ├── class-block-templates.php   # Block template registration
│   ├── class-block-bindings.php    # Block bindings registration
│   ├── class-patterns.php          # Pattern registration
│   ├── db-migration.php            # Database migrations
│   ├── deprecation.php             # Deprecation notices
│   └── nonce.php                   # Nonce utilities
│
├── src/                            # Source files
│   ├── index.js                    # Main entry point (registers all blocks)
│   ├── blocks/                     # Block source files
│   │   ├── {{slug}}-card/          # Example: card block
│   │   │   ├── block.json
│   │   │   ├── index.js
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   ├── render.php
│   │   │   ├── style.scss
│   │   │   ├── editor.scss
│   │   │   └── view.js
│   │   ├── {{slug}}-grid/          # Example: grid block
│   │   │   └── ... (same structure)
│   │   ├── {{slug}}-archive/       # Example: archive block
│   │   │   └── ... (same structure)
│   │   └── {{slug}}-single/        # Example: single post block
│   │       └── ... (same structure)
│   │
│   ├── components/                 # Shared React components
│   │   ├── index.js
│   │   ├── PostSelector/
│   │   ├── TaxonomyFilter/
│   │   └── FieldDisplay/
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── index.js
│   │   ├── usePostType.js
│   │   ├── useTaxonomies.js
│   │   └── useFields.js
│   │
│   ├── utils/                      # Utility functions
│   │   └── index.js
│   │
│   └── scss/                       # Global styles
│       ├── style.scss
│       └── editor.scss
│
├── patterns/                       # Block patterns (PHP)
│   ├── {{slug}}-archive.php        # Archive pattern
│   ├── {{slug}}-single.php         # Single post pattern
│   ├── {{slug}}-card.php           # Card pattern
│   └── {{slug}}-grid.php           # Grid pattern
│
├── templates/                      # Block templates (HTML)
│   ├── single-{{slug}}.html        # Single CPT template
│   └── archive-{{slug}}.html       # Archive CPT template
│
├── parts/                          # Template parts (HTML)
│   ├── {{slug}}-header.html        # CPT-specific header
│   └── {{slug}}-meta.html          # CPT meta display
│
├── languages/                      # Translations
│   └── {{slug}}.pot
│
├── assets/                         # Static assets
│   ├── images/
│   └── icons/
│
├── tests/                          # Test files
│   ├── bootstrap.php
│   ├── phpstan-bootstrap.php
│   ├── php/                        # PHP unit tests
│   │   ├── test-post-types.php
│   │   ├── test-taxonomies.php
│   │   └── test-fields.php
│   ├── js/                         # JS unit tests
│   │   └── blocks.test.js
│   └── e2e/                        # E2E tests
│       ├── blocks.spec.js
│       └── post-type.spec.js
│
└── bin/                            # Build scripts
    ├── build.js
    ├── install-wp-tests.sh
    └── update-version.js
```

---

## Core Files Reference

### Main Plugin File (`{{slug}}.php`)

```php
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
- WordPress 6.5+ (for Block Bindings API)
- PHP 8.0+
- Node.js 18+

### Recommended
- [Secure Custom Fields](https://wordpress.org/plugins/secure-custom-fields/) for custom fields

---

## Reference Repository

This scaffold is based on: `lightspeedwp/single-block-plugin-scaffold`

See the source for additional configuration files, testing setup, and development workflows.
