import { z } from "zod";
import { ApiErrorSchema, createSuccessResponseSchema } from "@/shared/dto/api-response.dto";

export const SearchUserSchema = z.object({
    user_id: z.string(),
    email: z.string(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    image_url: z.string().nullable(),
})
export const GetSearchUsersSchema = z.array(SearchUserSchema);
export type GetSearchUsers = z.infer<typeof GetSearchUsersSchema>;

export const GetSearchUsersSuccessSchema = 
    createSuccessResponseSchema(GetSearchUsersSchema);

export type GetSearchUsersSuccess = z.infer<typeof GetSearchUsersSuccessSchema>;

export const GetSearchUsersResponseSchema = z.union([
    ApiErrorSchema,
    GetSearchUsersSuccessSchema,
]);

export type GetSearchUsersResponse = z.infer<typeof GetSearchUsersResponseSchema>;