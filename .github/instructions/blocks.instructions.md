---
title: Blocks Instructions
description: Standards for WordPress block development
category: Project
type: Guide
audience: Developers
date: 2025-12-01
---

# Block Development Essentials

- Complete block.json; separate editor/front; prefer supports; i18n via `@wordpress/i18n`; efficient render callbacks.
- Use `usesInnerBlocks` and `templateLock` appropriately.
- Validate and sanitize attributes on save.
- Use variations and transforms for common starting points.

## Related Instructions
- See also: [block-json.instructions.md](./block-json.instructions.md)
