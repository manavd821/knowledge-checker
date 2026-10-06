import { ParticipantStore } from "@/store/participant-store";
import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";

export const handleTrackSubscribed = (
    payload: RealtimeProviderEvents["trackSubscribed"],
    participant_store: ParticipantStore,
) => {
    
    if (payload.source === "camera") {
        participant_store.set_video_track(
            payload.participant_id,
            payload.track,
        );
        return;
    }
    console.log("SETTING AUDIO TRACK", {
        participant_id: payload.participant_id,
        track: payload.track,
        readyState: payload.track.readyState,
    });
    participant_store.set_audio_track(
        payload.participant_id,
        payload.track,
    );
};