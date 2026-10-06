import { z } from "zod";
import {
    ApiErrorSchema,
    createSuccessResponseSchema,
} from "@/shared/dto/api-response.dto";
import { STATUS } from "@/db/enums";

export const ResumeSessionSchema = z.object({
    session_id: z.string(),
    status: z.enum(STATUS),
});

export const ResumeSessionSuccessSchema =
    createSuccessResponseSchema(ResumeSessionSchema);

export type ResumeSessionSuccess =
    z.infer<typeof ResumeSessionSuccessSchema>;

export const ResumeSessionResponseSchema = z.union([
    ApiErrorSchema,
    ResumeSessionSuccessSchema,
]);

export type ResumeSessionResponse =
    z.infer<typeof ResumeSessionResponseSchema>;

export type ResumeSession = 
    z.infer<typeof ResumeSessionSchema>;