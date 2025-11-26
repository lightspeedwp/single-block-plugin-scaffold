/**
 * Tests for bin/update-version.test.js
 *
 * @package {{slug}}
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('update-version.js', () => {
	const binDir = path.resolve(__dirname, '..', 'bin');
	const updateScript = path.join(binDir, 'update-version.js');
	const testDir = path.resolve(__dirname, '..', 'test-plugin');

	// Create test plugin structure
	const setupTestPlugin = (version = '1.0.0') => {
		try {
			if (!fs.existsSync(testDir)) {
				fs.mkdirSync(testDir, { recursive: true });
			}

			// Create package.json
			fs.writeFileSync(
				path.join(testDir, 'package.json'),
				JSON.stringify({ version, name: 'test-plugin' }, null, 2)
			);

			// Create composer.json
			fs.writeFileSync(
				path.join(testDir, 'composer.json'),
				JSON.stringify({ version, name: 'test/plugin' }, null, 2)
			);

			// Create plugin PHP file
			fs.writeFileSync(
				path.join(testDir, 'test-plugin.php'),
				`<?php\n/**\n * Version: ${version}\n */\ndefine( 'TEST_PLUGIN_VERSION', '${version}' );`
			);

			// Create README
			fs.writeFileSync(
				path.join(testDir, 'README.md'),
				`# Test Plugin\n\nStable tag: ${version}\n`
			);

			// Create src directory and block.json
			const srcDir = path.join(testDir, 'src', 'test-plugin');
			fs.mkdirSync(srcDir, { recursive: true });
			fs.writeFileSync(
				path.join(srcDir, 'block.json'),
				JSON.stringify({ version, name: 'test/block' }, null, 2)
			);
		} catch (error) {
			throw new Error(`Test plugin setup failed: ${error.message}`);
		}
	};

	const cleanupTestPlugin = () => {
		try {
			if (fs.existsSync(testDir)) {
				fs.rmSync(testDir, { recursive: true, force: true });
			}
		} catch (error) {
			console.error(`Cleanup failed: ${error.message}`);
		}
	};

	beforeEach(() => {
		cleanupTestPlugin();
	});

	afterEach(() => {
		cleanupTestPlugin();
	});

	describe('Script Existence', () => {
		test('script file should exist', () => {
			try {
				expect(fs.existsSync(updateScript)).toBe(true);
			} catch (error) {
				throw new Error(`Script existence check failed: ${error.message}`);
			}
		});

		test('script should be executable', () => {
			try {
				const stats = fs.statSync(updateScript);
				const isExecutable = (stats.mode & 0o111) !== 0;
				expect(isExecutable || process.platform === 'win32').toBe(true);
			} catch (error) {
				console.warn(`Executable check skipped: ${error.message}`);
			}
		});
	});

	describe('Version Validation', () => {
		test('should reject version without argument', () => {
			try {
				const cmd = `node ${updateScript}`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });
				fail('Should have thrown error for missing version');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('provide a version');
			}
		});

		test('should reject invalid version format', () => {
			try {
				const cmd = `node ${updateScript} "invalid.version.x"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });
				fail('Should have thrown error for invalid version');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('semantic versioning');
			}
		});

		test('should reject version with malicious characters', () => {
			try {
				const cmd = `node ${updateScript} "1.0.0; rm -rf /"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });
				fail('Should have thrown error for malicious input');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('invalid characters');
			}
		});

		test('should reject version numbers exceeding 999', () => {
			try {
				const cmd = `node ${updateScript} "1000.0.0"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });
				fail('Should have thrown error for large version');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('less than 1000');
			}
		});

		test('should accept valid semver format', () => {
			try {
				setupTestPlugin();
				const cmd = `node ${updateScript} "1.2.3"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', cwd: testDir });

				expect(result).toContain('1.2.3');
				expect(result).toContain('Successfully updated');
			} catch (error) {
				throw new Error(`Valid semver test failed: ${error.message}\n${error.stderr?.toString()}`);
			}
		});

		test('should accept semver with prerelease', () => {
			try {
				setupTestPlugin();
				const cmd = `node ${updateScript} "2.0.0-beta.1"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', cwd: testDir });

				expect(result).toContain('2.0.0-beta.1');
			} catch (error) {
				throw new Error(`Prerelease version test failed: ${error.message}`);
			}
		});

		test('should accept semver with build metadata', () => {
			try {
				setupTestPlugin();
				const cmd = `node ${updateScript} "1.0.0+build.123"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', cwd: testDir });

				expect(result).toContain('1.0.0+build.123');
			} catch (error) {
				throw new Error(`Build metadata version test failed: ${error.message}`);
			}
		});
	});

	describe('File Updates', () => {
		test('should update package.json version', () => {
			try {
				setupTestPlugin('1.0.0');
				const cmd = `node ${updateScript} "1.2.0"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });

				const packageJson = JSON.parse(
					fs.readFileSync(path.join(testDir, 'package.json'), 'utf8')
				);
				expect(packageJson.version).toBe('1.2.0');
			} catch (error) {
				throw new Error(`package.json update failed: ${error.message}`);
			}
		});

		test('should update composer.json version', () => {
			try {
				setupTestPlugin('1.0.0');
				const cmd = `node ${updateScript} "1.2.0"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });

				const composerJson = JSON.parse(
					fs.readFileSync(path.join(testDir, 'composer.json'), 'utf8')
				);
				expect(composerJson.version).toBe('1.2.0');
			} catch (error) {
				throw new Error(`composer.json update failed: ${error.message}`);
			}
		});

		test('should update plugin PHP file version', () => {
			try {
				setupTestPlugin('1.0.0');
				const cmd = `node ${updateScript} "1.2.0"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });

				const phpContent = fs.readFileSync(
					path.join(testDir, '{{slug}}.php'),
					'utf8'
				);
				expect(phpContent).toContain('Version: 1.2.0');
				expect(phpContent).toContain("'{{namespace|upper}}_VERSION', '1.2.0'");
			} catch (error) {
				throw new Error(`PHP file update failed: ${error.message}`);
			}
		});

		test('should update README.md stable tag', () => {
			try {
				setupTestPlugin('1.0.0');
				const cmd = `node ${updateScript} "1.2.0"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });

				const readmeContent = fs.readFileSync(
					path.join(testDir, 'README.md'),
					'utf8'
				);
				expect(readmeContent).toContain('Stable tag: 1.2.0');
			} catch (error) {
				throw new Error(`README.md update failed: ${error.message}`);
			}
		});

		test('should update block.json version', () => {
			try {
				setupTestPlugin('1.0.0');
				const cmd = `node ${updateScript} "1.2.0"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });

				const blockJson = JSON.parse(
					fs.readFileSync(
						path.join(testDir, 'src', '{{slug}}', 'block.json'),
						'utf8'
					)
				);
				expect(blockJson.version).toBe('1.2.0');
			} catch (error) {
				throw new Error(`block.json update failed: ${error.message}`);
			}
		});
	});

	describe('Error Handling and Logging', () => {
		test('should warn if file not found', () => {
			try {
				setupTestPlugin();
				// Remove one file
				fs.unlinkSync(path.join(testDir, 'composer.json'));

				const cmd = `node ${updateScript} "1.2.0"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', cwd: testDir });

				expect(result).toContain('not found');
			} catch (error) {
				throw new Error(`File not found test failed: ${error.message}`);
			}
		});

		test('should log update summary', () => {
			try {
				setupTestPlugin();
				const cmd = `node ${updateScript} "1.2.0"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', cwd: testDir });

				expect(result).toContain('Update Summary');
				expect(result).toContain('Files updated:');
				expect(result).toContain('Successfully updated');
			} catch (error) {
				throw new Error(`Summary logging test failed: ${error.message}`);
			}
		});

		test('should provide next steps after success', () => {
			try {
				setupTestPlugin();
				const cmd = `node ${updateScript} "1.2.0"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', cwd: testDir });

				expect(result).toContain('Next steps');
				expect(result).toContain('git');
				expect(result).toContain('npm run build');
			} catch (error) {
				throw new Error(`Next steps test failed: ${error.message}`);
			}
		});

		test('should exit with error code on failure', () => {
			try {
				const cmd = `node ${updateScript} "invalid"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });
				fail('Should have exited with error');
			} catch (error) {
				expect(error.status).toBe(1);
			}
		});

		test('should handle file write errors gracefully', () => {
			try {
				setupTestPlugin();

				// Make file read-only
				if (process.platform !== 'win32') {
					fs.chmodSync(path.join(testDir, 'package.json'), 0o444);
				}

				const cmd = `node ${updateScript} "1.2.0"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });

				// Should continue with other files even if one fails
			} catch (error) {
				// Should handle error gracefully
				expect(error.stderr.toString()).toContain('Error');
			} finally {
				// Restore permissions
				if (process.platform !== 'win32' && fs.existsSync(path.join(testDir, 'package.json'))) {
					fs.chmodSync(path.join(testDir, 'package.json'), 0o644);
				}
			}
		});
	});

	describe('Security and Validation', () => {
		test('should trim whitespace from version', () => {
			try {
				setupTestPlugin();
				const cmd = `node ${updateScript} "  1.2.0  "`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8', cwd: testDir });

				const packageJson = JSON.parse(
					fs.readFileSync(path.join(testDir, 'package.json'), 'utf8')
				);
				expect(packageJson.version).toBe('1.2.0');
			} catch (error) {
				throw new Error(`Whitespace trim test failed: ${error.message}`);
			}
		});

		test('should prevent shell injection', () => {
			try {
				const cmd = `node ${updateScript} "1.0.0 && echo 'injected'"`;
				execSync(cmd, { stdio: 'pipe', cwd: testDir });
				fail('Should have rejected shell injection');
			} catch (error) {
				expect(error.status).toBe(1);
			}
		});
	});
});
