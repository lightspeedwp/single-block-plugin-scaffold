# GitHub Actions Workflows

This directory contains GitHub Actions workflow definitions for CI/CD automation.

## Workflows

- **agent-workflow.yml** - AI agent automation workflow
- **block-plugin-build-and-e2e.yml** - Block build and end-to-end testing workflow
- **ci-cd.yml** - Continuous integration and deployment workflow

## Purpose

These workflows automate:

- Building block assets on push/PR
- Running automated block tests (unit, integration, E2E)
- Code quality checks (linting, formatting)
- Plugin version management and releases
- Block registration validation

## Triggers

Workflows typically run on:

- Push to main/develop branches
- Pull request creation/updates
- Manual workflow dispatch
- Scheduled intervals (for maintenance tasks)

## Usage

GitHub Actions automatically executes these workflows based on configured triggers. Check individual workflow files for specific configuration details.
