import { z } from 'zod';

const RatingSchema = z.object({
    rate: z.number(),
    count: z.number()
});

export const ProductSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1),
    price: z.number().nonnegative(),
    description: z.string(),
    category: z.string().min(1),
    image: z.string().url(),
    rating: RatingSchema
});