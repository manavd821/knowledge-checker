import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";
import { SessionConnection } from "@/rtc/provider/types/session-connection";

export interface IRealTimeProvider{

    registerRoomEvent() : void;
    connect(connection: SessionConnection) : Promise<string>;

    
    on<K extends keyof RealtimeProviderEvents>(
        type: K,
        listener: (payload: RealtimeProviderEvents[K]) => void,
    ) : void

    off<K extends keyof RealtimeProviderEvents>(
        type: K,
        listener: (payload: RealtimeProviderEvents[K]) => void,
    ) : void

    emit<K extends keyof RealtimeProviderEvents>(
        type: K,
        payload: RealtimeProviderEvents[K],
    ) : void
}