import { 
    Controller, 
    useForm,
} from "react-hook-form";
import { 
    StepFormData, 
} from "@/modules";
import { SessionDurationField } from "@/components/new-session/SessionDuration/SessionDurationField";
import { AIStrictnessField } from "@/components/new-session/AIStrictness/AIStrictnessField";
import { Card, CardContent } from "@/components/ui/card";
import { SettingRow } from "@/components/new-session/SessionSetting/SettingRow";
import { Separator } from "@/components/ui/separator";
import { ScheduleField } from "@/components/new-session/Schedule/ScheduleField";

export function Configuration({
    control,
} : {
    control : ReturnType<typeof useForm<StepFormData>>["control"];
}){
    return (
        <>
        <div
        className="flex gap-2"
        >
            <Controller
            control={control}
            name="duration_minutes"
            render={({field, fieldState}) => (
                <SessionDurationField
                value={field.value}
                onChange={field.onChange}
                errors={fieldState.error}
                />
            ) }
            />
            <Controller
            control={control}
            name="ai_strictness"
            render={({field, fieldState}) => (
                <AIStrictnessField
                value={field.value}
                onChange={field.onChange}
                errors={fieldState.error}
                />
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
        render={({ field, fieldState }) => (
            <ScheduleField
            value={field.value}
            onChange={field.onChange}
            errors={fieldState.error}
            />
        )}
        />
        </>
    )
}