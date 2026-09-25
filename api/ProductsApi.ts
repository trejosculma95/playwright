import { APIRequestContext, APIResponse } from '@playwright/test';
import { CreateProductRequest } from './models/Product';

export class ProductsApi {

    constructor(
        private readonly request: APIRequestContext
    ) { }

    async getProducts(): Promise<APIResponse> {
        return this.request.get('/products');
    }

    async getProduct(productId: string): Promise<APIResponse> {
        return this.request.get(`/products/${productId}`);
    }

    async createProduct(productData: CreateProductRequest): Promise<APIResponse> {
        return this.request.post('/products', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: productData
        });
    }

    async updateProduct(productID: string, productUpdated: CreateProductRequest): Promise<APIResponse> {
        return this.request.put(`/products/${productID}`, { data: productUpdated });
    }

    async deleteProduct(productId: string): Promise<APIResponse> {
        return this.request.delete(`/products/${productId}`);
    }
}