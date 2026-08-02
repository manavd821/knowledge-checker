import { ParticipantRole } from "@/store/types/participant-role";

export type TranscriptEntry = {
    id : string;
    participantId : string;
    text: string;
    timestamp : Date;
    speaker: ParticipantRole
    final : boolean;
}