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

## Primary Agents

-   **Block Plugin Build Agent:**

    -   **Agent Script:** `.github/agents/wp-block-build.agent.js`
    -   **Spec:** `.github/agents/wp-block-build.agent.md`
    -   **Workflow:** `.github/workflows/block-plugin-build-and-e2e.yml`
    -   **Purpose:** Automate build, lint, test, and validation for this block plugin using WordPress and org standards.

-   **General Automation Agent Example:**
    -   **Agent Script:** `.github/agents/agent-script.js`
    -   **Workflow:** `.github/workflows/agent-workflow.yml`
    -   **Purpose:** Demonstrates a functional Node.js agent and workflow for file listing, environment echo, and artifact upload. Use as a template for new automation agents.

### Usage

-   **Block Plugin Build Agent:**

    -   **GitHub Actions:** See `.github/workflows/block-plugin-build-and-e2e.yml` for triggers and environment variables
    -   **Local:** `node .github/agents/wp-block-build.agent.js`

-   **General Automation Agent Example:**
    -   **GitHub Actions:** See `.github/workflows/agent-workflow.yml` for triggers and environment variables
    -   **Local:** `node .github/agents/agent-script.js --example`

### Environment Variables

-   `DRY_RUN` (default: `false`)
-   `VERBOSE` (default: `false`)
-   Additional secrets per workflow (e.g., `GITHUB_TOKEN` for label operations)

### Maintenance

-   Keep all agents aligned with repo tooling (linters, build, tests)
-   Update documentation and scripts as workflows evolve
-   See [WP Block Build Agent Spec](./wp-block-build.agent.md) for detailed build process and requirements
-   Use `.github/agents/agent-script.js` and `.github/workflows/agent-workflow.yml` as a starting point for new automation agents. Update references in this file and in all AI ops/instruction files as new agents are added.

---

---

> **Note:** The files `.github/agents/agent-script.js` and `.github/workflows/agent-workflow.yml` are now functional examples. Use them as templates for new agents. All AI ops and instruction files (see Related Files above) should reference these agents and workflows as appropriate for discoverability and onboarding.

For more information on agent usage, see [Custom Instructions](../custom-instructions.md), [Workflows](../../workflows/), and [Global AI Rules (AGENTS.md)](../../AGENTS.md).
