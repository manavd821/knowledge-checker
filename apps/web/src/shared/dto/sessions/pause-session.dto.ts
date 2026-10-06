import { z } from "zod";
import {
    ApiErrorSchema,
    createSuccessResponseSchema,
} from "@/shared/dto/api-response.dto";
import { STATUS } from "@/db/enums";

export const PauseSessionSchema = z.object({
    session_id: z.string(),
    status: z.enum(STATUS),
});

export const PauseSessionSuccessSchema =
    createSuccessResponseSchema(PauseSessionSchema);

export type PauseSessionSuccess =
    z.infer<typeof PauseSessionSuccessSchema>;

export const PauseSessionResponseSchema = z.union([
    ApiErrorSchema,
    PauseSessionSuccessSchema,
]);

export type PauseSessionResponse =
    z.infer<typeof PauseSessionResponseSchema>;

export type PauseSession = 
    z.infer<typeof PauseSessionSchema>;