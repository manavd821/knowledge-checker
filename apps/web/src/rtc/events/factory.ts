import { IRealTimeProvider } from "@/rtc/provider/realtime-provider";
import { ProviderEventRouter } from "@/rtc/events/provider-event-router"

export const get_provider_event_router = (provider: IRealTimeProvider) : ProviderEventRouter=> {
    return new ProviderEventRouter(provider);
}