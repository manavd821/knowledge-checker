import { Badge } from "@/components/ui/badge"
import { Check } from 'lucide-react';

export function ReviewFeatures({
    realtime_transcript,
    ai_hints_enabled,
    camera_required,
} : {
    realtime_transcript : boolean;
    ai_hints_enabled : boolean;
    camera_required : boolean;
}){
    return (
        <div
        className="flex flex-col gap-2 items-start justify-center text-muted-foreground"
        >
            <p>Features</p>
            <div
            className="flex gap-2"
            >
                <Badge
                variant={realtime_transcript ? "default" : "secondary"}
                >
                    {realtime_transcript && <Check/>} 
                    Realtime Transcript
                </Badge>
                <Badge
                variant={ai_hints_enabled ? "default" : "secondary"}
                >
                    {ai_hints_enabled && <Check/>} 
                    AI Hints
                </Badge>
                <Badge
                variant={camera_required ? "default" : "secondary"}
                >
                    {camera_required && <Check/>} 
                    Camera Required
                </Badge>
            </div>
        </div>
    )
}