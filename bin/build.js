#!/usr/bin/env node

/**
 * Enhanced build wrapper for {{slug}} plugin
 *
 * Provides additional safety checks and error handling around wp-scripts build
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Color codes
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPrerequisites() {
    log('🔍 Checking build prerequisites...', 'cyan');

    // Check if package.json exists
    if (!fs.existsSync('package.json')) {
        log('❌ package.json not found', 'red');
        process.exit(1);
    }

    // Check if node_modules exists
    if (!fs.existsSync('node_modules')) {
        log('⚠️  node_modules not found. Running npm install...', 'yellow');
        try {
            execSync('npm install', { stdio: 'inherit' });
        } catch (error) {
            log('❌ Failed to install dependencies', 'red');
            process.exit(1);
        }
    }

    // Check if src directory exists
    if (!fs.existsSync('src')) {
        log('❌ src directory not found', 'red');
        process.exit(1);
    }

    // Check if src has any entry files
    const srcFiles = fs.readdirSync('src');
    if (srcFiles.length === 0) {
        log('❌ src directory is empty', 'red');
        process.exit(1);
    }

    log('✅ Prerequisites check passed', 'green');
}

function cleanBuildDirectory() {
    const buildDir = path.join(process.cwd(), 'build');

    if (fs.existsSync(buildDir)) {
        log('🧹 Cleaning previous build...', 'cyan');
        try {
            fs.rmSync(buildDir, { recursive: true, force: true });
            log('✅ Previous build cleaned', 'green');
        } catch (error) {
            log(`⚠️  Failed to clean build directory: ${error.message}`, 'yellow');
        }
    }
}

function runBuild() {
    log('🔨 Running build...', 'cyan');

    try {
        execSync('wp-scripts build', {
            stdio: 'inherit',
            env: {
                ...process.env,
                NODE_ENV: 'production'
            }
        });

        log('✅ Build completed successfully', 'green');
        return true;
    } catch (error) {
        log('❌ Build failed', 'red');

        // Provide helpful error messages
        if (error.message.includes('ENOSPC')) {
            log('💡 Tip: You may be out of disk space', 'yellow');
        } else if (error.message.includes('ENOMEM')) {
            log('💡 Tip: Try increasing Node.js memory: NODE_OPTIONS=--max-old-space-size=4096', 'yellow');
        }

        return false;
    }
}

function verifyBuildOutput() {
    log('🔍 Verifying build output...', 'cyan');

    const buildDir = path.join(process.cwd(), 'build');

    if (!fs.existsSync(buildDir)) {
        log('❌ Build directory was not created', 'red');
        return false;
    }

    const buildFiles = fs.readdirSync(buildDir);

    if (buildFiles.length === 0) {
        log('❌ Build directory is empty', 'red');
        return false;
    }

    // Check for expected files
    const hasJS = buildFiles.some(file => file.endsWith('.js'));
    const hasAssetFile = buildFiles.some(file => file.endsWith('.asset.php'));

    if (!hasJS) {
        log('⚠️  No JavaScript files found in build output', 'yellow');
    }

    if (!hasAssetFile) {
        log('⚠️  No .asset.php files found in build output', 'yellow');
    }

    // Display build summary
    log(`\n📊 Build summary:`, 'cyan');
    log(`   Files generated: ${buildFiles.length}`);

    const totalSize = buildFiles.reduce((sum, file) => {
        const filePath = path.join(buildDir, file);
        const stats = fs.statSync(filePath);
        return sum + stats.size;
    }, 0);

    log(`   Total size: ${(totalSize / 1024).toFixed(2)} KB\n`);

    log('✅ Build verification passed', 'green');
    return true;
}

function main() {
    const startTime = Date.now();

    log('\n🚀 Starting enhanced build process...\n', 'cyan');

    try {
        checkPrerequisites();
        cleanBuildDirectory();

        const buildSuccess = runBuild();

        if (!buildSuccess) {
            process.exit(1);
        }

        const verifySuccess = verifyBuildOutput();

        if (!verifySuccess) {
            log('⚠️  Build completed with warnings', 'yellow');
            process.exit(0);
        }

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        log(`\n🎉 Build completed successfully in ${duration}s\n`, 'green');

    } catch (error) {
        log(`\n❌ Unexpected error: ${error.message}\n`, 'red');
        process.exit(1);
    }
}

main();
