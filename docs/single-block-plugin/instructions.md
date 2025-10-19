---
title: "{{projectName}} - Instructions for Agents"
version: "{{version}}"
last_updated: "2024-10-18"
author: "{{author}}"
description: "Comprehensive instructions for AI agents working with {{projectName}}"
type: "documentation"
---

# Agent Instructions for {{projectName}}

This document provides comprehensive instructions for AI agents (like GitHub Copilot, ChatGPT, Claude, etc.) when working with the {{projectName}} codebase.

## Project Overview

{{projectName}} is a WordPress block plugin that provides {{description}}. The plugin follows WordPress and LightSpeed development standards and uses modern development practices.

### Key Technologies
- **WordPress 6.0+** - Block Editor (Gutenberg)
- **React 18+** - Frontend framework for block components
- **PHP 8.0+** - Server-side functionality
- **SCSS** - Styling with WordPress design system
- **Jest** - JavaScript unit testing
- **PHPUnit** - PHP unit testing
- **Playwright** - End-to-end testing

## Template System

This is a mustache-template-based scaffold. All files contain placeholders that should be replaced when creating a new plugin:

### Placeholder Mapping

```javascript
const placeholders = {
	'{{slug}}': 'my-awesome-block',           // Plugin slug (kebab-case)
	'{{namespace}}': 'mycompany',              // Namespace (kebab-case)
	'{{author}}': 'John Doe',                  // Author name
	'{{description}}': 'An awesome block',     // Plugin description
	'{{license}}': 'GPL-3.0-or-later',       // License identifier
	'{{textdomain}}': 'my-awesome-block',     // WordPress text domain
	'{{version}}': '1.0.0',                   // Plugin version
	'{{projectName}}': 'My Awesome Block',    // Human-readable name
};
```

### Placeholder Transforms

The system supports these transformations:

```javascript
// Available transforms
'{{slug|snakeCase}}'     // my_awesome_block
'{{slug|pascalCase}}'    // MyAwesomeBlock
'{{slug|camelCase}}'     // myAwesomeBlock
'{{namespace|upper}}'    // MYCOMPANY
```

## File Structure Understanding

```
{{slug}}/
├── src/                        # Source files
│   ├── {{slug}}/              # Main block directory
│   │   ├── block.json         # Block metadata
│   │   ├── edit.js            # Editor component
│   │   ├── save.js            # Save component
│   │   ├── index.js           # Block registration
│   │   ├── render.php         # Server-side render
│   │   └── style.scss         # Block styles
│   ├── scss/                  # Global styles
│   │   ├── editor.scss        # Editor-only styles
│   │   └── style.scss         # Frontend-only styles
│   └── index.js               # Main entry point
├── bin/                       # Build and utility scripts
├── tests/                     # Test files
├── .github/workflows/         # CI/CD configuration
├── .vscode/                   # VSCode configuration
├── docs/single-block-plugin/  # Documentation
└── [config files]            # Various configuration files
```

## Development Guidelines for Agents

### When Creating New Files

1. **Always use mustache placeholders** in new files
2. **Follow WordPress coding standards** strictly
3. **Include proper file headers** with package information
4. **Add appropriate comments** and documentation
5. **Ensure accessibility** compliance (WCAG 2.1 AA)

### File Header Templates

#### PHP Files
```php
<?php
/**
 * Brief description of file purpose.
 *
 * @package {{namespace}}
 * @since   {{version}}
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
```

#### JavaScript Files
```javascript
/**
 * Brief description of file purpose.
 *
 * @package {{namespace}}
 */
```

#### SCSS Files
```scss
/**
 * Brief description of styles.
 *
 * @package {{namespace}}
 */
```

### Code Patterns to Follow

#### React Components
```javascript
/**
 * Component description.
 *
 * @param {Object}   props             Component props.
 * @param {Object}   props.attributes  Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @return {Element} Component element.
 */
export default function ComponentName( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	
	return (
		<div { ...blockProps }>
			{/* Component content */}
		</div>
	);
}
```

