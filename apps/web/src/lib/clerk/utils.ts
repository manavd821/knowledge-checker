import { AuthenticationError } from "@/exceptions/AuthenticationError";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server"

export const verifyClerkHook = async (req : NextRequest) => {
    try{
        return await verifyWebhook(req);
    }
    catch(error){
        throw new AuthenticationError(
            "Webhook signature verification failed",
            "webhook_signature",
            error,
        )
    }
}