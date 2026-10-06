import { IRealTimeProvider } from "@/rtc/provider/realtime-provider";
import { ProviderEventRouter } from "@/rtc/events/provider-event-router"


export const get_provider_event_router = (
    provider: IRealTimeProvider,
) : ProviderEventRouter => 
    // manager is already registering event for router, don't register here
    new ProviderEventRouter(provider);
