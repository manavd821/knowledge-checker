import { ParticipantRole } from "@/store/types";

export type TranscriptPayload = {
    session_id: string;
    participant_id: string;
    transcript: string;
    role: ParticipantRole;
};