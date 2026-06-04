import { createUserWebhookSchema } from "@/lib/db/api/schema/users";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Logger } from "@/lib/logging/logger";
import { ServerError } from "@/exceptions/ServerError";
import { createUser } from "@/lib/db/api/queries/users";


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
        throw new ServerError("Failed to validate Clerk webhook payload");
    }
    
    await createUser(res.data);
}