#### PHP Functions
```php
/**
 * Function description.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 * @return string Rendered HTML.
 */
function {{namespace}}_{{slug|snakeCase}}_function_name( array $attributes, string $content, WP_Block $block ): string {
	// Function implementation
}
```

#### CSS Classes
```scss
.wp-block-{{namespace}}-{{slug}} {
	&__element {
		// Element styles
	}
	
	&--modifier {
		// Modifier styles
	}
	
	&.has-custom-class {
		// State styles
	}
}
```

### Security Best Practices

#### Input Sanitization
```php
// Sanitize text input
$text = sanitize_text_field( $input );

// Sanitize HTML content
$html = wp_kses_post( $input );

// Sanitize URLs
$url = esc_url( $input );
```

#### Output Escaping
```php
// Escape HTML output
echo esc_html( $content );

// Escape attributes
echo '<div class="' . esc_attr( $class ) . '">';

// Escape URLs
echo '<a href="' . esc_url( $url ) . '">';
```

#### Nonce Verification
```php
// Verify nonce
if ( ! wp_verify_nonce( $_POST['nonce'], 'action_name' ) ) {
	wp_die( __( 'Security check failed.', '{{textdomain}}' ) );
}
```

### Internationalization (i18n)

#### JavaScript
```javascript
import { __ } from '@wordpress/i18n';

// Basic translation
const text = __( 'Hello World', '{{textdomain}}' );

// With context
const text = _x( 'Post', 'noun', '{{textdomain}}' );
```

#### PHP
```php
// Basic translation
$text = __( 'Hello World', '{{textdomain}}' );

// Escaped output
echo esc_html__( 'Hello World', '{{textdomain}}' );
```

### Testing Patterns

#### JavaScript Unit Tests
```javascript
import { render, screen } from '@testing-library/react';
import ComponentName from '../component-name';

describe( 'ComponentName', () => {
	it( 'renders correctly', () => {
		const attributes = { content: 'Test' };
		const setAttributes = jest.fn();
		
		render( <ComponentName attributes={ attributes } setAttributes={ setAttributes } /> );
		
		expect( screen.getByText( 'Test' ) ).toBeInTheDocument();
	} );
} );
```

#### PHP Unit Tests
```php
<?php
class Test_{{namespace|pascalCase}}_Functionality extends WP_UnitTestCase {
	
	public function test_function_name() {
		$result = {{namespace}}_function_name( 'input' );
		$this->assertEquals( 'expected', $result );
	}
}
```

## Common Tasks and How to Handle Them

### Adding a New Block Attribute

1. **Update block.json**:
```json
{
	"attributes": {
		"newAttribute": {
			"type": "string",
			"default": ""
		}
	}
}
```

2. **Update edit.js**:
```javascript
const { newAttribute } = attributes;

const onChangeNewAttribute = ( value ) => {
	setAttributes( { newAttribute: value } );
};
```

3. **Update save.js and render.php** to use the new attribute

### Adding New Styles

1. **Add SCSS variables** in `src/scss/abstracts/_variables.scss`
2. **Create component styles** in appropriate SCSS files
3. **Follow BEM methodology** for class naming
4. **Use WordPress design system** values where possible

### Adding New Scripts

1. **Update package.json** with new script
2. **Document script purpose** in README.md
3. **Ensure script follows** existing patterns
4. **Add error handling** and validation

### Adding Tests

1. **JavaScript tests** go in same directory as component
2. **PHP tests** go in `tests/` directory
3. **E2E tests** go in `tests/e2e/`
4. **Follow existing test patterns** and naming conventions

## Error Handling and Validation

### Client-side Validation
```javascript
// Validate props
if ( ! attributes.content ) {
	return null;
}

// Handle errors gracefully
try {
	// Component logic
} catch ( error ) {
	console.error( 'Component error:', error );
	return <div>Error rendering component</div>;
}
```

### Server-side Validation
```php
// Validate input
if ( empty( $content ) || ! is_string( $content ) ) {
	return '';
}

// Sanitize and validate
$content = wp_kses_post( $content );
if ( empty( $content ) ) {
	return '';
}
```

## Performance Considerations

