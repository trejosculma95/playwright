import { expect } from '@playwright/test'
import { test } from '../../fixtures/test';
import { users } from '../../data/users';


test("user can add a product to cart", {tag: "@smoke"}, async ({ cartPage, productPage }) => {
    await productPage.goto()
    await productPage.addProductToCart('Sauce Labs Onesie');
    await productPage.header.openCart();

    await expect(cartPage.getCartItem('Sauce Labs Onesie').getRoot()).toBeVisible();
});

test('user can add and remove a product from cart using authentication mode', {tag: "@regression"} , async ({authentication, cartPage, productPage}) => {
     await authentication.authenticate(
        users.standard.userName,
        users.standard.password
    );

    await productPage.addProductToCart('Sauce Labs Fleece Jacket');
    await productPage.header.openCart();

    const cartItem = cartPage.getCartItem('Sauce Labs Fleece Jacket');

    await expect(cartItem.getRoot()).toBeVisible();

    await cartItem.removeItemFromCart();

    await expect(cartItem.getRoot()).not.toBeVisible();
});

test('authenticated user can access cart page', {tag: '@smoke'}, async ({ page }) => {
    await page.goto('/cart.html');

    await expect(
        page.getByRole('button', { name: 'Checkout'})
    ).toBeVisible();
});

test('user can add and remove a product from cart', {tag: '@regression'}, async ({ productPage, cartPage }) => {

    await productPage.goto();

    await productPage.addProductToCart('Sauce Labs Backpack');
    await productPage.addProductToCart('Sauce Labs Bike Light');

    await productPage.header.openCart();

    const cartItem = cartPage.getCartItem('Sauce Labs Bike Light');

    await expect(cartItem.getRoot()).toBeVisible();

    await cartItem.removeItemFromCart();

    await expect(cartItem.getRoot()).not.toBeVisible();
});