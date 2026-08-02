import { InterviewSessionManager } from "@/interview-session/interview-session-manager";
import { get_realtime_provider } from "@/rtc/provider/factory";
import { get_message_router } from "@/messaging/factory";
import { get_participant_store, get_transcript_store } from "@/store/factory";
import { get_connection_service } from "@/connection/factory";
import { TranscriptStore } from "@/store/transcript-store";
import { MessageRouter } from "@/messaging/message-router";
import { ParticipantStore } from "@/store/participant-store";
import { get_provider_event_router } from "@/rtc/events/factory";
import { get_frontend_service } from "@/frontend/factory";


export const createInterviewSession = () => {
    const rtc_provider = get_realtime_provider();
    const transcript_store = get_transcript_store();
    const participant_store = get_participant_store();
    const message_router = get_message_router();
    const connection_service = get_connection_service();
    
    const provider_event_router = get_provider_event_router(rtc_provider);
    const frontend_services = get_frontend_service();

    return new InterviewSessionManager(
        rtc_provider,
        message_router,
        transcript_store,
        participant_store,
        connection_service,
        frontend_services.sessions,
        frontend_services.users,
    );
    
}