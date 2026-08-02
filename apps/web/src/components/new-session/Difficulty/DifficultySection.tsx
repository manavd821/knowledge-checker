import { DIFFICULTY } from "@/db/enums";
import { 
    ToggleGroup, 
    ToggleGroupItem, 
} from "@/components/ui/toggle-group";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";
import { cn } from "@/lib/utils";

export function DifficultySection(){
    const {
        difficulty,
        updateDifficulty,
    } = useSessionDetail();
    return (
            <ToggleGroup
            className="grid w-full grid-cols-2 gap-2 sm:flex sm:gap-0 sm:bg-muted"
            type="single" 
            spacing={2}
            value={difficulty}
            onValueChange={updateDifficulty}
            >
                {
                    DIFFICULTY.map(d => (
                        <ToggleGroupItem
                        variant={difficulty === d ? "outline" : "default"}
                        className={cn("flex-1")} 
                        key={d}
                        value={d}
                        >{d}</ToggleGroupItem>
                    ))
                }
            </ToggleGroup>
    )
}