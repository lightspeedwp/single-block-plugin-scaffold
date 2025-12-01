---
title: "{{name}} - WordPress Block Plugin"
version: "{{version}}"
last_updated: "2024-10-18"
author: "{{author}}"
description: "{{description}}"
type: "documentation"
---

# {{name}}

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
- **Jest** for JavaScript testing with coverage
- **Playwright** for E2E testing
- **Lighthouse CI** for performance monitoring
- **Docker/DevContainer** for consistent development environments
- **GitHub Actions** for CI/CD automation

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
| `{{name}}`          | Human-readable plugin name               | `My Awesome Block`         |

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
├── .devcontainer/             # Docker development container
│   ├── devcontainer.json     # VS Code dev container config
│   ├── docker-compose.yml    # Docker services (WP, MySQL, etc.)
│   └── Dockerfile            # Container definition
├── .github/
│   └── workflows/
│       ├── ci-cd.yml          # Main CI/CD pipeline
│       ├── code-quality.yml   # Coverage & quality gates
│       ├── deploy-wporg.yml   # WordPress.org deployment
│       └── release.yml        # Version bumping & releases
├── .vscode/                   # VSCode configuration
├── .husky/                    # Git hooks
├── .wordpress-org/            # WordPress.org assets
├── assets/                    # Plugin assets (icons, banners)
├── docs/                      # Documentation
├── inc/                       # PHP utilities
│   ├── db-migration.php      # Database migrations
│   ├── deprecation.php       # Deprecation workflow
│   └── nonce.php             # Nonce utilities
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
- `npm run makepot` - Generate translation POT file
- `npm run makejson` - Generate JSON translation files
- `npm run i18n` - Complete i18n workflow (makepot + makejson)
- `npm run env:start` - Start WordPress environment
- `npm run plugin-zip` - Create distribution ZIP

### Composer Scripts

- `composer run lint` - Lint PHP code
- `composer run test` - Run PHP tests
- `composer run analyse` - Run static analysis

### Performance & Quality

- `npm run lighthouse` - Run Lighthouse CI audits
- `npm run size-limit` - Check bundle size limits
- `npm run analyze-bundle` - Analyze webpack bundle
- `npm run performance` - Run all performance checks

## Docker Development

This scaffold includes a complete Docker-based development environment:

1. **Open in VS Code** with the Dev Containers extension
2. **Reopen in Container** when prompted
3. **Services included:**
   - WordPress (port 8080)
   - MariaDB (port 3306)
   - phpMyAdmin (port 8081)
   - MailHog (port 8025)

```bash
# Or manually start the environment
cd .devcontainer && docker-compose up -d
```

## CI/CD Pipeline

Automated workflows handle:

- **Linting & Testing** - On every push/PR
- **Security Audits** - Dependency vulnerability checks
- **E2E Tests** - Playwright browser testing
- **Code Coverage** - JavaScript & PHP coverage with Codecov
- **Bundle Analysis** - Size tracking and quality gates
- **Releases** - Automated version bumping and changelog
- **WordPress.org Deploy** - SVN deployment on release

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the {{license}} License - see the [LICENSE](LICENSE) file for details.

## Support

### Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Build Process](docs/BUILD-PROCESS.md)** - Complete build system guide
- **[Testing Guide](docs/TESTING.md)** - Running and writing tests
- **[Internationalization](docs/INTERNATIONALIZATION.md)** - i18n and translation guide
- **[Tool Configuration](docs/TOOL-CONFIGS.md)** - Linting, formatting, and build tools
- **[Agents Guide](docs/AGENTS.md)** - AI agents and automation
- **[Workflows Guide](docs/WORKFLOWS.md)** - CI/CD workflows documentation
- **[API Reference](docs/API-REFERENCE.md)** - Plugin API documentation
- **[Performance](docs/PERFORMANCE.md)** - Performance optimization guide
- **[Security](docs/SECURITY-HEADERS.md)** - Security best practices

**Configuration Documentation** (`docs/config/`):

- [wp-scripts](docs/config/wp-scripts.md) - Complete @wordpress/scripts guide
- [Webpack](docs/config/webpack.md) - Bundling configuration
- [Babel](docs/config/babel.md) - JavaScript compilation
- [ESLint](docs/config/eslint.md) - JavaScript linting
- [Stylelint](docs/config/stylelint.md) - CSS/Sass linting
- [PostCSS](docs/config/postcss.md) - CSS processing
- [Jest](docs/config/jest.md) - Unit testing
- [Playwright](docs/config/playwright.md) - E2E testing
- [Prettier](docs/config/prettier.md) - Code formatting

### Community Support

For support, please see:

- [Support Documentation](SUPPORT.md)
- [Internationalization Guide](docs/INTERNATIONALIZATION.md)
