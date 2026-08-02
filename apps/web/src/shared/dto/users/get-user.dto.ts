import { z } from "zod";
import { ApiErrorSchema, createSuccessResponseSchema } from "../api-response.dto";

export const GetUserSchema = z.object({
    user_id: z.string(),
    email: z.email(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    image_url: z.string().nullable(),
    created_at: z.iso.datetime().optional(),
    updated_at: z.iso.datetime().optional(),
});

export type GetUser= z.infer<typeof GetUserSchema>;

export const GetUserSuccessSchema = createSuccessResponseSchema(GetUserSchema);

export type GetUserSuccess = z.infer<typeof GetUserSuccessSchema>;

export const GetUserResponseSchema = z.union([
    ApiErrorSchema,
    GetUserSuccessSchema,
]);

export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;