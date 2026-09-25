import { ZodSchema } from 'zod';

export function expectSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
): T {
    return schema.parse(data);
}