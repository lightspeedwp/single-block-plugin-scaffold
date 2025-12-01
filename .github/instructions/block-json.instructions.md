---
title: Block JSON Instructions
description: Standards for block.json configuration
category: Project
type: Guide
audience: Developers
date: 2025-12-01
---

# block.json Instructions

## Essentials
- `name`, `title`, `description`, `category`, `keywords`, `supports`.
- Accessibility: clear `title`/`description`; limit complexity in controls.

## Attributes
- Validate and sanitize on save; provide reasonable defaults.
- Use `usesInnerBlocks` and `templateLock` appropriately.

## Variations/Transforms
- Define common starting points; ensure i18n and RTL safety.

## Related Instructions
- See also: [blocks.instructions.md](./blocks.instructions.md)
