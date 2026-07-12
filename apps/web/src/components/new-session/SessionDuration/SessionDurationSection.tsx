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
import { 
    type SessionDurationField, 
    FormFieldProps,
} from "@/modules";

type Props = FormFieldProps<SessionDurationField["value"]>;


export function SessionDurationSection({
    value,
    onChange,
} : Props){
    return (
        <Select
        value={value?.toString()}
        onValueChange={(val) => onChange(Number(val) as SessionDurationField["value"])}
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