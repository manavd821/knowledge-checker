import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SESSION_DURATIONS } from "@/db/enums";
import { useSessionConfig } from "@/react/session-form/hooks/use-session-config";
import type { SessionDurationField } from "@/react/session-form/session-form.types";


export function SessionDurationSection(){
    const {
        sessionDuration,
        updateSessionDuration,
    } = useSessionConfig();
    return (
        <Select
        value={sessionDuration.toString()}
        onValueChange={(val) => updateSessionDuration(Number(val) as SessionDurationField["value"])}
        >
        <SelectTrigger className="w-45">
            <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent >
            <SelectGroup>
                <SelectLabel>Select duration</SelectLabel>
                {
                    SESSION_DURATIONS.map(duration => (
                        <SelectItem 
                        value={duration?.toString()}
                        key={duration}
                        >{duration} minutes</SelectItem>
                    ))
                }
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}