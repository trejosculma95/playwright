import { Locator } from '@playwright/test'

export class ProductCardComponent {
    readonly productCard: Locator;

    constructor(productCard: Locator) {
        this.productCard = productCard;
    }

    async getName(): Promise<string> {
        return this.productCard.locator('.inventory_item_name').innerText() // <h2>Laptop</h2>
    }
    async getPrice(): Promise<string> {
        return this.productCard.locator('.pricebar .inventory_item_price').innerText() // <div>$1200</div>
    }
    async addToCart(): Promise<void> {
        await this.productCard.locator('.pricebar button').click();
    }
    async viewDetails(): Promise<void> {
        await this.productCard.locator('.inventory_item_name').click();
    }
    async addToFavorites(): Promise<void> {
        await this.productCard.getByRole('button', { name: 'Add to favorites' }).click();
    }
}