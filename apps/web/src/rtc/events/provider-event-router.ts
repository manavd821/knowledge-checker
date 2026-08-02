import { IRealTimeProvider } from "@/rtc/provider/realtime-provider";
import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";
import { ConfigurationError } from "@/exceptions/ConfigurationError";

export class ProviderEventRouter{

    private handlers  = new  Map<
        keyof RealtimeProviderEvents, 
        Set<(payload: any) => void>
    >();
    constructor(
        private readonly provider: IRealTimeProvider
    ){}

    private subscribeToProviderEvents(
        type: keyof RealtimeProviderEvents,
    ) : void
    {
        this.provider.on(
            type,
            payload => this.handle(type, payload)
        )
    } 

    register<
        K extends keyof RealtimeProviderEvents
    >(
        type: K, 
        handler : (payload: RealtimeProviderEvents[K]) => void
    ) : void 
    {
        let set_of_handlers = this.handlers.get(type);
        if(!set_of_handlers){
            set_of_handlers = new Set<(args: any) => void>();
            this.handlers.set(type, set_of_handlers)
            
            this.subscribeToProviderEvents(type);
        }
        set_of_handlers.add(handler);
    }
    handle<
        K extends keyof RealtimeProviderEvents
    >(
        type: K, 
        payload: RealtimeProviderEvents[K],
    ) : void
    {
        const set_of_handlers = this.handlers.get(type);
        if(!set_of_handlers){
            throw new ConfigurationError(
                `No handlers registered for event type: ${type}`
            )
        }
        set_of_handlers.forEach(handler => handler(payload));
    }
}
