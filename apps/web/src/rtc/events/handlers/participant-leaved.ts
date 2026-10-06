import { ParticipantStore } from "@/store/participant-store";
import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";

export const handleParticipantLeave = (
    payload: RealtimeProviderEvents["participantLeft"],
    participant_store: ParticipantStore,
) => {
    participant_store.remove_remote_participant(
        payload.sid,
    );
};