import { Progress } from "@/components/ui/progress";
import { useSessionMetaContext } from "@/react/live-session/context/session-meta-provider";
import { useSessionTimer } from "@/react/live-session/hooks/use-session-timer";

export function ProgressBar(){

    const { session : {duration_minutes} } = useSessionMetaContext();
    const { elapsed_seconds } = useSessionTimer();
    const minutes = Math.floor(elapsed_seconds / 60);
    const seconds = elapsed_seconds % 60;
    return (
        <div
        className="border px-2 py-3 rounded-xl flex flex-col gap-1"
        >
            <div
            className="flex justify-between items-center"
            >
                <p
                className="text-xs text-muted-foreground"
                >Progress</p>
                <p
                className="text-sm"
                >{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} / {duration_minutes}:00</p>
            </div>
            <Progress 
            value={(minutes / duration_minutes) * 100}
            className="w-full"
            />
        </div>
    )
}