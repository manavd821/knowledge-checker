import { IMessageHandler } from "../message-handler.interface";
import { TranscriptStore } from "@/store/transcript-store";
import { TranscriptPayload } from "@/messaging/types";
import { ParticipantRole } from "@/store/types";

export class TranscriptHandler
    implements IMessageHandler<TranscriptPayload>
{
    readonly type = "transcript";

    constructor(
        private readonly store: TranscriptStore,
    ) {}

    handle(payload: TranscriptPayload): void {
        this.store.append({
            id: crypto.randomUUID(),
            participantId: payload.participant_id,
            text: payload.transcript,
            timestamp: new Date(),
            speaker: payload.role as ParticipantRole,
            final: true,
        });
    }
}