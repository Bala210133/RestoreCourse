import {z} from "zod";

const fileSchema = z.instanceof(File).refine((file) => file.size > 0, {
    message: 'A file must be uploaded'
}).transform(file=> ({
    ...file,
    preview: URL.createObjectURL(file)
}))

export const createProductSchema = z.object({
    name: z.string().min(1, { message: 'Name of product is required' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters long' }).optional(),
    price: z.coerce.number().min(100, { message: 'Price must be at least $1.00' }).optional(),
    type: z.string().min(1, { message: 'Type of product is required' }).optional(),
    brand: z.string().min(1, { message: 'Brand of product is required' }).optional(),
    quantityInStock: z.coerce.number().min(1, { message: 'Quantity in stock must be at least 1' }).optional(),
    pictureUrl:z.string().optional(),
    file: fileSchema.optional()
}).refine((data) => data.pictureUrl || data.file, {
    message:'Please Provide an image',
    path:['file']
});

export type CreateProductScheme = z.infer<typeof createProductSchema>;