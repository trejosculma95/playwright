import { Page, Locator } from "@playwright/test";
import { HeaderComponent } from "./components.ts/headerComponent";
import { ProductCardComponent } from "./components.ts/ProductCardComponent";

export class ProductPage {

    readonly page: Page;
    readonly header: HeaderComponent
    readonly productsTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.productsTable = page.locator('.inventory_item')
    }

    async goto(): Promise<void> {
        await this.page.goto('/inventory.html');
    }

    getProduct(productName: string): ProductCardComponent {

        const product = this.productsTable.filter({
            hasText: productName
        });

        return new ProductCardComponent(product);
    }

    async addProductToCart(productName: string): Promise<void> {
        const productCard = this.getProduct(productName)
        await productCard.addToCart();

    }
}