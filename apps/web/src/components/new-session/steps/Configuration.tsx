import { 
    Controller, 
    useFormContext,
} from "react-hook-form";
import { SessionDurationField } from "@/components/new-session/SessionDuration/SessionDurationField";
import { AIStrictnessField } from "@/components/new-session/AIStrictness/AIStrictnessField";
import { Card, CardContent } from "@/components/ui/card";
import { SettingRow } from "@/components/new-session/SessionSetting/SettingRow";
import { Separator } from "@/components/ui/separator";
import { ScheduleField } from "@/components/new-session/Schedule/ScheduleField";
import { SessionForm } from "@/react/session-form/session-form.types";

export function Configuration(){
    const {
        control,
    } = useFormContext<SessionForm>();
    return (
        <>
        <div
        className="flex gap-2"
        >
            <Controller
            control={control}
            name="duration_minutes"
            render={({fieldState}) => (
                <SessionDurationField errors = {fieldState.error}/>
            ) }
            />
            <Controller
            control={control}
            name="ai_strictness"
            render={({fieldState}) => (
                <AIStrictnessField errors={fieldState.error}/>
            ) }
            />
        </div>
        <Card>
            <CardContent>
                <Controller
                control={control}
                name="realtime_transcript"
                render={({field}) => (
                    <SettingRow
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        title="Realtime Transcript"
                        description="Display live captions during the session"
                    />
                ) }
                />
            </CardContent>
            <CardContent>
                <Separator/>
            </CardContent>
            <CardContent>
                <Controller
                control={control}
                name="ai_hints_enabled"
                render={({field}) => (
                    <SettingRow
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        title="AI Hints"
                        description="Allow contextual hints when you are stuck"
                    />
                ) }
                />
            </CardContent>
            <CardContent>
                <Separator/>
            </CardContent>
            <CardContent>
                <Controller
                control={control}
                name="camera_required"
                render={({field}) => (
                    <SettingRow
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        title="Camera Required"
                        description="Enable webcam video for this session"
                    />
                ) }
                />
            </CardContent>
        </Card>
        
        <Controller
        control={control}
        name="scheduled_at"
        render={({fieldState}) => (
            <ScheduleField errors={fieldState.error}/>
        )}
        />
        </>
    )
}