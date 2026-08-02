import { ObservableStore } from "@/store/observable-store";
import { MessageType } from "@/store/types";

export interface IMessageHander<T = unknown>{
    readonly type: MessageType;
    readonly store : ObservableStore
    handle(payload: T): void;
}