import { createContext } from "react"
import { useFormContext, useWatch } from "react-hook-form";
import { SessionForm } from "@/react/session-form/session-form.types";

export type SessionConfigContext = {
    sessionDuration: SessionForm["duration_minutes"],
    aiStrictness: SessionForm["ai_strictness"],
    realtimeTranscript: SessionForm["realtime_transcript"],
    aiHintsEnabled: SessionForm["ai_hints_enabled"],
    cameraRequired: SessionForm["camera_required"],
    scheduledAt: SessionForm["scheduled_at"],
    updateSessionDuration: (duration: SessionForm["duration_minutes"]) => void,
    updateAIStrictness: (strictness : SessionForm["ai_strictness"]) => void,
    updateRealtimeTranscript: (enabled : SessionForm["realtime_transcript"]) => void,
    updateAIHintsEnabled: (enabled : SessionForm["ai_hints_enabled"]) => void,
    updateCameraRequired: (required : SessionForm["camera_required"]) => void,
    updateScheduledAt: (scheduledAt : SessionForm["scheduled_at"]) => void,
}

export const SessionConfigContext = createContext<SessionConfigContext | null>(null);

export const SessionConfigProvider = ({ children } : {
    children: React.ReactNode,  
}) => {
    const {
        control,
        setValue,
        setError,
        clearErrors,
    } = useFormContext<SessionForm>();
    const sessionDuration = useWatch({
        control,
        name: "duration_minutes",
    });
    const aiStrictness = useWatch({
        control,
        name: "ai_strictness",
    });
    const realtimeTranscript = useWatch({
        control,
        name: "realtime_transcript",
    });
    const aiHintsEnabled = useWatch({
        control,
        name: "ai_hints_enabled",
    });
    const cameraRequired = useWatch({
        control,
        name: "camera_required",
    });
    const scheduledAt = useWatch({
        control,
        name: "scheduled_at",
    });
    function updateSessionDuration(duration: SessionForm["duration_minutes"]){
        setValue('duration_minutes', duration, {
            shouldDirty: true,
            shouldValidate: true,
        });
        clearErrors("duration_minutes");
    }
    function updateAIStrictness(strictness: SessionForm["ai_strictness"]){
        setValue('ai_strictness', strictness, {
            shouldDirty: true,
            shouldValidate: true,
        });
        clearErrors("ai_strictness");
    }
    function updateRealtimeTranscript(enabled: SessionForm["realtime_transcript"]){
        setValue('realtime_transcript', enabled, {
            shouldDirty: true,
            shouldValidate: true,
        });
        clearErrors("realtime_transcript");
    }
    function updateAIHintsEnabled(enabled: SessionForm["ai_hints_enabled"]){
        setValue('ai_hints_enabled', enabled, {
            shouldDirty: true,
            shouldValidate: true,
        });
        clearErrors("ai_hints_enabled");
    }
    function updateCameraRequired(required: SessionForm["camera_required"]){
        setValue('camera_required', required, {
            shouldDirty: true,
            shouldValidate: true,
        });
        clearErrors("camera_required");
    }
    function updateScheduledAt(scheduledAt: SessionForm["scheduled_at"]){
        setValue('scheduled_at', scheduledAt, {
            shouldDirty: true,
            shouldValidate: true,
        });
        clearErrors("scheduled_at");
    }
    const value : SessionConfigContext = {
        sessionDuration,
        aiStrictness,
        realtimeTranscript,
        aiHintsEnabled,
        cameraRequired,
        scheduledAt,
        updateSessionDuration,
        updateAIStrictness,
        updateRealtimeTranscript,
        updateAIHintsEnabled,
        updateCameraRequired,
        updateScheduledAt,
    }
    return (
        <SessionConfigContext value={value}>
            {children}
        </SessionConfigContext>
    )
}