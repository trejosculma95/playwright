import { CreateProductRequest } from "../../api/models/Product";

export class ProductBuilder {

    private product: CreateProductRequest = {
        title: 'Default Product',
        price: 0,
        description: 'Default product description',
        category: 'Default',
        image: 'https://example.com/default.jpg'
    };

    withTitle(title: string): this {
        this.product.title = title;
        return this;
    }

     withPrice(price: number): this {
        this.product.price = price;
        return this;
    }

    withDescription(description: string): this {
        this.product.description = description;
        return this;
    }

    withCategory(category: string): this {
        this.product.category = category;
        return this;
    }

    withImage(image: string): this {
        this.product.image = image;
        return this;
    }

    build(): CreateProductRequest {
        return {...this.product};
    }

}