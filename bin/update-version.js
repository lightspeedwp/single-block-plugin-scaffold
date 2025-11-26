#!/usr/bin/env node

/**
 * Update version script for {{slug}} plugin
 *
 * This script updates version numbers across all plugin files to maintain consistency.
 *
 * Usage: node bin/update-version.js <new-version>
 * Example: node bin/update-version.js 1.2.0
 */

const fs = require('fs');
const path = require('path');

// Get new version from command line argument
const newVersion = process.argv[2];

if (!newVersion) {
    console.error('❌ Please provide a version number as an argument.');
    console.error('Usage: node bin/update-version.js <new-version>');
    console.error('Example: node bin/update-version.js 1.2.0');
    process.exit(1);
}

/**
 * Comprehensive version validation
 */
function validateVersion(version) {
    // Remove any whitespace
    version = version.trim();

    // Check for malicious characters
    if (/[<>"'`\\;$&|]/.test(version)) {
        throw new Error('Version contains invalid characters');
    }

    // Validate semantic versioning format
    const versionRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

    if (!versionRegex.test(version)) {
        throw new Error('Invalid version format. Must follow semantic versioning (e.g., 1.2.0, 1.2.0-beta.1, 1.2.0+build.123)');
    }

    // Parse version parts
    const match = version.match(versionRegex);
    const major = parseInt(match[1], 10);
    const minor = parseInt(match[2], 10);
    const patch = parseInt(match[3], 10);

    // Sanity check version numbers
    if (major > 999 || minor > 999 || patch > 999) {
        throw new Error('Version numbers must be less than 1000');
    }

    return version;
}

try {
    const validatedVersion = validateVersion(newVersion);

    console.log(`🔄 Updating {{name}} to version ${validatedVersion}...`);
} catch (error) {
    console.error(`❌ ${error.message}`);
    console.error('Usage: node bin/update-version.js <new-version>');
    console.error('Example: node bin/update-version.js 1.2.0');
    process.exit(1);
}

// Continue with original version variable for replacements
const validVersion = newVersion.trim();

// Files to update with their patterns
const filesToUpdate = [
    {
        path: 'package.json',
        pattern: /"version":\s*"[^"]+"/,
        replacement: `"version": "${newVersion}"`
    },
    {
        path: 'composer.json',
        pattern: /"version":\s*"[^"]+"/,
        replacement: `"version": "${newVersion}"`
    },
    {
        path: '{{slug}}.php',
        pattern: /Version:\s*[\d.-]+/,
        replacement: `Version: ${newVersion}`
    },
    {
        path: '{{slug}}.php',
        pattern: /define\(\s*'{{namespace|upper}}_VERSION',\s*'[^']+'\s*\);/,
        replacement: `define( '{{namespace|upper}}_VERSION', '${newVersion}' );`
    },
    {
        path: 'src/{{slug}}/block.json',
        pattern: /"version":\s*"[^"]+"/,
        replacement: `"version": "${newVersion}"`
    },
    {
        path: 'README.md',
        pattern: /Stable tag:\s*[\d.-]+/i,
        replacement: `Stable tag: ${newVersion}`
    }
];

let updatedFiles = 0;
let errors = 0;

// Update each file
filesToUpdate.forEach(file => {
    const filePath = path.resolve(file.path);

    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️  File not found: ${file.path}`);
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        content = content.replace(file.pattern, file.replacement);

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${file.path}`);
            updatedFiles++;
        } else {
            console.warn(`⚠️  No changes made to ${file.path} (pattern not found)`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${file.path}:`, error.message);
        errors++;
    }
});

// Summary
console.log('\n📊 Update Summary:');
console.log(`✅ Files updated: ${updatedFiles}`);
if (errors > 0) {
    console.log(`❌ Errors: ${errors}`);
}

if (updatedFiles > 0) {
    console.log(`\n🎉 Successfully updated {{name}} to version ${newVersion}!`);
    console.log('\n💡 Next steps:');
    console.log('1. Review the changes with: git diff');
    console.log('2. Commit the changes: git add . && git commit -m "Bump version to ' + newVersion + '"');
    console.log('3. Create a git tag: git tag v' + newVersion);
    console.log('4. Build and test: npm run build && npm run test');
} else {
    console.log('\n⚠️  No files were updated. Please check if the version patterns are correct.');
    process.exit(1);
}

if (errors > 0) {
    process.exit(1);
}