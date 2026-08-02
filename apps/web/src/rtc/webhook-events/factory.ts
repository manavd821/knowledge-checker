import { RealtimeWebhookRouter } from "@/rtc/webhook-events/realtime-webhook-router";
import { handleParticipantLeft } from "@/rtc/webhook-events/handlers";

export const get_realtime_webook_router = () : RealtimeWebhookRouter => {
    const router = new RealtimeWebhookRouter();
    router.register("participant_left", handleParticipantLeft);
    
    return router;
}