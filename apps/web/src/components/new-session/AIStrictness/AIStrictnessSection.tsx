import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AI_STRICTNESS } from "@/db/enums";
import { 
    type AIStrictnessField, 
    FormFieldProps,
} from "@/modules";

type Props = FormFieldProps<AIStrictnessField["value"]>;

export function AIStrictnessSection({
    value,
    onChange,
} : Props){
    return (
        <Select
        value={value}
        onValueChange={onChange}
        >
        <SelectTrigger className="w-45">
            <SelectValue placeholder="Select strictness" />
        </SelectTrigger>
        <SelectContent >
            <SelectGroup>
                <SelectLabel>Select strictness</SelectLabel>
                {
                    AI_STRICTNESS.map(level => (
                        <SelectItem 
                        value={level}
                        key={level}
                        >{level}</SelectItem>
                    ))
                }
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}