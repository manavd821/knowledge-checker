import { DataChannelMessage } from "@/messaging/types";
import { ParticipantVM } from "@/store/types";

export interface RealtimeProviderEvents{
    connected : void;

    disconnected: void;

    participantJoined: {
        participant : ParticipantVM;
        isLocal: boolean;
    }
    participantLeft: {
        sid: string;
    };
    dataReceived: {
        message: DataChannelMessage;
        sender_id?: string;
    };

    trackSubscribed: {
        participant_id: string;
        source: "camera" | "microphone";
        track: MediaStreamTrack;
    };

    trackUnsubscribed: {
        participant_id: string;
        source: "camera" | "microphone";
    };
    audioPlaybackBlocked: undefined;

}