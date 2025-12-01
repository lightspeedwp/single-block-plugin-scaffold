---
title: VS Code Configuration
description: Visual Studio Code workspace configuration
category: Project
type: Index
audience: Developers
date: 2025-12-01
---

# VS Code Configuration

This directory contains Visual Studio Code workspace configuration files.

## Files

- **extensions.json** - Recommended VS Code extensions for block development
- **launch.json** - Debugger configurations for PHP and JavaScript
- **settings.json** - Workspace-specific editor settings
- **tasks.json** - Custom VS Code tasks for build and testing

## Purpose

These configurations provide:

- Consistent editor settings across team members
- Recommended extensions for block development
- Debug configurations for testing blocks
- Automated build and test tasks

## Extensions

Recommended extensions typically include:

- ESLint
- Stylelint
- Prettier - Code formatter
- PHP Intelephense
- WordPress Snippets

## Usage

VS Code automatically detects and applies these configurations when you open the plugin directory. The editor will prompt to install recommended extensions on first open.

## Customization

Individual developers can override these settings in their user settings file, but workspace settings provide a consistent baseline for the team.
