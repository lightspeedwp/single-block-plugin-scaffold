---
title: Block Plugin Prompt Templates
description: Prompt templates for consistent AI-assisted single-block plugin development
category: Documentation
type: Prompt Templates
audience: Developers, AI Assistants
date: 2025-12-01
---

## Block Plugin Scaffold: Prompt Templates & Authoring

## Overview & Related Files

This repository uses prompt templates to ensure Copilot/AI output is consistent, high-quality, and tailored to block plugin development.

**Related Files:**

- [Development Assistant](../agents/development-assistant.agent.md) — AI development assistant with context-specific modes
- [Scaffold Generator](../agents/scaffold-generator.agent.md) — Interactive plugin generation agent
- [Custom Instructions](../custom-instructions.md) — main AI/Copilot and plugin instructions
- [Main Agent Index](../agents/agent.md) — agent specs and usage
- [WP Block Build Agent Spec](../agents/wp-block-build.agent.md) — build agent spec for this scaffold
- [WP Block Build Agent Script](../agents/wp-block-build.agent.js) — automation agent for build/lint/test
- [Block Plugin Build Workflow](../../workflows/block-plugin-build-and-e2e.yml) — CI/CD workflow for this scaffold

**Dynamic References:**

- All instruction files: [`*.instructions.md`](../instructions/)
- All agent files: [`*.agent.md`](../agents/) and [`*.agent.js`](../agents/)
- All prompt files: [`*.prompt.md`](../prompts/) (current directory)

---

## Available Prompts

| Prompt | Description | Usage |
|--------|-------------|-------|
| [generate-plugin.prompt.md](./generate-plugin.prompt.md) | Interactive block plugin generator | Start with "Generate a new block plugin" |

---

## Quick Start: Generate a New Block Plugin

To create a new WordPress block plugin from this scaffold:

1. **Use the prompt**: Open [generate-plugin.prompt.md](./generate-plugin.prompt.md) in Copilot
2. **Or invoke the agent**: Ask the [Scaffold Generator](../agents/scaffold-generator.agent.md)
3. **Or run directly**:

   ```bash
   node bin/generate-single-block-plugin.js --slug "my-block" --name "My Block" --author "Author"
   ```

---

## Prompt Authoring Guidelines

**Prompt Patterns:**

- Use mustache variables for all plugin and block references
- Include context (file, feature, or user story) in every prompt
- Prefer actionable, testable requests (e.g., "Generate a block for a testimonial section with a CTA")
- Reference chat modes for context-specific prompts

**Advanced Prompt Examples:**

- "Generate a block.json with custom attributes and supports."
- "Create a Playwright E2E test for the testimonial block."
- "Refactor this PHP function for security and performance."
- "Add a dark mode style variation to block.json."

**Best Practices:**

- Review all Copilot/AI output for accuracy, security, and accessibility
- Use prompt templates for repeatable tasks (see this folder for examples)
- Document new prompt patterns in this file for future contributors

---

# {{name}} Build Assistant

You are a WordPress block plugin build assistant for **{{name}}**. Help with plugin development, build processes, and WordPress best practices.

## Current Context

- **Project**: {{name}} WordPress Block Plugin
- **Technology**: WordPress Block Editor, block.json
- **Build Tools**: Webpack, @wordpress/scripts, SCSS, PostCSS
- **Standards**: WordPress Coding Standards, WCAG 2.1 AA

## Your Role

Provide expert guidance on:

- Block plugin development
- Build process optimization (see [WP Block Build Agent](../agents/wp-block-build.agent.js) and [workflow](../../workflows/block-plugin-build-and-e2e.yml))
- Performance and accessibility
- WordPress best practices

## Output Format

- Provide working code examples
- Include explanatory comments
- Follow WordPress coding standards
- Use mustache template variables when appropriate
- Include testing recommendations

## Key Considerations

- Always prioritize accessibility
- Follow WordPress security best practices
- Ensure mobile responsiveness
- Optimize for performance
- Use semantic HTML
- Implement proper error handling

Generate code that is production-ready, well-documented, and follows all relevant standards for **{{name}}**.
For automation, always ensure the [WP Block Build Agent](../agents/wp-block-build.agent.js) and [workflow](../../workflows/block-plugin-build-and-e2e.yml) are referenced and up to date.
