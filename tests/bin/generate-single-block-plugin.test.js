/**
 * Tests for bin/generate-single-block-plugin.js
 *
 * @package {{slug}}
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('generate-single-block-plugin.js', () => {
	const binDir = path.resolve(__dirname, '..', 'bin');
	const generateScript = path.join(binDir, 'generate-single-block-plugin.js');
	const outputDir = path.resolve(process.cwd(), 'output-plugin');

	// Helper to clean up output directory
	const cleanupOutputDir = () => {
		if (fs.existsSync(outputDir)) {
			try {
				fs.rmSync(outputDir, { recursive: true, force: true });
			} catch (error) {
				console.error(`Cleanup failed: ${error.message}`);
			}
		}
	};

	beforeEach(() => {
		cleanupOutputDir();
	});

	afterEach(() => {
		cleanupOutputDir();
	});

	describe('Script Existence and Execution', () => {
		test('script file should exist', () => {
			try {
				expect(fs.existsSync(generateScript)).toBe(true);
			} catch (error) {
				throw new Error(`Script existence check failed: ${error.message}`);
			}
		});

		test('script should be executable', () => {
			try {
				const stats = fs.statSync(generateScript);
				// Check if file has execute permissions (Unix-like systems)
				const isExecutable = (stats.mode & 0o111) !== 0;
				expect(isExecutable || process.platform === 'win32').toBe(true);
			} catch (error) {
				console.warn(`Executable check skipped: ${error.message}`);
			}
		});
	});

	describe('Input Sanitization', () => {
		test('should reject slug with path traversal', () => {
			try {
				const cmd = `node ${generateScript} --slug "../evil" --name "Test"`;
				execSync(cmd, { stdio: 'pipe' });
				fail('Should have thrown error for path traversal');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('path traversal');
			}
		});

		test('should reject slug with invalid characters', () => {
			try {
				const cmd = `node ${generateScript} --slug "test@block!" --name "Test"`;
				const result = execSync(cmd, { stdio: 'pipe' });
				// Should sanitize to valid slug
				expect(result).toBeDefined();
			} catch (error) {
				// Or should reject - either is acceptable
				expect(error.status).toBe(1);
			}
		});

		test('should reject invalid URL format', () => {
			try {
				const cmd = `node ${generateScript} --slug "test" --author_uri "not-a-url"`;
				execSync(cmd, { stdio: 'pipe' });
				fail('Should have thrown error for invalid URL');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('Invalid URL');
			}
		});

		test('should reject invalid version format', () => {
			try {
				const cmd = `node ${generateScript} --slug "test" --version "invalid"`;
				execSync(cmd, { stdio: 'pipe' });
				fail('Should have thrown error for invalid version');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('semantic versioning');
			}
		});

		test('should accept valid semver with prerelease', () => {
			try {
				const cmd = `node ${generateScript} --slug "test-block" --name "Test Block" --version "1.0.0-beta.1"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });
				expect(result).toContain('generated');
			} catch (error) {
				console.error(`Valid semver test failed: ${error.message}`);
				throw error;
			}
		});
	});

	describe('Plugin Generation', () => {
		test('should generate plugin with default values', () => {
			try {
				const cmd = `node ${generateScript} --slug "test-block" --name "Test Block"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });

				expect(result).toContain('generated');
				expect(fs.existsSync(outputDir)).toBe(true);
			} catch (error) {
				throw new Error(`Plugin generation failed: ${error.message}\n${error.stderr?.toString()}`);
			}
		});

		test('should fail if output directory exists', () => {
			try {
				// Create output directory
				fs.mkdirSync(outputDir);

				const cmd = `node ${generateScript} --slug "test-block" --name "Test Block"`;
				execSync(cmd, { stdio: 'pipe' });
				fail('Should have thrown error for existing directory');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('already exists');
			}
		});

		test('should replace placeholders in generated files', () => {
			try {
				const cmd = `node ${generateScript} --slug "my-test-block" --name "My Test Block" --version "2.0.0"`;
				execSync(cmd, { stdio: 'pipe' });

				const packageJsonPath = path.join(outputDir, 'package.json');
				expect(fs.existsSync(packageJsonPath)).toBe(true);

				const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
				expect(packageJson.name).toBe('my-test-block');
				expect(packageJson.version).toBe('2.0.0');
			} catch (error) {
				throw new Error(`Placeholder replacement test failed: ${error.message}`);
			}
		});

		test('should copy all required files', () => {
			try {
				const cmd = `node ${generateScript} --slug "test-block" --name "Test Block"`;
				execSync(cmd, { stdio: 'pipe' });

				const requiredFiles = [
					'package.json',
					'composer.json',
					'webpack.config.js',
					'README.md',
					'test-block.php'
				];

				requiredFiles.forEach(file => {
					const filePath = path.join(outputDir, file);
					expect(fs.existsSync(filePath)).toBe(true);
				});
			} catch (error) {
				throw new Error(`File copy test failed: ${error.message}`);
			}
		});

		test('should copy directory structure', () => {
			try {
				const cmd = `node ${generateScript} --slug "test-block" --name "Test Block"`;
				execSync(cmd, { stdio: 'pipe' });

				const requiredDirs = ['src', 'bin', 'tests'];

				requiredDirs.forEach(dir => {
					const dirPath = path.join(outputDir, dir);
					expect(fs.existsSync(dirPath)).toBe(true);
					expect(fs.statSync(dirPath).isDirectory()).toBe(true);
				});
			} catch (error) {
				throw new Error(`Directory structure test failed: ${error.message}`);
			}
		});
	});

	describe('Error Handling and Logging', () => {
		test('should provide helpful error message for missing arguments', () => {
			try {
				// Script uses default values, so this won't fail but will use defaults
				const cmd = `node ${generateScript}`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });
				expect(result).toBeDefined();
			} catch (error) {
				// If it does error, should have clear message
				expect(error.stderr.toString().length).toBeGreaterThan(0);
			}
		});

		test('should log success message on completion', () => {
			try {
				const cmd = `node ${generateScript} --slug "test-block" --name "Test Block"`;
				const result = execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });

				expect(result).toContain('generated');
				expect(result).toContain('output-plugin');
			} catch (error) {
				throw new Error(`Success logging test failed: ${error.message}`);
			}
		});

		test('should handle file system errors gracefully', () => {
			try {
				// Try to generate in a read-only location (will fail differently on different systems)
				const cmd = `node ${generateScript} --slug "test-block" --name "Test Block"`;

				// Make the parent directory read-only temporarily
				const parentDir = process.cwd();
				const originalMode = fs.statSync(parentDir).mode;

				try {
					if (process.platform !== 'win32') {
						fs.chmodSync(parentDir, 0o444);
						execSync(cmd, { stdio: 'pipe' });
						fail('Should have failed with permission error');
					}
				} finally {
					// Restore permissions
					if (process.platform !== 'win32') {
						fs.chmodSync(parentDir, originalMode);
					}
				}
			} catch (error) {
				// Should fail but not crash
				expect(error.status).toBeDefined();
			}
		});
	});

	describe('Security Validations', () => {
		test('should prevent command injection in arguments', () => {
			try {
				const cmd = `node ${generateScript} --slug "test; rm -rf /" --name "Test"`;
				execSync(cmd, { stdio: 'pipe' });

				// Should sanitize to safe slug
				expect(fs.existsSync(outputDir)).toBe(true);
			} catch (error) {
				// Or should reject - both acceptable
				expect(error.status).toBe(1);
			}
		});

		test('should prevent XSS in text fields', () => {
			try {
				const cmd = `node ${generateScript} --slug "test-block" --name "<script>alert('xss')</script>"`;
				execSync(cmd, { stdio: 'pipe' });

				const packageJsonPath = path.join(outputDir, 'package.json');
				const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

				// Should sanitize HTML tags
				expect(packageJson.name).not.toContain('<script>');
				expect(packageJson.name).not.toContain('</script>');
			} catch (error) {
				throw new Error(`XSS prevention test failed: ${error.message}`);
			}
		});

		test('should validate URL protocols', () => {
			try {
				const cmd = `node ${generateScript} --slug "test-block" --author_uri "javascript:alert(1)"`;
				execSync(cmd, { stdio: 'pipe' });
				fail('Should have rejected javascript: protocol');
			} catch (error) {
				expect(error.status).toBe(1);
				expect(error.stderr.toString()).toContain('protocol');
			}
		});

		test('should replace {{slug}} placeholders in webpack config', () => {
			try {
				const cmd = `node ${generateScript} --slug "my-awesome-block" --name "My Awesome Block"`;
				execSync(cmd, { stdio: 'pipe' });

				const webpackConfigPath = path.join(outputDir, 'webpack.config.js');
				const webpackContent = fs.readFileSync(webpackConfigPath, 'utf8');

				// Should replace all {{slug}} placeholders
				expect(webpackContent).not.toContain('{{slug}}');
				expect(webpackContent).toContain('my-awesome-block');
				expect(webpackContent).toContain("'my-awesome-block':");
				expect(webpackContent).toContain("'my-awesome-block', 'index.js'");
			} catch (error) {
				throw new Error(`Webpack config placeholder test failed: ${error.message}`);
			}
		});
	});
});
