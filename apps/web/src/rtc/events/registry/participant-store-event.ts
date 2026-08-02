import { ParticipantStore } from "@/store/participant-store";
import { ProviderEventRouter } from "@/rtc/events/provider-event-router";
import { ParticipantVM } from "@/store/types";

const register_participant_store_event = (
    store: ParticipantStore,
    router: ProviderEventRouter,
) => {
    router.register(
        "participantJoined", 
        ({participant} : {participant : ParticipantVM}) => store.add_remote_participant(participant)
    )
}