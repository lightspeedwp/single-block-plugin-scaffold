---
title: WP Block Build Agent Spec
description: Specification for the build, lint, and test automation agent for single-block plugins
category: Agent
type: Agent Specification
audience: Developers, AI Agents
date: 2025-12-01
---

# WP Block Build Agent Spec

This document defines the specification for the `wp-block-build.agent.js` automation agent, responsible for managing the build, lint, and test lifecycle of a single-block WordPress plugin. It is tightly integrated with the repository's workflows and follows the latest best practices from the official WordPress block development tutorial.

---

## Purpose

-   Automate the build, lint, test, and validation process for a single-block plugin.
-   Ensure all code changes are validated against WordPress and org standards before merging or deployment.
-   Provide a consistent, reproducible build and test process for local and CI/CD environments.

---

## Key References

-   [Main Agent Index](./agent.md)
-   [Global AI Rules (AGENTS.md)](../../AGENTS.md)
-   [WordPress Block Editor Tutorial](https://developer.wordpress.org/block-editor/getting-started/tutorial/)
-   [Block.json Reference](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-json/)

---

## Build Process Overview

1. **Install**: Ensure all required dependencies are installed (`npm ci`).
2. **Lint**: Run all linters (JS, CSS, PHP) and fail on any errors.
3. **Build**: Use `@wordpress/scripts` and custom webpack config to build assets.
4. **Test**: Run all tests (Jest, Playwright, PHPunit, etc.).
5. **Report**: Output a summary of all steps, errors, and next actions.

---

## Environment Variables

-   `DRY_RUN`: If true, only print steps without executing them.
-   `VERBOSE`: If true, print detailed logs for each step.
-   `GITHUB_TOKEN`: For workflow and label operations (if needed).

---

## Maintenance & Best Practices

-   Keep this spec in sync with the [WordPress Block Editor Tutorial](https://developer.wordpress.org/block-editor/getting-started/tutorial/) and org [AGENTS.md](../../AGENTS.md).
-   Update the agent and this spec as new best practices or requirements emerge.
-   Ensure all contributors are aware of this spec and reference it in PRs and workflow changes.

---

## Example Build Command

```sh
node .github/agents/wp-block-build.agent.js --verbose
```

---

## See Also

-   [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
-   [Block.json Reference](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-json/)
-   [Block Development Examples](https://github.com/WordPress/block-development-examples)
