import { Locator } from '@playwright/test'

export class CartItemComponent {
    private readonly cartItem: Locator;

    constructor(cartItem: Locator) {
        this.cartItem = cartItem;
    }

    getRoot(): Locator {
        return this.cartItem
    }

    async getName(): Promise<string>{
        return this.cartItem.locator('.inventory_item_name').innerText()
    }
    async removeItemFromCart(): Promise<void> {
        await this.cartItem.getByRole('button', { name: 'Remove' }).click();
    }
    async viewDetails(): Promise<void> {
        await this.cartItem.locator('.cart_item_label a').click();
    }
}