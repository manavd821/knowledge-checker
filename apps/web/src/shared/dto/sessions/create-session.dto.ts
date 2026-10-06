import { z } from "zod";
import { ApiErrorSchema, createSuccessResponseSchema } from "@/shared/dto/api-response.dto";
import { STATUS } from "@/db/enums";

export const CreateSessionSchema = z.object({
    session_id: z.string(),
    status : z.enum(STATUS)
})
export const CreateSessionSuccessSchema = createSuccessResponseSchema(CreateSessionSchema)

export type CreateSessionSuccess = z.infer<typeof CreateSessionSuccessSchema>;

export const CreateSessionResponseSchema = z.union([
    ApiErrorSchema,
    CreateSessionSuccessSchema
]);

export type CreateSessionResponse = z.infer<typeof CreateSessionResponseSchema>;