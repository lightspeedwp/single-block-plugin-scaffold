#!/bin/bash

# Build script for {{slug}} plugin
# This script installs dependencies and builds the plugin

set -e

echo "🚀 Building {{projectName}}..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js first."
    exit 1
fi

# Check if Composer is installed
if ! command -v composer &> /dev/null; then
    echo "❌ Composer is required but not installed. Please install Composer first."
    exit 1
fi

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Install Composer dependencies
echo "📦 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

# Build the plugin
echo "🔨 Building assets..."
npm run build

# Run linting
echo "🧹 Linting code..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test

echo "✅ Build completed successfully!"
echo ""
echo "Your plugin is ready! You can now:"
echo "  • Activate it in WordPress"
echo "  • Start development with: npm run start"
echo "  • Create a distribution with: npm run plugin-zip"