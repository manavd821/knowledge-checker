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
import { useSessionConfig } from "@/react/session-form/hooks/use-session-config";

export function AIStrictnessSection(){
    const {
        aiStrictness,
        updateAIStrictness,
    } = useSessionConfig();
    return (
        <Select
        value={aiStrictness}
        onValueChange={updateAIStrictness}
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