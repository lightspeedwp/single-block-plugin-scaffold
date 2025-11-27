/**
 * @jest-environment jsdom
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Block Accessibility Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:8888/wp-admin/post-new.php');
		await page.waitForSelector('.block-editor-writing-flow');
		await injectAxe(page);
	});

	test('Block editor has no accessibility violations', async ({ page }) => {
		await checkA11y(page, '.block-editor-writing-flow', {
			detailedReport: true,
			detailedReportOptions: { html: true },
		});
	});

	test('Block inserter is keyboard accessible', async ({ page }) => {
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Enter');

		const inserter = page.locator('.block-editor-inserter__menu');
		await expect(inserter).toBeVisible();

		await page.keyboard.type('{{slug}}');
		const blockOption = page.locator('[role="option"]').first();
		await expect(blockOption).toBeFocused();
	});

	test('Block has proper ARIA labels', async ({ page }) => {
		await page.click('.block-editor-inserter__toggle');
		await page.fill('.block-editor-inserter__search input', '{{slug}}');
		await page.click('[role="option"]:has-text("{{name}}")');

		const block = page.locator('.wp-block').first();
		await expect(block).toHaveAttribute('role');
		await expect(block).toHaveAttribute('aria-label');
	});

	test('Block toolbar is keyboard navigable', async ({ page }) => {
		await page.click('.block-editor-inserter__toggle');
		await page.fill('.block-editor-inserter__search input', '{{slug}}');
		await page.click('[role="option"]:has-text("{{name}}")');

		await page.keyboard.press('Tab');
		const toolbar = page.locator('.block-editor-block-toolbar');
		await expect(toolbar).toBeVisible();

		const focusedElement = page.locator(':focus');
		const toolbarContains = await toolbar.evaluate((el, focused) => {
			return el.contains(focused);
		}, await focusedElement.elementHandle());

		expect(toolbarContains).toBeTruthy();
	});

	test('Frontend block output has no violations', async ({ page }) => {
		await page.goto('http://localhost:8888/');
		await injectAxe(page);
		await checkA11y(page, 'main', {
			detailedReport: true,
			detailedReportOptions: { html: true },
		});
	});

	test('Block meets WCAG 2.1 Level AA', async ({ page }) => {
		await page.goto('http://localhost:8888/');
		await injectAxe(page);
		await checkA11y(
			page,
			'main',
			{
				runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
			},
			true,
			'v4'
		);
	});
});
