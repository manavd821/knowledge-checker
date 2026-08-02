import { MessageType } from "@/store/types"

export type DataChannelMessage<T = unknown> = {
    type: MessageType;
    payload : T;
}