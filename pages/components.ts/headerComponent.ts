import { Page, Locator } from '@playwright/test'

export class HeaderComponent {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly productsLink: Locator;
    readonly ordersLink: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('a.shopping_cart_link');
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.ordersLink = page.getByRole('link', { name: 'Orders' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }

    async openProducts(): Promise<void> {
        await this.productsLink.click();
    }

    async openOrders(): Promise<void> {
        await this.ordersLink.click();
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async logout(): Promise<void> {
        await this.logoutButton.click();
    }
}