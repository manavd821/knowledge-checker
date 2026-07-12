import { DIFFICULTY } from "@/db/enums";
import  { 
    type DifficultyField, 
    FormFieldProps,
} from "@/modules";
import { 
    ToggleGroup, 
    ToggleGroupItem, 
} from "@/components/ui/toggle-group";

type Props = FormFieldProps<DifficultyField["value"]>;

export function DifficultySection({
  value,
  onChange,
}: Props){
    return (
            <ToggleGroup
            className="grid w-full grid-cols-2 gap-2 sm:flex sm:gap-0 sm:bg-muted"
            type="single" 
            spacing={2}
            value={value}
            onValueChange={onChange}
            >
                {
                    DIFFICULTY.map(difficulty => (
                        <ToggleGroupItem
                        variant={value === difficulty ? "outline" : "default"}
                        className={`flex-1`} 
                        key={difficulty}
                        value={difficulty}>{difficulty}</ToggleGroupItem>
                    ))
                }
            </ToggleGroup>
    )
}