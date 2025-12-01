---
title: Generator System
description: Comprehensive generator system for creating WordPress block plugins
category: Development
type: Guide
audience: Developers
date: 2025-12-01
---

## Overview

The Single Block Plugin Scaffold includes a comprehensive generator system that provides multiple ways to create new WordPress block plugins. This system consists of three main components that work together to guide users through plugin creation.

## Components

### 1. Generator Prompt (`generate-plugin.prompt.md`)

Located in `.github/prompts/generate-plugin.prompt.md`, this file provides a structured prompt template for AI-assisted plugin generation.

**Features:**

- Multi-stage discovery process
- Stage-by-stage questions for gathering requirements
- Generation command templates
- Comprehensive requirement gathering workflow

**Stages:**

1. **Project Discovery** - Basic project information (name, slug, description)
2. **Plugin Configuration** - WordPress plugin settings and metadata
3. **Block Configuration** - Block attributes, supports, and features
4. **Design System** - Colours, typography, and styling preferences
5. **Build Configuration** - Development tools and workflow preferences

### 2. Scaffold Generator Agent (`scaffold-generator.agent.md`)

Located in `.github/agents/scaffold-generator.agent.md`, this document defines the interactive agent specification for plugin generation.

**Features:**

- Interactive conversation flow
- Validation rules and error handling
- Integration with generator scripts
- Step-by-step guidance through the generation process

**Key Capabilities:**

- Validates user input at each stage
- Provides contextual help and examples
- Handles edge cases and common errors
- Ensures all required information is collected

### 3. Scaffold Generator Script (`scaffold-generator.agent.js`)

Located in `.github/agents/scaffold-generator.agent.js`, this is the executable implementation that performs the actual plugin generation.

**Features:**

- Interactive CLI prompts using inquirer
- Mustache template processing
- File system operations with validation
- Configuration schema validation
- Comprehensive error handling

**Capabilities:**

- Creates complete plugin structure
- Processes template variables
- Generates block.json with user preferences
- Sets up build configuration
- Creates initial block files (edit.js, save.js, style.scss)

## Usage Options

Users can start a new block plugin project using any of these three methods:

### Option 1: Prompt-Based Generation

Use the workspace prompt to initiate generation:

```text
@workspace /generate-plugin
```

This triggers the AI assistant to use the generation prompt template and guide you through the process interactively.

### Option 2: Agent-Based Generation

Request the scaffold generator agent directly:

```text
Generate a new block plugin from scaffold
```

The agent will follow the specification in `scaffold-generator.agent.md` to collect requirements and generate the plugin.

### Option 3: Direct Script Execution

Run the generator script directly from the command line:

```bash
node bin/generate-plugin.js
```

This provides a traditional CLI interface with interactive prompts.

## Updated Index Files

### prompts.md

The prompts index has been updated with a quick start section that presents all three usage options:

- **Quick Start** section added at the top
- Links to all three generation methods
- Clear descriptions of when to use each approach
- Cross-references to related documentation

### agent.md

The agent index now lists the Scaffold Generator first for better discoverability:

- **Scaffold Generator** listed at the top of the implementations section
- Links to both the agent specification (`.md`) and implementation (`.js`)
- Usage examples and common workflows
- Integration with other agents (e.g., Development Assistant)

## Workflow Integration

### Pre-Commit Process

The generator system integrates with the standard development workflow:

1. **Generation** - Use any of the three methods above
2. **Customisation** - Modify generated files as needed
3. **Validation** - Run linting and tests
4. **Commit** - Husky pre-commit hooks run automatically

### Linting

The generated plugin follows all LightSpeed coding standards:

- ESLint for JavaScript/JSX
- Prettier for code formatting
- PHPCS for PHP code standards
- Stylelint for CSS/SCSS

## Development Assistant Integration

The generator system works alongside the Development Assistant agent:

1. **Generator** creates the initial plugin structure
2. **Development Assistant** helps with ongoing development:
   - Code review and suggestions
   - Block development
   - Build process optimisation
   - Testing strategies

## Configuration Schema

