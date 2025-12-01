# Multi-Block Plugin Scaffold – Repository Creation Prompt

Use this prompt when creating a new repository with GitHub Copilot's coding agent.

## 500-Character Prompt

```text
Create a WordPress multi-block plugin scaffold based on lightspeedwp/single-block-plugin-scaffold. Reference .github/prompts/multi-block-plugin-scaffold.prompt.md for complete structure. Include: src/blocks/ for multiple blocks, inc/ with class-post-types.php, class-taxonomies.php, class-fields.php (SCF integration), class-block-bindings.php, class-block-templates.php, class-patterns.php. Add patterns/, templates/, parts/ directories. Use mustache {{variables}} throughout. WordPress 6.5+, PHP 8.0+.
```

Character count: 498

---

## Alternative Prompts

### Focused on CPT (489 chars)

```text
WordPress multi-block plugin scaffold extending lightspeedwp/single-block-plugin-scaffold. See .github/prompts/multi-block-plugin-scaffold.prompt.md for full spec. Key features: multiple blocks in src/blocks/, custom post type registration, custom taxonomy, Secure Custom Fields integration, block bindings API, block templates for single/archive views, PHP patterns with i18n. Use mustache {{slug}}, {{namespace}}, {{textdomain}} variables. Requires WP 6.5+, PHP 8.0+.
```

### Minimal Reference (342 chars)

```text
Multi-block WordPress plugin scaffold. Fork lightspeedwp/single-block-plugin-scaffold structure. Read .github/prompts/multi-block-plugin-scaffold.prompt.md for complete architecture including: multi-block src/blocks/ structure, CPT/taxonomy classes, SCF field integration, block bindings, templates, patterns. Mustache variables for customisation. WP 6.5+.
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
