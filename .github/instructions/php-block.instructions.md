---
title: PHP Block Instructions
description: Standards for PHP in WordPress blocks
category: Project
type: Guide
audience: Developers
date: 2025-12-01
---

# PHP Block & Theme Instructions

## Pattern Registration
- Register block patterns using `register_block_pattern()` in `patterns/` directory.
- Use consistent naming: `lsx/[category]-[name]` (e.g., `lsx/cta-newsletter`).
- Include proper pattern categories and keywords.
- Provide descriptive viewportWidth values.

## Translation & Internationalization
- Use correct text domain for all translations: `__('text', 'lsx-theme')`.
- Ensure all user-visible strings are translatable.
- Use proper escaping functions with translations: `esc_html__()`, `esc_attr__()`.

## Security & Data Handling
- Sanitize all dynamic output using appropriate escaping functions.
- Validate and sanitize all input data before use.
- Use nonces for form submissions and AJAX requests.

## Asset Management
- Do not enqueue scripts/styles inline—use WordPress enqueue functions.
- Properly handle dependencies in enqueue functions.
- Use versioning for cache busting.
- Localize JavaScript data using `wp_localize_script()`.

## Block Pattern Best Practices
- Keep pattern names unique and descriptive.
- Use meaningful comments to document pattern sections.
- Maintain proper block structure and nesting.
- Ensure blocks use theme.json variables for styling consistency.
- Test patterns across different viewport sizes.

## Performance Considerations
- Avoid unnecessary database queries in pattern rendering.
- Optimize image usage in patterns.
- Use WordPress core blocks whenever possible.

## Related Instructions
- See also: [php-wordpress.instructions.md](./php-wordpress.instructions.md)