### JavaScript Optimization
- Use **React.memo()** for expensive components
- Implement **proper useEffect dependencies**
- Avoid **unnecessary re-renders**
- Use **code splitting** where appropriate

### PHP Optimization
- Use **transient caching** for expensive operations
- Implement **proper database queries**
- Avoid **global variable pollution**
- Use **WordPress hooks** efficiently

### CSS Optimization
- Use **CSS custom properties** for theming
- Implement **mobile-first** responsive design
- Minimize **specificity conflicts**
- Follow **WordPress block styles** patterns

## Accessibility Requirements

### ARIA Labels
```javascript
<button aria-label={ __( 'Button description', '{{textdomain}}' ) }>
	{ __( 'Button Text', '{{textdomain}}' ) }
</button>
```

### Keyboard Navigation
```javascript
const onKeyDown = ( event ) => {
	if ( event.key === 'Enter' || event.key === ' ' ) {
		event.preventDefault();
		handleAction();
	}
};
```

### Color Contrast
- Ensure **4.5:1 contrast ratio** for normal text
- Ensure **3:1 contrast ratio** for large text
- Test with **high contrast mode**
- Provide **focus indicators**

## Documentation Standards

### Code Comments
```javascript
/**
 * Function description explaining what it does.
 *
 * @param {string} param1 Description of first parameter.
 * @param {Object} param2 Description of second parameter.
 * @return {string} Description of return value.
 */
```

### Inline Comments
```javascript
// Explain complex logic or business rules
if ( complexCondition ) {
	// Why this condition exists and what it accomplishes
}
```

### README Updates
When adding features:
1. Update **feature list** in README.md
2. Add **usage examples** if applicable
3. Update **installation instructions** if needed
4. Add to **changelog** section

## Common Pitfalls to Avoid

### WordPress-specific
- ❌ Don't use PHP short tags (`<?`)
- ❌ Don't echo unescaped output
- ❌ Don't use deprecated WordPress functions
- ❌ Don't ignore WordPress coding standards
- ❌ Don't forget text domains for translations

### React-specific
- ❌ Don't mutate props directly
- ❌ Don't use array indexes as keys
- ❌ Don't forget to handle loading states
- ❌ Don't ignore prop validation
- ❌ Don't create unnecessary re-renders

### General
- ❌ Don't forget to test on mobile devices
- ❌ Don't ignore accessibility requirements
- ❌ Don't skip error handling
- ❌ Don't forget to update documentation
- ❌ Don't commit without running tests

## Agent Behavior Guidelines

### When Asked to Add Features
1. **Analyze existing patterns** in the codebase
2. **Follow established conventions** for naming and structure
3. **Update all relevant files** (tests, docs, etc.)
4. **Consider accessibility** implications
5. **Ensure backward compatibility** where possible

### When Debugging Issues
1. **Check browser console** for JavaScript errors
2. **Review PHP error logs** for server-side issues
3. **Validate HTML output** for markup issues
4. **Test across browsers** and devices
5. **Verify WordPress compatibility** versions

### When Refactoring Code
1. **Maintain existing functionality** exactly
2. **Update tests** to match changes
3. **Update documentation** if APIs change
4. **Follow WordPress deprecation** patterns if needed
5. **Test thoroughly** before completing

## Questions to Ask

When uncertain about implementation details:

1. **"Should this follow WordPress core patterns?"** - Usually yes
2. **"Is this accessible to screen readers?"** - Test and verify
3. **"Does this work on mobile devices?"** - Always test responsive design
4. **"Are there performance implications?"** - Consider caching and optimization
5. **"Is this properly internationalized?"** - All strings should be translatable

## Success Criteria

A successful implementation should:

✅ **Follow WordPress coding standards** completely
✅ **Work across all supported browsers** and devices
✅ **Be fully accessible** (WCAG 2.1 AA)
✅ **Include comprehensive tests** (unit, integration, E2E)
✅ **Have complete documentation** with examples
✅ **Use mustache placeholders** consistently
✅ **Handle errors gracefully** with user feedback
✅ **Perform well** on slower devices/connections

Remember: When in doubt, prioritize accessibility, security, and following WordPress best practices!