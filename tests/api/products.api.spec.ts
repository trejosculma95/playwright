import { expect } from '@playwright/test'
import { test } from '../../fixtures/test';
import { Product } from '../../api/models/Product';
import { ProductBuilder } from '../../data/builders/ProductBuilder';
import { ProductSchema } from '../../api/schemas/ProductSchema';
import { expectSchema } from '../../utils/api/schemaAssertions';

test('can retrieve products', {tag: "@smoke"}, async ({ productsApi }) => {
    const response = await productsApi.getProducts();
    const products = await response.json()

    expect(response.status()).toBe(200)
    expect(products).toHaveLength(20);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('title');
    expect(products[0].price).toEqual(expect.any(Number));
    expect(products[0].rating).toEqual(expect.any(Object));
});

test('returns expected response for a known product', {tag: "@smoke"} ,async ({ productsApi }) => {

    const response = await productsApi.getProduct('6');
    
    //http contract
    expect(response.status()).toBe(200)

    //schema contract and return the product type
    const product = expectSchema(ProductSchema, await response.json());

    // Business rule
    expect(product.id).toBe(6)
    expect(product.price).toEqual(168);
    expect(product.description).not.toBe("")
});

test('returns expected response for an unknown product', async ({ productsApi }) => {

    const response = await productsApi.getProduct('999999');

    expect(response.status()).toBe(404)
});

test('can create a product', async ({ productsApi }) => {

    const newProduct = new ProductBuilder()
        .withTitle('Training Product')
        .withPrice(99.99)
        .withDescription('Product created through API automation')
        .withCategory('Knowledge')
        .withImage('https://example.com/product.jpg')
        .build();

    const response = await productsApi.createProduct(newProduct);
    const product: Product = await response.json();

    expect(response.status()).toBe(201);
    expect(product.title).toBe(newProduct.title);
    expect(product.price).toBe(newProduct.price);
    expect(product.description).toBe(newProduct.description);
    expect(product.category).toBe(newProduct.category);
    expect(product.image).toBe(newProduct.image);
});

test('can create a product without title', async ({ productsApi }) => {

    const productData = new ProductBuilder()
        .withTitle('')
        .build();

    const response = await productsApi.createProduct(productData);

    expect(response.status()).toBe(201);

    expect(response.headers()['content-type']).toContain('application/json');

    const product: Product = await response.json();

    expect(product.title).toBe('');
});

test('can update a product', async ({ productsApi }) => {

    const productUpdated = new ProductBuilder()
        .withTitle('product updated')
        .withPrice(10)
        .build();
    
    const response = await productsApi.updateProduct("1", productUpdated);
    const product: Product = await response.json();

    expect(response.status()).toBe(200);
    expect(product.id).toBe(1);
    expect(product.title).toBe(productUpdated.title);
    expect(product.price).toBe(productUpdated.price);

});

test('can delete a product', async ({ productsApi }) => {
    const response = await productsApi.deleteProduct("1");
    expect(response.status()).toBe(200);

    console.log(await response.json())
});

test.skip('can chain product requests', async ({ productsApi }) => {

    const newProduct = new ProductBuilder()
        .withTitle('Chained Product')
        .withPrice(49.99)
        .withDescription('Product created for request chaining')
        .withCategory('Training')
        .withImage('https://example.com/product.jpg')
        .build();

    const createResponse = await productsApi.createProduct(newProduct);

    expect(createResponse.status()).toBe(201);

    const createdProduct: Product = await createResponse.json();

    const productId = createdProduct.id;

    const getResponse = await productsApi.getProduct(productId.toString());

    expect(getResponse.status()).toBe(200);

    const retrievedProduct = expectSchema(ProductSchema,await getResponse.json());

    // 5. Business validation
    expect(retrievedProduct.title).toBe(createdProduct.title);
});