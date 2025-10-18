---
title: "{{projectName}} - WordPress Block Plugin"
version: "{{version}}"
last_updated: "2024-10-18"
author: "{{author}}"
description: "{{description}}"
type: "documentation"
---

# {{projectName}}

{{description}}

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   composer install
   ```

2. **Start Development**
   ```bash
   npm run start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Development

This plugin uses modern WordPress development practices:

- **WordPress Scripts** for building and linting
- **React/JSX** for block editor components
- **SCSS** for styling
- **PHP 8.0+** for server-side functionality
- **PHPUnit** for PHP testing
- **Jest** for JavaScript testing
- **Playwright** for E2E testing

## Placeholder Mappings

This template uses mustache-style placeholders that should be replaced when scaffolding a new plugin:

| Placeholder         | Description                              | Example                    |
|---------------------|------------------------------------------|----------------------------|
| `{{slug}}`          | Plugin slug (kebab-case)                 | `my-awesome-block`         |
| `{{namespace}}`     | Plugin namespace (kebab-case)            | `mycompany`                |
| `{{author}}`        | Plugin author                            | `John Doe`                 |
| `{{description}}`   | Plugin description                       | `An awesome block plugin`  |
| `{{license}}`       | License identifier                       | `GPL-3.0-or-later`        |
| `{{textdomain}}`    | WordPress text domain                    | `my-awesome-block`         |
| `{{version}}`       | Plugin version                           | `1.0.0`                    |
| `{{projectName}}`   | Human-readable project name             | `My Awesome Block`         |

## File Structure

```
{{slug}}/
├── src/
│   ├── {{slug}}/
│   │   ├── block.json          # Block metadata
│   │   ├── edit.js             # Editor component
│   │   ├── save.js             # Save component
│   │   ├── index.js            # Block registration
│   │   ├── render.php          # Server-side render
│   │   └── style.scss          # Block styles
│   ├── scss/
│   │   ├── editor.scss         # Editor-only styles
│   │   └── style.scss          # Frontend-only styles
│   └── index.js                # Main entry point
├── bin/
│   ├── build.sh               # Build script
│   ├── test.sh                # Test script
│   ├── install-wp-tests.sh    # WordPress test setup
│   └── update-version.js      # Version update utility
├── tests/
│   ├── date.js                # Date utility functions
│   └── date.test.js           # Date utility tests
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions workflow
├── .vscode/                   # VSCode configuration
├── .husky/                    # Git hooks
├── docs/                      # Documentation
├── {{slug}}.php               # Main plugin file
├── package.json               # Node.js dependencies
├── composer.json              # PHP dependencies
├── .wp-env.json               # WordPress environment
└── CODEOWNERS                 # Code ownership
```

## Scripts

### NPM Scripts

- `npm run build` - Build production assets
- `npm run start` - Start development with watch mode
- `npm run lint` - Lint JavaScript and CSS
- `npm run test` - Run all tests
- `npm run env:start` - Start WordPress environment
- `npm run plugin-zip` - Create distribution ZIP

### Composer Scripts

- `composer run lint` - Lint PHP code
- `composer run test` - Run PHP tests
- `composer run analyse` - Run static analysis

## Contributing

See [CONTRIBUTING.md](./docs/single-block-plugin/CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the {{license}} License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please see [SUPPORT.md](./docs/single-block-plugin/SUPPORT.md).
