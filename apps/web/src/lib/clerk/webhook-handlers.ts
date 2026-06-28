import { createUserWebhookSchema } from "@/modules/users/users.schema";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Logger } from "@/lib/logging/logger";
import { createUser } from "@/modules/users/users.repository";
import { ValidationError } from "@/exceptions/ValidationError";


export const handleUserCreate = async (evt : WebhookEvent) => {
    const logger = new Logger();
    const res = createUserWebhookSchema.safeParse(evt.data);
    if(!res.success){
        logger.error(
            "Failed to validate Clerk user.created webhook payload",
            {
                eventType: evt.type,
                issues : res.error.issues,
            }
        );
        throw new ValidationError(
            "request payload Validation failed",
            res.error.issues,
            422,
        );
    }
    
    await createUser(res.data);
}