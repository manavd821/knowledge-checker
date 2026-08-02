import { createUserWebhookSchema } from "@/modules/users/users.schema";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Logger } from "@/lib/logging/logger";
import { createRepositories } from "@/modules/factory";
import { db } from "@/db/client";
import { ValidationError } from "@/exceptions/ValidationError";

export const handleUserCreate = async (evt : WebhookEvent) => {
    const logger = new Logger();
    const res = createUserWebhookSchema.safeParse(evt.data);
    if(!res.success){
        throw new ValidationError(
            "request payload Validation failed for user creation webhook",
            res.error.issues,
        );
    }
    const repos = createRepositories(db);
    await repos.users.create_user(res.data);
    logger.info("user created succefully");
}