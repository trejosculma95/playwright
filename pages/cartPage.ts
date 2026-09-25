import { Locator, Page } from "@playwright/test";
import { CartItemComponent } from "./components.ts/cartItemComponent";

export class CartPage {
    readonly page: Page;
    readonly productsInCart: Locator;

    constructor(page: Page) {
        this.page = page
        this.productsInCart = page.locator('.cart_item')
    }

    getCartItem(itemName: string): CartItemComponent {
        const item = this.productsInCart
            .filter({
                hasText: itemName
            });

        return new CartItemComponent(item);
    }

    async removeItem(itemName: string): Promise<void>{
        await this.getCartItem(itemName).removeItemFromCart()
    }
}