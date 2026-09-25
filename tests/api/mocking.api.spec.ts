import { test, expect } from '@playwright/test';

test('can intercept and mock an API request', async ({ page }) => {

    await page.route('**/api/v1/fruits', async route => {
        const request = route.request();
        console.log('URL:', request.url());
        console.log('Method:', request.method());
        console.log('Headers:', request.headers());

        //mocking the response to send this:
        await route.fulfill({
            json: [
                {
                    id: 999,
                    name: 'My Mocked Fruit'
                }
            ]
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');
    await expect(
        page.getByText('My Mocked Fruit')
    ).toBeVisible();
    await expect(page.getByText('Strawberry')).not.toBeVisible();

});

test('can fullfill data adding new element to the list', async ({ page }) => {

    //call the real API, modify it, and then give the modified response to the browser.
    await page.route('**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const fruits = await response.json();

        fruits.push({
            id: 999,
            name: 'Injected Fruit'
        });

        await route.fulfill({
            response,
            json: fruits
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');
    await expect(
        page.getByText('Injected Fruit')
    ).toBeVisible();
});