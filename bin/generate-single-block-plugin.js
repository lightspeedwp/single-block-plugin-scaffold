#!/usr/bin/env node

/**
 * generate-single-block-plugin.js
 *
 * Script to generate a new single block plugin from the scaffold, replacing all moustache placeholders.
 * Usage: node generate-single-block-plugin.js --slug my-block --name "My Block" --description "Description here" --author "Your Name" --author_uri "https://yourdomain.com" --version "1.0.0"
 */

const fs = require('fs');
const path = require('path');

const scaffoldDir = path.resolve(__dirname, '.');
const outputDir = path.resolve(process.cwd(), 'output-plugin');

const args = process.argv.slice(2);
const argMap = {};
args.forEach((arg, i) => {
  if (arg.startsWith('--')) {
    argMap[arg.replace('--', '')] = args[i + 1];
  }
});

const placeholders = {
  '{{slug}}': argMap.slug || 'my-block',
  '{{name}}': argMap.name || 'My Block',
  '{{description}}': argMap.description || 'A single block plugin.',
  '{{author}}': argMap.author || 'Author Name',
  '{{author_uri}}': argMap.author_uri || 'https://example.com',
  '{{version}}': argMap.version || '1.0.0',
};

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
    'composer.json',
    'package.json',
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
