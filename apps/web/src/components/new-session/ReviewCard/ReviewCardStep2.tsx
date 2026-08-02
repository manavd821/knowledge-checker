import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { ReviewDetailRow } from "@/components/new-session/ReviewDetailRow";
import { SetStateAction } from "react";
import { 
    SESSION_DURATION_LABELS,
    AI_STRICTNESS_META,
} from "@/react/session-form/sessions.meta";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ReviewFeatures } from "@/components/new-session/ReviewFeatures";
import { SessionForm } from "@/react/session-form/session-form.types";

export function ReviewCardStep2({
    data, 
    setCurrentStep,
} : {
    data : SessionForm;
    setCurrentStep : React.Dispatch<SetStateAction<number>>;
}){
    
    return (
        <Card
        className="overflow-hidden py-0 gap-0"
        >
            <CardHeader className="bg-muted py-3 px-6">
                <CardTitle
                className="mt-1"
                >Configuration</CardTitle>
                <CardAction>
                <Button 
                onClick={_ => setCurrentStep(1)}
                variant={"ghost"} size="sm"
                >
                    <Pencil />
                    Edit
                </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div>
                    <ReviewDetailRow
                    label="Session Duration"
                    value={SESSION_DURATION_LABELS[data?.duration_minutes!] || ""}
                    />
                    <ReviewDetailRow
                    label="AI Strictness"
                    value={AI_STRICTNESS_META[data?.ai_strictness!].label || ""}
                    />
                    <ReviewFeatures
                    realtime_transcript={data.realtime_transcript}
                    ai_hints_enabled={data.ai_hints_enabled}
                    camera_required={data.camera_required}
                    />
                    
                    <ReviewDetailRow
                    label="Scheduled"
                    value={data?.scheduled_at?.toLocaleString() ?? "Not scheduled — start immediately"}
                    />
                </div>
            </CardContent>
        </Card>
    )
}