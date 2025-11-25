# Block Plugin Scaffold: Main Agent Index

## Overview & Related Files

This file documents the primary automation agent(s) for this repository, their purpose, usage, and integration with workflows. Reference this file for agent specs, triggers, and environment variables.

**Related Files:**

-   [Custom Instructions](../custom-instructions.md) — main AI/Copilot and plugin instructions
-   [Chat Modes](../chatmodes/chatmodes.md) — context-specific Copilot prompts
-   [Prompts](../prompts/prompts.md) — prompt templates for consistent output
-   [Global AI Rules (AGENTS.md)](../../AGENTS.md) — org-wide agent rules, coding standards, and cross-references
-   [WP Block Build Agent Spec](./wp-block-build.agent.md) — detailed build agent spec for single block plugin

---

## Primary Agent: wp-block-build.agent.js

-   **Agent Script:** `.github/agents/wp-block-build.agent.js`
-   **Spec:** `.github/agents/wp-block-build.agent.md`
-   **Workflow:** `.github/workflows/block-plugin-build-and-e2e.yml`
-   **Purpose:** Automate build, lint, test, and validation for this block plugin using WordPress and org standards.

### Usage

-   **GitHub Actions:** See the workflow file for triggers and environment variables
-   **Local:** `node .github/agents/wp-block-build.agent.js`

### Environment Variables

-   `DRY_RUN` (default: `false`)
-   `VERBOSE` (default: `false`)
-   Additional secrets per workflow (e.g., `GITHUB_TOKEN` for label operations)

### Maintenance

-   Keep the agent aligned with repo tooling (linters, build, tests)
-   Update documentation and scripts as workflows evolve
-   See [WP Block Build Agent Spec](./wp-block-build.agent.md) for detailed build process and requirements

---

For more information on agent usage, see [Custom Instructions](../custom-instructions.md), [Workflows](../../workflows/), and [Global AI Rules (AGENTS.md)](../../AGENTS.md).
