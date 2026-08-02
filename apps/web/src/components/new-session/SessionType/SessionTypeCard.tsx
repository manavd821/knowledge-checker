import { 
    MoveRight,
    Check,
    type LucideIcon 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SessionFormStep1 } from "@/react/session-form/session-form.types";

export function SessionTypeCard({
    value,
    selected,
    Icon,
    description,
    label,
    onChange,
    hasError,
}: {
    value : SessionFormStep1["session_type"];
    selected: boolean;
    description: string;
    Icon: LucideIcon;
    label: string;
    onChange: (...event: any[]) => void;
    hasError?: boolean;
}){
    return (
        <Card 
        onClick={() => onChange(value)}
        className={cn(
            "w-full p-5 cursor-pointer transition-all duration-200 border",
            "hover:border-primary/40 hover:bg-accent/40 hover:shadow-sm",
            (selected && "bg-accent border-primary/50 ring-1 ring-primary/20"),
            (hasError && "border-destructive"),            
        )}>
                <div className="flex h-full items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-muted p-3">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>

                    <div className="flex flex-col justify-center gap-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                                Human
                            </h3>

                            <MoveRight className="h-4 w-4 text-muted-foreground" />

                            <h3 className="font-semibold">
                                {label}
                            </h3>
                        </div>

                        <p className="text-sm text-muted-foreground">
                        {description}
                        </p>
                    </div>
                </div>

                {selected && <Check className="h-5 w-5 text-primary" />}
                </div>
        </Card>
    )
}