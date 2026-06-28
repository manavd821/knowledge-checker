import { z } from 'zod';


export const createUserWebhookSchema = z.object({
    id : z.string().min(1),
    email_addresses : z.array(z.object({
        email_address : z.email(),
    })).min(1),
    first_name : z.string().nullable(),
    last_name : z.string().nullable(),
}).transform(data => ({
    user_id : data.id,
    email : data.email_addresses[0].email_address,
    first_name: data.first_name,
    last_name : data.last_name,
}));
export type CreateUser = z.infer<typeof createUserWebhookSchema>;