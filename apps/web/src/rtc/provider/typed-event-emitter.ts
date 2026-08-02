import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";

export class TypedEventEmitter<Events extends RealtimeProviderEvents>{
    private listeners = new Map<
        keyof Events,
        Set<(payload: any) => void>
    >();

    on<K extends keyof Events>(
        type: K,
        listener: (payload: Events[K]) => void,
    ){
        let set_of_listeners = this.listeners.get(type);
        if(!set_of_listeners){
            set_of_listeners = new Set();
            this.listeners.set(type, set_of_listeners);
        }
        set_of_listeners.add(listener);
    }

    off<K extends keyof Events>(
        type: K,
        listener: (payload: Events[K]) => void,
    ){
        this.listeners.get(type)?.delete(listener);
    }

    emit<K extends keyof Events>(
        type: K,
        payload: Events[K],
    ){
        this.listeners
        .get(type)
        ?.forEach(listener => listener(payload));
    }
}