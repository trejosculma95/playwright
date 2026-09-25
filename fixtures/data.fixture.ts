import { Product } from "../api/models/Product";
import { ProductBuilder } from "../data/builders/ProductBuilder";
import { apiTest } from "./api.fixture";

type DataFixtures = {
    preparedProduct: Product;
};

export const dataFixture = apiTest.extend<DataFixtures>({
    preparedProduct: async ({ productsApi }, use) => {
        const productData = new ProductBuilder()
            .withTitle('Prepared Training Product')
            .withPrice(49.99)
            .withDescription('Product created for test')
            .withCategory('Training')
            .withImage('https://example.com/product.jpg')
            .build();

        const response = await productsApi.createProduct(productData);

        const product: Product = await response.json();

        await use(product);

        await productsApi.deleteProduct(product.id.toString());
    }

});