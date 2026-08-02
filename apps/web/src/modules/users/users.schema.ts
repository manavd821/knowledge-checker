import { z } from 'zod';
import { CreateUserInput } from '@/modules/users/users.type';

export const createUserWebhookSchema = z.object({
    id : z.string().min(1),
    email_addresses : z.array(z.object({
        email_address : z.email(),
    })).min(1),
    first_name : z.string().nullable(),
    last_name : z.string().nullable(),
    image_url: z.string().nullable(),
}).transform(
    (data) : CreateUserInput  => ({
    ...data,
    user_id : data.id,
    email : data.email_addresses[0].email_address,
}));
export type ClerkCreateUser  = z.infer<typeof createUserWebhookSchema>;

export const SearchUserQuerySchema = z.object({
    search: z.string().optional(),
})

export type SearchUserQuery = z.infer<typeof SearchUserQuerySchema>;