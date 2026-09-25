import { expect, Page } from '@playwright/test';
import { TestUser } from '../data/users';

export async function authenticateUser(
    page: Page,
    user: TestUser
): Promise<void> {

    await page.goto('/');

    await page.getByRole('textbox', { name: 'Username' })
        .fill(user.userName);

    await page.getByRole('textbox', { name: 'Password' })
        .fill(user.password);

    await page.getByRole('button', { name: 'Login' })
        .click();

    await expect(page.locator('span.title'))
        .toBeVisible();

    await page.context().storageState({
        path: user.authFile
    });
}