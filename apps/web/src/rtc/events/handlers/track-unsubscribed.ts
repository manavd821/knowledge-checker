import { ParticipantStore } from "@/store/participant-store";
import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";

export const handleTrackUnsubscribed = (
    payload: RealtimeProviderEvents["trackUnsubscribed"],
    participant_store: ParticipantStore,
) => {
    if (payload.source === "camera") {
        participant_store.remove_video_track(
            payload.participant_id,
        );
        return;
    }

    participant_store.remove_audio_track(
        payload.participant_id,
    );
};