import { ParticipantStore } from "./participant-store";
import { TranscriptStore } from "./transcript-store";

export const get_transcript_store = () => new TranscriptStore();

export const get_participant_store = () => new ParticipantStore();