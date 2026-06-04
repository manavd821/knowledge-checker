import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { handleUserCreate } from "@/lib/clerk/webhook-handlers";
import { Logger } from "@/lib/logging/logger";

export const POST = withRequestContextAndErrorHandling(async (req : NextRequest) => {
        const evt = await verifyWebhook(req);
        const logger = new Logger();
        switch(evt.type){
            case "user.created":
                logger.info("Received user creation webhook event")
                await handleUserCreate(evt);
                break;
        }
    return new Response('Webhook received', { status: 200 });
})