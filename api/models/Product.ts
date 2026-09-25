export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Object;
}

export interface CreateProductRequest {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}