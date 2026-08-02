import { z } from "zod";
import { LiveSessionInfoSchema } from "@/modules";
import { ApiErrorSchema, createSuccessResponseSchema } from "@/shared/dto/api-response.dto";

export const GetSessionSuccessSchema = createSuccessResponseSchema(LiveSessionInfoSchema);
export type GetSessionSuccess = z.infer<typeof GetSessionSuccessSchema>;

export const GetSessionResponseSchema = z.union([
    ApiErrorSchema,
    GetSessionSuccessSchema,
]);

export type GetSessionResponse = z.infer<typeof GetSessionResponseSchema>;