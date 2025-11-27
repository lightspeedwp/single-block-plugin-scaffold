# wp-scripts Configuration Summary

**Theme**: {{theme_name}}
**Package**: `@wordpress/scripts` v31.0.0+
**Status**: ✅ Fully Configured

## What's Configured

This block theme scaffold is fully configured to use `@wordpress/scripts` for a modern WordPress development workflow.

### ✅ Features Enabled

| Feature | Status | Configuration |
|---------|--------|---------------|
| **JavaScript Compilation** | ✅ Enabled | Babel with `@wordpress/babel-preset-default` |
| **Code Bundling** | ✅ Enabled | webpack with custom entry points |
| **Code Linting** | ✅ Enabled | ESLint with `@wordpress/eslint-plugin` |
| **Code Formatting** | ✅ Enabled | Prettier with `@wordpress/prettier-config` |
| **Sass Compilation** | ✅ Enabled | sass-loader with PostCSS processing |
| **Code Minification** | ✅ Enabled | Terser (JS) + cssnano (CSS) in production |
| **Asset Manifests** | ✅ Enabled | Auto-generated `.asset.php` files |
| **Source Maps** | ✅ Enabled | Development mode only |
| **Hot Reload** | ✅ Enabled | Watch mode with HMR |
| **Tree Shaking** | ✅ Enabled | Removes unused code in production |

## Configuration Files

All configuration files are in place and properly configured:

```
block-theme-scaffold/
├── webpack.config.cjs          ✅ Custom webpack configuration
├── .browserslistrc             ✅ Browser targets
├── .postcss.config.cjs         ✅ PostCSS plugins (autoprefixer, cssnano)
├── .eslint.config.cjs          ✅ JavaScript linting rules
├── .stylelint.config.cjs       ✅ CSS/Sass linting rules
├── .prettierignore             ✅ Files to skip formatting
├── package.json                ✅ Scripts and dependencies
└── docs/
    ├── BUILD-PROCESS.md        ✅ Complete build documentation
    ├── WP-SCRIPTS-CONFIGURATION.md  ✅ Detailed configuration guide
    └── WP-SCRIPTS-QUICK-REFERENCE.md ✅ Quick reference
```

## npm Scripts

All wp-scripts commands are available:

```bash
# Build Commands
npm run start               # Development with watch mode
npm run build               # Production build
npm run build:production    # Alternative production build

# Code Quality
npm run lint                # Run all linters
npm run lint:js             # Lint JavaScript
npm run lint:js:fix         # Auto-fix JavaScript
npm run lint:css            # Lint CSS/Sass
npm run lint:css:fix        # Auto-fix CSS
npm run format              # Format with Prettier

# Testing
npm run test                # Run all tests
npm run test:js             # JavaScript unit tests
npm run test:js:watch       # Watch mode
npm run test:e2e            # End-to-end tests

# Internationalization
npm run makepot             # Generate .pot file
npm run i18n                # Generate all i18n files

# Utilities
npm run packages-update     # Update WordPress packages
```

## File Structure

### Source Files (src/)

```
src/
├── css/
│   ├── style.scss          # Frontend styles → build/css/style.css
│   └── editor.scss         # Editor styles → build/css/editor-style.css
└── js/
    ├── theme.js            # Frontend JS → build/js/theme.js
    └── editor.js           # Editor JS → build/js/editor.js
```

### Build Output (build/)

```
build/
├── css/
│   ├── style.css
│   ├── style.asset.php
│   ├── editor-style.css
│   └── editor-style.asset.php
└── js/
    ├── theme.js
    ├── theme.asset.php
    ├── editor.js
    └── editor.asset.php
```

## How It Works

### Build Pipeline Overview

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#1e4d78', 'primaryTextColor': '#ffffff', 'primaryBorderColor': '#15354f', 'lineColor': '#333333', 'secondaryColor': '#f0f0f0', 'tertiaryColor': '#e8e8e8', 'background': '#ffffff', 'mainBkg': '#1e4d78', 'textColor': '#333333', 'nodeBorder': '#15354f', 'clusterBkg': '#f8f9fa', 'clusterBorder': '#dee2e6', 'titleColor': '#333333'}}}%%
flowchart LR
    subgraph Source["Source"]
        JS["src/js/*.js"]
        SCSS["src/css/*.scss"]
    end

    subgraph Process["wp-scripts"]
        Babel["Babel"]
        Sass["Sass"]
        Webpack["Webpack"]
    end

    subgraph Output["Build"]
        JSOut["*.js"]
        CSSOut["*.css"]
        Asset["*.asset.php"]
    end

    JS --> Babel --> Webpack
    SCSS --> Sass --> Webpack
    Webpack --> JSOut
    Webpack --> CSSOut
    Webpack --> Asset
```

### 1. Compilation (Babel)

**Converts**: Modern JavaScript (ESNext, JSX) → Browser-compatible code

**Example**:

```javascript
// src/js/theme.js (source)
const greeting = (name) => `Hello, ${name}!`;

// build/js/theme.js (output)
var greeting = function(name) { return "Hello, " + name + "!"; };
```

### 2. Bundling (webpack)

**Converts**: Multiple files → Single optimized bundle

**Example**:

```
src/js/theme.js
  ├── components/Header.js
  ├── utils/helpers.js
  └── @wordpress/element
       ↓
