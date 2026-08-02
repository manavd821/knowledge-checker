import { z } from "zod";
import { ApiErrorSchema, createSuccessResponseSchema } from "@/shared/dto/api-response.dto";
import { STATUS } from "@/db/enums";
import { LiveSessionInfoSchema } from "@/modules";

export const CreateConnectionSchema = LiveSessionInfoSchema.extend({
    token: z.string(),
    ws_url : z.string(),
    room_id: z.string(),
    status: z.enum(STATUS),
    participant_id: z.string(),
    connection_id: z.string(),
}) ;
export type CreateConnection = z.infer<typeof CreateConnectionSchema>;

export const CreateConnectionSuccessSchema = 
    createSuccessResponseSchema(CreateConnectionSchema);

export type CreateConnectionSuccess = z.infer<typeof CreateConnectionSuccessSchema>;

export const CreateConnectionResponseSchema = z.union([
    ApiErrorSchema,
    CreateConnectionSuccessSchema,
]);

export type CreateConnectionResponse = z.infer<typeof CreateConnectionResponseSchema>;
