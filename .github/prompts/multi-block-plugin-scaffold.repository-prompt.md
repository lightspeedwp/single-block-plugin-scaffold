---
title: Multi-Block Plugin Repository Prompt
description: Prompt template for creating a new multi-block plugin repository
category: Documentation
type: Repository Prompt
audience: Developers, AI Agents
date: 2025-12-01
---

## Multi-Block Plugin Scaffold – Repository Creation Prompt

Use this prompt when creating a new repository with GitHub Copilot's coding agent.

## 500-Character Prompt

```text
WordPress multi-block plugin scaffold. Full spec: https://raw.githubusercontent.com/lightspeedwp/single-block-plugin-scaffold/develop/.github/prompts/multi-block-plugin-scaffold.prompt.md – Include src/blocks/ (card, collection, slider, featured), inc/ classes (post-types, taxonomies, fields, repeater-fields, block-bindings, block-templates, patterns), patterns/, templates/, parts/. SCF repeaters, block bindings API. Mustache {{variables}}. WP 6.5+, PHP 8.0+. Tests + uninstall.php.
```

Character count: 499

---

## Alternative Prompts

### Focused on CPT (496 chars)

```text
WordPress multi-block plugin with CPT. Spec: https://raw.githubusercontent.com/lightspeedwp/single-block-plugin-scaffold/develop/.github/prompts/multi-block-plugin-scaffold.prompt.md – Custom post type, taxonomy, Secure Custom Fields with repeaters, block bindings API, block templates (single/archive), PHP patterns with i18n. Blocks: card, collection, slider, featured in src/blocks/. Components: Slider, PostSelector, RepeaterField. Mustache {{slug}}, {{namespace}}. WP 6.5+, PHP 8.0+.
```

### Minimal Reference (398 chars)

```text
Multi-block WordPress plugin. Full reference: https://raw.githubusercontent.com/lightspeedwp/single-block-plugin-scaffold/develop/.github/prompts/multi-block-plugin-scaffold.prompt.md – Multi-block structure (card, collection, slider, featured), CPT/taxonomy classes, SCF repeater fields, block bindings, templates, patterns. Shared React components and hooks. Tests included. Mustache variables. WP 6.5+.
```

---

## How to Use

1. Go to GitHub → New Repository
2. Enable "Add a README file" or similar option that triggers Copilot
3. In the "Tell Copilot what you want to build" field, paste the 500-character prompt
4. Copilot will:
   - Reference the prompt file in `lightspeedwp/single-block-plugin-scaffold`
   - Create the full multi-block structure
   - Open a PR with generated files
   - Request your review

---

## Post-Creation Steps

After Copilot creates the PR:

1. Review the generated structure
2. Run `npm install` and `composer install`
3. Replace mustache variables with your plugin values
4. Customise the CPT labels and fields
5. Add your blocks to `src/blocks/`
6. Build with `npm run build`
