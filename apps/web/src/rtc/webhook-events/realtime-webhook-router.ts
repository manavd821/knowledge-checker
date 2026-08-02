import { ConfigurationError } from "@/exceptions/ConfigurationError";
import { ProvisionerWebhookEvents } from "@/rtc/webhook-events/provisioner-webhook-events";

type EventHandler<T> = (payload: T) => Promise<void>;

export class RealtimeWebhookRouter{
    private handlers = new Map<
        keyof ProvisionerWebhookEvents,
        Set<EventHandler<any>>
    >();

    register<K extends keyof ProvisionerWebhookEvents>(
        event: K,
        handler: EventHandler<ProvisionerWebhookEvents[K]>
    ){
        let handlers = this.handlers.get(event);
        if(!handlers){
            handlers = new Set();
            this.handlers.set(event, handlers);
        }
        handlers.add(handler);
    }
    async handle<K extends keyof ProvisionerWebhookEvents>(
        event: K,
        payload : ProvisionerWebhookEvents[K]
    ){
        const handlers = this.handlers.get(event);
        if(!handlers){
            throw new ConfigurationError(
                `No handlers registered for event: ${event} inside RealtimeWebhookRouter`,
            );
        }
        handlers.forEach(async (hand) => {
            await hand(payload);
        });
    }
}