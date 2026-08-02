import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import { NextRequest, NextResponse } from "next/server";
import { WebhookReceiver } from "livekit-server-sdk";
import { env } from "@/config/env";
import get_logger from "@/lib/logging/logger-factory";
import { get_realtime_webook_router } from "@/rtc/webhook-events/factory";

export const POST = withRequestContextAndErrorHandling(async (
    req: NextRequest,
) => {
    const receiver = new WebhookReceiver(
        env.LIVEKIT_API_KEY,
        env.LIVEKIT_API_SECRET,
    );
    const logger = get_logger();
    const body = await req.text();
    const event = await receiver.receive(body, req.headers.get("authorization") ?? "");
    logger.info("Livekit wbehook recieve", {
        metadata: event.participant?.metadata,
        participant_id: event.participant?.identity,
        event: event.event,
    })
    if(event.event === "participant_left"){
        logger.info("participant left", {participant: event.participant});
        const { connection_id } = JSON.parse(event.participant?.metadata ?? "{}");

        const webhook_router = get_realtime_webook_router();
        webhook_router.handle("participant_left", {connection_id});
    }
    return new NextResponse(null, {status: 204});
})