The generator validates all configuration against defined schemas:

### Plugin Schema

```javascript
{
  name: String,           // Plugin name (required)
  slug: String,           // Plugin slug (required)
  description: String,    // Plugin description
  author: String,         // Plugin author
  authorUri: String,      // Author URI
  version: String,        // Version number
  // ... additional fields
}
```

### Block Schema

```javascript
{
  title: String,          // Block title (required)
  description: String,    // Block description
  category: String,       // Block category
  icon: String,           // Block icon
  keywords: Array,        // Search keywords
  attributes: Object,     // Block attributes
  supports: Object,       // Block supports
  // ... additional fields
}
```

See `scaffold-generator.agent.js` for the complete schema definitions.

## Error Handling

The generator system includes comprehensive error handling:

- **Validation Errors** - Invalid input is caught early with helpful messages
- **File System Errors** - Prevents overwriting existing projects
- **Template Errors** - Validates mustache templates before processing
- **Configuration Errors** - Ensures all required settings are provided

## Testing

The generator system includes comprehensive tests:

- **Unit Tests** - Located in `tests/agents/scaffold-generator.agent.test.js`
- **Integration Tests** - Validates end-to-end generation workflow
- **Validation Tests** - Ensures configuration schemas are enforced
- **Block Tests** - Validates generated block functionality

Run tests with:

```bash
npm run test:agents
```

## Best Practices

### For Users

1. **Start with the Prompt** - Use `@workspace /generate-plugin` for AI-guided generation
2. **Review Generated Code** - Always review generated files before committing
3. **Customise Gradually** - Start with defaults, then customise as needed
4. **Follow Standards** - Generated code follows LightSpeed standards automatically

### For Contributors

1. **Update All Three Components** - Keep prompt, agent spec, and script in sync
2. **Validate Changes** - Run tests after modifying generator code
3. **Document New Features** - Update this file when adding capabilities
4. **Maintain Backwards Compatibility** - Ensure existing projects aren't affected

## Block Categories

The generator supports the following block categories:

- `text` - Text-based blocks (paragraphs, headings, lists)
- `media` - Media blocks (images, videos, audio)
- `design` - Design and layout blocks
- `widgets` - Widget-style blocks (search, categories, tags)
- `theme` - Theme-specific blocks (site logo, navigation)
- `embed` - Embed blocks for external content

## Troubleshooting

### Common Issues

**Generator script not found:**

```bash
# Ensure you're in the scaffold directory
cd /path/to/single-block-plugin-scaffold
node bin/generate-plugin.js
```

**Validation errors:**

- Check that all required fields are provided
- Ensure slug uses lowercase letters and hyphens only
- Verify version numbers follow semver format
- Ensure block category is valid

**Template errors:**

- Ensure mustache variables are properly formatted
- Check that all required template variables are defined
- Validate JSON files (block.json, package.json) after generation

**Build errors:**

- Run `npm install` after generation
- Ensure Node.js version matches .nvmrc (24.x)
- Check webpack configuration for syntax errors

## Related Documentation

- [Scaffold Generator Agent Specification](.github/agents/scaffold-generator.agent.md)
- [Generation Prompt Template](.github/prompts/generate-plugin.prompt.md)
- [Agent Index](.github/agents/agent.md)
- [Prompts Index](.github/prompts/prompts.md)
- [Development Assistant Agent](.github/agents/development-assistant.agent.md)
- [Block Development Guide](BLOCK-DEVELOPMENT.md)
- [Build Process](BUILD-PROCESS.md)

## Version History

- **v1.0.0** - Initial generator system with three usage options
- Added multi-stage discovery process
- Integrated with Development Assistant agent
- Updated index files for better discoverability
- Added block category validation

## Support

For issues or questions about the generator system:

1. Check the [SUPPORT.md](../SUPPORT.md) file
2. Review the [CONTRIBUTING.md](../CONTRIBUTING.md) guidelines
3. Open an issue on the repository
4. Consult the [Development Assistant](.github/agents/development-assistant.agent.md) for AI-guided help
