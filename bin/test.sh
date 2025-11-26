#!/bin/bash

# Test script for {{slug}} plugin
# Runs all plugin tests (JS, PHP, E2E)

set -e

echo "🧪 Running tests for {{name}}..."

# Check if required tools are available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    exit 1
fi

if ! command -v composer &> /dev/null; then
    echo "❌ Composer is required but not installed."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# Install Composer dependencies if vendor doesn't exist
if [ ! -d "vendor" ]; then
    echo "📦 Installing Composer dependencies..."
    composer install
fi

# Run JavaScript unit tests
echo "🟡 Running JavaScript unit tests..."
npm run test:unit

# Run PHP unit tests
echo "🟡 Running PHP unit tests..."
composer run test

# Run PHP static analysis
echo "🔍 Running PHP static analysis..."
composer run analyse

# Run linting
echo "🧹 Running linting..."
npm run lint
composer run lint

# Run E2E tests (optional - requires wp-env)
if command -v wp-env &> /dev/null; then
    echo "🟡 Running E2E tests..."
    npm run test:e2e
else
    echo "⚠️  Skipping E2E tests (wp-env not available)"
fi

echo "✅ All tests completed successfully!"