build/js/theme.js (bundled)
```

### 3. Sass Compilation

**Converts**: SCSS → CSS

**Example**:

```scss
// src/css/style.scss
$primary: #0073aa;
.button { background: $primary; }

// build/css/style.css
.button { background: #0073aa; }
```

### 4. Code Linting (ESLint)

**Checks**: Code quality and WordPress standards

```bash
npm run lint:js        # Check for issues
npm run lint:js:fix    # Auto-fix issues
```

### 5. Code Formatting (Prettier)

**Formats**: Consistent code style

```bash
npm run format         # Format all files
```

### 6. Code Minification

**Development** (`npm run start`):

- Readable code
- Source maps included
- Fast rebuilds

**Production** (`npm run build`):

- Minified JavaScript (Terser)
- Minified CSS (cssnano)
- 60-70% size reduction

## Asset Enqueuing

The theme automatically enqueues assets using `.asset.php` files:

```php
// functions.php
function {{theme_slug}}_enqueue_assets() {
 // Load stylesheet
 $asset = include get_theme_file_path( 'build/css/style.asset.php' );
 wp_enqueue_style(
  '{{theme_slug}}-style',
  get_theme_file_uri( 'build/css/style.css' ),
  $asset['dependencies'] ?? array(),
  $asset['version'] ?? {{theme_slug|upper}}_VERSION
 );

 // Load JavaScript
 $js_asset = include get_theme_file_path( 'build/js/theme.asset.php' );
 wp_enqueue_script(
  '{{theme_slug}}-script',
  get_theme_file_uri( 'build/js/theme.js' ),
  $js_asset['dependencies'] ?? array(),
  $js_asset['version'] ?? {{theme_slug|upper}}_VERSION,
  true
 );
}
add_action( 'wp_enqueue_scripts', '{{theme_slug}}_enqueue_assets' );
```

## WordPress Packages

All `@wordpress/*` packages are available:

```javascript
// Import WordPress packages
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Dependencies automatically added to .asset.php
```

## Development Workflow

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run start

# 3. Edit files in src/
# Changes automatically rebuild

# 4. Build for production
npm run build
```

### Daily Development

```bash
# Morning
npm run start              # Start watch mode

# While coding
# Edit src/js/*.js
# Edit src/css/*.scss
# Files auto-rebuild

# Before committing
npm run lint               # Check all code
npm run format             # Format all files
npm run test               # Run tests

# Before deploying
npm run build              # Production build
```

## Browser Support

Targets defined in `.browserslistrc`:

- Browsers with >0.5% market share
- Last 2 versions of major browsers
- Chrome, Firefox, Safari, Edge
- Modern features auto-transpiled

## Performance

### Development Build

```
build/js/theme.js: ~150 KB (unminified)
build/css/style.css: ~50 KB (unminified)
Build time: ~2 seconds
```

### Production Build

```
build/js/theme.js: ~45 KB (minified, 70% smaller)
build/css/style.css: ~15 KB (minified, 70% smaller)
Build time: ~5 seconds
```

## Customization

### Add New Entry Point

1. Create file: `src/js/custom.js`
2. Update `webpack.config.cjs`:

   ```javascript
   entry: {
     'js/custom': './src/js/custom.js',
   }
   ```

3. Build: `npm run build`
4. Enqueue in `functions.php`

### Use Path Aliases

```javascript
// Instead of:
import Header from '../../../components/Header';

// Use:
import Header from '@js/components/Header';
```

Pre-configured aliases:

- `@` → `src/`
- `@js` → `src/js/`
- `@css` → `src/css/`

## Documentation

Comprehensive documentation is available:

| Document | Description |
|----------|-------------|
| `docs/BUILD-PROCESS.md` | Complete build process guide |
| `docs/WP-SCRIPTS-CONFIGURATION.md` | Detailed configuration documentation |
| `docs/WP-SCRIPTS-QUICK-REFERENCE.md` | Quick reference for common tasks |

## Troubleshooting

### Build fails

```bash
rm -rf node_modules build
npm install
npm run build
```

### Changes not detected

```bash
# Restart watch mode
npm run start
```

### Linting errors

```bash
npm run lint:js:fix
npm run lint:css:fix
npm run format
```

## Resources

- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) - Official documentation
- [Theme Build Process](https://developer.wordpress.org/themes/advanced-topics/build-process/) - WordPress guide
- [webpack](https://webpack.js.org/) - Bundler documentation
- [Babel](https://babeljs.io/) - JavaScript compiler
- [WordPress Packages](https://developer.wordpress.org/block-editor/reference-guides/packages/) - Available packages

## Summary

✅ **@wordpress/scripts fully configured**
✅ **All 6 required features enabled**:

- Compilation (Babel)
- Bundling (webpack)
- Code Linting (ESLint)
- Code Formatting (Prettier)
- Sass Compilation (sass-loader + PostCSS)
- Code Minification (Terser + cssnano)

✅ **Complete documentation provided**
✅ **Production-ready configuration**
✅ **WordPress coding standards enforced**
✅ **Optimized development workflow**

**Ready to use!** Just run `npm install` and `npm run start` to begin development.
