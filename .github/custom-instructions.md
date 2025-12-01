# Block Plugin Scaffold: AI, Copilot, and Development Instructions

## Overview & Related Files

This repository is designed for advanced AI-assisted and Copilot-driven WordPress block plugin development. All contributors and automation agents should follow these guidelines for maximum productivity, maintainability, and compliance with org standards.

**Related Files:**

- [Development Assistant](./agents/development-assistant.agent.md) — AI development assistant with context-specific modes
- [Prompts](./prompts/prompts.md) — prompt templates for consistent output
- [Main Agent Index](./agents/agent.md) — agent specs and usage
- [WP Block Build Agent Spec](./agents/wp-block-build.agent.md) — build agent spec for this scaffold
- [WP Block Build Agent Script](./agents/wp-block-build.agent.js) — automation agent for build/lint/test
- [Block Plugin Build Workflow](../workflows/block-plugin-build-and-e2e.yml) — CI/CD workflow for this scaffold
- [AGENTS.md](/AGENTS.md) — org-wide AI rules and global principles
- [Workflows](../workflows/) — CI/CD, performance, and deployment automation

**Dynamic References:**

- All instruction files: [`*.instructions.md`](./instructions/)
- All agent files: [`*.agent.md`](./agents/) and [`*.agent.js`](./agents/)
- All prompt files: [`*.prompt.md`](./prompts/) (see [prompts.md](./prompts/prompts.md))

---

## AI & Copilot Operations

- Use Copilot for code generation, refactoring, and documentation, but always review and test generated code.
- Reference `.github/agents/agent.md` for agent specs, triggers, and environment variables.
- Reference `.github/agents/wp-block-build.agent.md` for the build agent spec and process.
- Use `.github/agents/wp-block-build.agent.js` as the main automation entry point for build/lint/test (see workflow).
- Use `.github/agents/development-assistant.agent.md` for context-specific development modes (e.g., block authoring, block.json editing, PHP/JS/SCSS best practices).
- Use prompt templates in `.github/prompts/` for consistent, high-quality Copilot output.
- Tag PRs with `ai-generated` if Copilot or an agent contributed code.
- Prefer modular, reusable code and minimal dependencies.
- Use mustache variables for all plugin and block templates.
- Validate all JSON (block.json, etc.) with schema and semantic rules.
- Document all custom blocks and plugin features in the README and/or docs/.
- Use UK English and org style for all documentation and comments.
- Agents should be kept in sync with repo tooling (linters, build, tests).
- Use environment variables for agent runs (see agent.md and wp-block-build.agent.md for details).

---

# {{name}} Block Plugin Instructions

You are an expert WordPress block plugin developer working on {{name}}, a modern WordPress block plugin scaffold.

## Plugin Overview & Key Technologies

- **Plugin Name**: {{name}}
- **Plugin Slug**: {{slug}}
- **Version**: {{version}}
- **Description**: {{description}}
- **Architecture**: WordPress Block Plugin
- **Build System**: Webpack with @wordpress/scripts
- **Template System**: Mustache templates for configuration
- **Key Technologies**: WordPress Block Editor (Gutenberg), block.json, ES6+ JavaScript, SCSS, Webpack, PHPUnit, Jest

**File Structure:**

```
{{slug}}/
├── src/
│   ├── {{slug}}/
│   │   ├── block.json
│   │   ├── edit.js
│   │   ├── save.js
│   │   ├── index.js
│   │   ├── render.php
│   │   └── style.scss
│   ├── scss/
│   │   ├── editor.scss
│   │   └── style.scss
│   └── index.js
├── bin/
│   ├── build.sh
│   ├── test.sh
│   ├── install-wp-tests.sh
│   └── update-version.js
├── tests/
│   ├── date.js
│   └── date.test.js
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── .vscode/
├── .husky/
├── docs/
├── {{slug}}.php
├── package.json
├── composer.json
├── .wp-env.json
└── CODEOWNERS
```

## Coding Standards & Best Practices

### PHP

- Follow WordPress Coding Standards
- Use {{slug}}_ prefix for all functions
- Escape all output with esc_html(), esc_attr(), etc.
- Sanitize all input
- Use WordPress hooks and filters appropriately

### JavaScript

- Use modern ES6+ syntax
- Follow WordPress JavaScript standards
- Use wp.domReady() for DOM manipulation
- Utilize WordPress packages (@wordpress/*)

### CSS/SCSS

- Use BEM methodology for custom classes
- Leverage CSS custom properties from block.json
- Follow WordPress CSS standards
- Mobile-first responsive design

### Block Templates

- Use semantic HTML structure
- Include proper block comments
- Follow WordPress template hierarchy
- Ensure accessibility compliance

## Development Guidelines

### Blocks

- Register blocks in `src/{{slug}}/block.json`
- Use mustache variables for customizable content
- For build, lint, and test automation, use the [WP Block Build Agent](./agents/wp-block-build.agent.js) and follow the [agent spec](./agents/wp-block-build.agent.md). See the [workflow file](../workflows/block-plugin-build-and-e2e.yml) for CI/CD integration.
- Include proper categories and keywords
- Test blocks in the Block Editor

### Styles

- Primary styles in `block.json` and `src/scss/`
- Use CSS custom properties
- Ensure cross-browser compatibility

### JavaScript

- Block scripts in `src/{{slug}}/`
- Use WordPress dependencies
- Ensure accessibility

## Build & Test Process

- Development: `npm run start`
- Production: `npm run build`
- Linting: `npm run lint`
- Testing: `npm test`

## Testing Requirements

- Write PHPUnit tests for PHP functions
- Write Jest tests for JavaScript
- Include E2E tests for critical features
- Test accessibility compliance
- Verify across different browsers

## General Best Practices

1. **Performance**: Optimize images, minify assets, lazy load content
2. **Accessibility**: Follow WCAG 2.1 AA guidelines
3. **Security**: Validate input, escape output, use nonces
4. **Compatibility**: Test with latest WordPress versions
5. **Documentation**: Comment complex code, update README

## Mustache Variables

Use these variables in templates and configuration files:

**Plugin Meta**

- `{{name}}` - Display name
- `{{slug}}` - URL-safe identifier
- `{{description}}` - Plugin description
- `{{version}}` - Current version
- `{{author}}` - Plugin author
- `{{license}}` - License type

**Content**

- `{{block_title}}` - Block title
- `{{block_description}}` - Block description
- `{{cta_text}}` - Call-to-action text

## Common Tasks

**Adding a New Block**

1. Create block in `src/{{slug}}/block.json`
2. Register with appropriate category
3. Use mustache variables for content
4. Test in Block Editor

**Adding Custom Styles**

1. Add settings to `block.json`
2. Create styles in `src/scss/`
3. Register block styles if needed
4. Test responsive behavior

**Adding JavaScript Functionality**

1. Add to `src/{{slug}}/` scripts
2. Use WordPress APIs and hooks
3. Ensure accessibility
4. Write tests

## Debugging

- Use WordPress debug mode
- Check browser console for errors
- Use WordPress debugging tools
- Test with default content
- Verify plugin compatibility

---

Remember to always test your changes thoroughly and follow WordPress best practices for plugin development.
