import { ParticipantVM } from "@/store/types";

export interface RealtimeProviderEvents{
    connected : void;

    disconnected: void;

    participantJoined: {
        participant : ParticipantVM
    }
}