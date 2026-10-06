import { transcript_store } from "@/store/factory";
import { TranscriptHandler } from "@/messaging/handler/transcript-handler";
import { MessageRouter } from "@/messaging/message-router";

export const get_transcript_handler = () => 
        new TranscriptHandler(transcript_store);

export const get_message_router = () : MessageRouter => {
    const router = new MessageRouter();
    router.register(get_transcript_handler());
    return router;
}