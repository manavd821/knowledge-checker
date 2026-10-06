import { ObservableStore } from "@/store/observable-store";
import { MessageType } from "@/store/types";

export interface IMessageHandler<
    TPayload = unknown,
>{
    readonly type: MessageType;
    handle(payload: TPayload): void;
}