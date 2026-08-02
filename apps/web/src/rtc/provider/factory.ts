import { LivekitProvider } from "@/rtc/provider/livekit-provider";

export const get_realtime_provider 
    = () => new LivekitProvider();