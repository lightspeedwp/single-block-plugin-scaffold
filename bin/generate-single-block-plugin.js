#!/usr/bin/env node

/**
 * generate-single-block-plugin.js
 *
 * Script to generate a new single block plugin from the scaffold, replacing all moustache placeholders.
 * Usage: node generate-single-block-plugin.js --slug my-block --name "My Block" --description "Description here" --author "Your Name" --author_uri "https://yourdomain.com" --version "1.0.0"
 */

const fs = require('fs');
const path = require('path');

const scaffoldDir = path.resolve(__dirname, '..');
const outputDir = path.resolve(process.cwd(), 'output-plugin');

/**
 * Sanitize user input to prevent security vulnerabilities
 */
function sanitizeInput(input, type = 'text') {
  if (!input || typeof input !== 'string') {
    return null;
  }

  // Remove null bytes and control characters
  let sanitized = input.replace(/[\x00-\x1F\x7F]/g, '');

  switch (type) {
    case 'slug':
      // Only allow lowercase letters, numbers, and hyphens
      sanitized = sanitized.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      if (!sanitized || sanitized.length < 2) {
        throw new Error('Slug must be at least 2 characters long and contain only letters, numbers, and hyphens');
      }
      break;
    case 'name':
      // Prevent path traversal for text fields
      if (sanitized.includes('..') || sanitized.includes('/') || sanitized.includes('\\')) {
        throw new Error(`Invalid input: path traversal detected in "${input}"`);
      }
      // Allow alphanumeric and common punctuation
      sanitized = sanitized.replace(/[^a-zA-Z0-9 \-_.,']/g, '').trim();
      if (!sanitized || sanitized.length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }
      break;
    case 'url':
      // Basic URL validation
      try {
        const url = new URL(sanitized);
        if (!['http:', 'https:'].includes(url.protocol)) {
          throw new Error('URL must use http or https protocol');
        }
        sanitized = url.toString();
      } catch (e) {
        throw new Error(`Invalid URL format: ${e.message}`);
      }
      break;
    case 'version':
      // Validate semver format
      const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
      if (!versionRegex.test(sanitized)) {
        throw new Error('Version must follow semantic versioning (e.g., 1.0.0 or 1.0.0-beta.1)');
      }
      break;
    default:
      // General text sanitization - prevent path traversal
      if (sanitized.includes('..') || sanitized.includes('/') || sanitized.includes('\\')) {
        throw new Error(`Invalid input: path traversal detected in "${input}"`);
      }
      sanitized = sanitized.replace(/[<>"'`]/g, '').trim();
  }

  return sanitized;
}

const args = process.argv.slice(2);
const argMap = {};
args.forEach((arg, i) => {
  if (arg.startsWith('--')) {
    argMap[arg.replace('--', '')] = args[i + 1];
  }
});

try {
  const currentYear = new Date().getFullYear();
  const slug = sanitizeInput(argMap.slug, 'slug') || 'my-block';
  const name = sanitizeInput(argMap.name, 'name') || 'My Block';
  const author = sanitizeInput(argMap.author, 'name') || 'Author Name';
  const authorUri = sanitizeInput(argMap.author_uri, 'url') || 'https://example.com';
  const version = sanitizeInput(argMap.version, 'version') || '1.0.0';
  const description = sanitizeInput(argMap.description, 'text') || 'A single block plugin.';

  const placeholders = {
    '{{slug}}': slug,
    '{{name}}': name,
    '{{description}}': description,
    '{{author}}': author,
    '{{author_uri}}': authorUri,
    '{{version}}': version,
    '{{textdomain}}': slug,
    '{{namespace}}': slug.replace(/-/g, '_'),
    '{{plugin_uri}}': `https://github.com/${author}/${slug}`,
    '{{requires_wp}}': '6.0',
    '{{requires_php}}': '8.0',
    '{{license}}': 'GPL-2.0-or-later',
    '{{license_uri}}': 'https://www.gnu.org/licenses/gpl-2.0.html',
    '{{update_uri}}': `https://github.com/${author}/${slug}`,
    '{{copyright_year}}': currentYear.toString(),
    '{{copyright_holder}}': author,
    '{{contributors}}': author.toLowerCase().replace(/\s+/g, ''),
    '{{donate_url}}': authorUri,
    '{{tag1}}': 'blocks',
    '{{tag2}}': 'gutenberg',
    '{{tag3}}': 'block-editor',
    '{{tag4}}': slug,
    '{{tag5}}': 'custom-block',
    '{{tested_up_to}}': '6.7',
    '{{short_description}}': description.substring(0, 150),
    '{{support_url}}': `https://wordpress.org/support/plugin/${slug}`,
    '{{github_url}}': `https://github.com/${author}/${slug}`,
    '{{docs_url}}': `https://github.com/${author}/${slug}/wiki`,
    '{{block_name}}': name,
    '{{block_category}}': 'common',
    '{{block_supports}}': 'align, anchor, HTML',
    '{{release_date}}': new Date().toISOString().split('T')[0],
    '{{use_case_1}}': 'Perfect for displaying custom content blocks',
    '{{use_case_2}}': 'Easily customizable to match your brand',
    '{{use_case_3}}': 'Seamlessly integrates with your existing content',
    '{{block_features}}': 'Customizable settings, responsive design, accessibility ready',
    '{{new_feature_1}}': 'Initial release',
    '{{new_feature_2}}': 'Block editor integration',
    '{{improvement_1}}': 'Optimized performance',
    '{{improvement_2}}': 'Enhanced accessibility',
    '{{bug_fix_1}}': 'N/A - Initial release',
    '{{bug_fix_2}}': 'N/A - Initial release',
    '{{dev_note_1}}': 'First stable release',
    '{{dev_note_2}}': 'Full documentation available',
    '{{upgrade_notice}}': 'Initial release. Please test in a staging environment before deploying to production.',
    '{{displayName}}': name,
    '{{website}}': authorUri,
    '{{docsUrl}}': `https://github.com/${author}/${slug}/wiki`,
    '{{supportUrl}}': `https://wordpress.org/support/plugin/${slug}`,
    '{{changelogUrl}}': `https://github.com/${author}/${slug}/blob/main/CHANGELOG.md`,
    '{{createdDate}}': new Date().toISOString().split('T')[0],
    '{{updatedDate}}': new Date().toISOString().split('T')[0],
  };

  // Validate that placeholders aren't using defaults when user provided input
  if (argMap.author && placeholders['{{author}}'] === 'Author Name') {
    throw new Error('Invalid author name provided');
  }
  if (argMap.author_uri && placeholders['{{author_uri}}'] === 'https://example.com') {
    throw new Error('Invalid author URI provided');
  }

function replacePlaceholders(content) {
  let result = content;
  for (const [key, value] of Object.entries(placeholders)) {
    result = result.split(key).join(value);
  }
  return result;
}

function copyAndReplace(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    for (const file of fs.readdirSync(src)) {
      copyAndReplace(path.join(src, file), path.join(dest, file.replace('{{slug}}', placeholders['{{slug}}'])));
    }
  } else {
    let content = fs.readFileSync(src, 'utf8');
    content = replacePlaceholders(content);
    fs.writeFileSync(dest, content);
  }
}

  function main() {
    if (fs.existsSync(outputDir)) {
      console.error(`Output directory ${outputDir} already exists. Remove it or choose another location.`);
      process.exit(1);
    }
    fs.mkdirSync(outputDir);
    const filesToCopy = [
    'src',
    'bin',
    'README.md',
    'readme.txt',
    'composer.json',
    'package.json',
    'webpack.config.js',
    'phpunit.xml',
    'phpcs.xml',
    'phpstan.neon',
    'LICENSE',
    '{{slug}}.php',
    'jest.config.js',
    '.gitignore',
    '.npmignore',
    '.editorconfig',
    '.eslintrc',
    '.eslintignore',
    '.stylelintrc',
    '.stylelintignore',
    'tests',
    'docs',
  ];
  for (const file of filesToCopy) {
    const srcPath = path.join(scaffoldDir, file);
    if (fs.existsSync(srcPath)) {
      copyAndReplace(srcPath, path.join(outputDir, file.replace('{{slug}}', placeholders['{{slug}}'])));
    }
  }
  console.log(`Single block plugin generated at ${outputDir}`);
  }

  main();
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
