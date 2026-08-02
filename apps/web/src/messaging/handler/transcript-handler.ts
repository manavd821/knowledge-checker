import { IMessageHander } from "../message-handler.interface";
import { TranscriptStore } from "@/store/transcript-store";
import { TranscriptPayload } from "@/messaging/types";
import { randomUUID } from "crypto";

export class TranscriptHandler implements IMessageHander<TranscriptPayload>{
    readonly type = "transcript";
    constructor(
        readonly store: TranscriptStore,
    ){}
    handle(payload: TranscriptPayload): void {
        this.store.append({
            ...payload,
            id : randomUUID().toString(),
            timestamp : new Date(),
        });
    }
}