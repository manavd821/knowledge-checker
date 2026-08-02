import { z } from "zod";
import { ErrorCode } from "@/shared/errors/error-code";

export const ApiErrorSchema = z.object({
    success: z.literal(false),
    code : z.enum(ErrorCode),
    message: z.string(),
    status_code : z.number(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;

export function createSuccessResponseSchema<T extends z.ZodType>(dataSchema : T){
    return z.object({
        success: z.literal(true),
        data: dataSchema,
    })
}