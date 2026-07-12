import { type LucideIcon } from "lucide-react";
import { SessionFormStep1 } from "@/modules";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CardField({
    value,
    selected,
    Icon,
    label,
    description,
    onChange,
    hasError,
} : {
    value : SessionFormStep1["topic_type"];
    selected: boolean;
    Icon: LucideIcon;
    label: string;
    description : string;
    onChange : (...event: any[]) => void;
    hasError: boolean;
}){
                // hasError && "border-destructive"
    return (
            <Card 
            onClick={() => onChange(value)}
            className={cn(
                "p-4 w-full cursor-pointer transition-all duration-200 h-37 border",
                "hover:shadow-sm hover:border-primary/40 hover:bg-accent/40",
                (selected && "bg-accent border-primary/50 ring-1 ring-primary/20"),
                (hasError && "border-destructive"),
            )}
                >
                <div className="flex justify-between items-center">
                    <div className="rounded-md bg-muted p-2">
                        <Icon className="h-4 w-4 text-muted-foreground"/>
                    </div>
                <RadioGroupItem value={value}></RadioGroupItem>
                </div>
                <div className="space-y-1">
                    <p className="font-medium leading-none">{label}</p>
                    <p className="text-sm text-muted-foreground leading-snug">{description}</p>
                </div>
            </Card>
    )
}