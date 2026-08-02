export type TranscriptPayload = {
    participantId : string;
    text: string;
    speaker: "candidate" | "interviewer" | "ai";
    final: boolean;
}