#!/bin/bash

# Build script for {{slug}} plugin
# This script installs dependencies and builds the plugin

set -euo pipefail

# Trap errors and cleanup
trap 'echo "❌ Build failed at line $LINENO. Exit code: $?"' ERR

# Color output helpers
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_error() {
    echo -e "${RED}❌ $1${NC}" >&2
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_info() {
    echo "ℹ️  $1"
}

echo "🚀 Building {{name}}..."

# Check Node.js version
if ! command -v node &> /dev/null; then
    log_error "Node.js is required but not installed. Please install Node.js first."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    log_error "Node.js 18.x or higher is required. Current version: $(node --version)"
    exit 1
fi
log_success "Node.js $(node --version) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    log_error "npm is required but not installed."
    exit 1
fi
log_success "npm $(npm --version) detected"

# Check Composer
if ! command -v composer &> /dev/null; then
    log_warning "Composer not found. Skipping PHP dependencies."
    SKIP_COMPOSER=1
else
    log_success "Composer $(composer --version 2>/dev/null | head -n1 | cut -d' ' -f3) detected"
    SKIP_COMPOSER=0
fi

# Verify package.json exists
if [ ! -f "package.json" ]; then
    log_error "package.json not found. Are you in the plugin root directory?"
    exit 1
fi

# Install npm dependencies with retry logic
echo "📦 Installing npm dependencies..."
MAX_RETRIES=3
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if npm ci --prefer-offline 2>/dev/null || npm install; then
        log_success "npm dependencies installed"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            log_warning "npm install failed, retrying ($RETRY_COUNT/$MAX_RETRIES)..."
            sleep 2
        else
            log_error "Failed to install npm dependencies after $MAX_RETRIES attempts"
            exit 1
        fi
    fi
done

# Install Composer dependencies
if [ $SKIP_COMPOSER -eq 0 ]; then
    echo "📦 Installing Composer dependencies..."
    if composer install --no-dev --optimize-autoloader --no-interaction 2>&1 | tee /tmp/composer-output.log; then
        log_success "Composer dependencies installed"
    else
        log_error "Failed to install Composer dependencies. See /tmp/composer-output.log"
        exit 1
    fi
fi

# Build the plugin
echo "🔨 Building assets..."
if npm run build 2>&1 | tee /tmp/build-output.log; then
    log_success "Assets built successfully"

    # Verify build output exists
    if [ ! -d "build" ] || [ -z "$(ls -A build 2>/dev/null)" ]; then
        log_warning "Build directory is empty or missing"
    fi
else
    log_error "Build failed. See /tmp/build-output.log"
    exit 1
fi

# Run linting (non-blocking)
echo "🧹 Linting code..."
if npm run lint 2>&1 | tee /tmp/lint-output.log; then
    log_success "Linting passed"
else
    log_warning "Linting found issues. See /tmp/lint-output.log"
    log_info "Continuing build despite linting warnings..."
fi

# Run tests (optional, can be skipped with --skip-tests)
if [ "${1:-}" != "--skip-tests" ]; then
    echo "🧪 Running tests..."
    if npm run test 2>&1 | tee /tmp/test-output.log; then
        log_success "Tests passed"
    else
        log_error "Tests failed. See /tmp/test-output.log"
        log_info "To skip tests, run: $0 --skip-tests"
        exit 1
    fi
else
    log_warning "Skipping tests as requested"
fi

log_success "Build completed successfully!"
echo ""
echo "Your plugin is ready! You can now:"
echo "  • Activate it in WordPress"
echo "  • Start development with: npm run start"
echo "  • Create a distribution with: npm run plugin-zip"
echo ""
log_info "Build logs saved to /tmp/*-output.log"