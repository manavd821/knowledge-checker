import { ParticipantStore } from "@/store/participant-store";
import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";
import { LocalParticipantVM } from "@/store/types";

export const handleParticipantJoin = (
    payload: RealtimeProviderEvents["participantJoined"],
    participant_store: ParticipantStore,
) => {
    if (payload.isLocal) {
        participant_store.add_local_participant(
            (payload.participant as LocalParticipantVM)
        );

        return;
    }

    participant_store.add_remote_participant(
        payload.participant
    );
};