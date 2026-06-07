import { createUserWebhookSchema } from "@/lib/db/api/schema/users";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Logger } from "@/lib/logging/logger";
import { createUser } from "@/lib/db/api/queries/users";
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