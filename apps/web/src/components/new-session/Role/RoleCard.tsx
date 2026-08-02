import { type LucideIcon } from "lucide-react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FormFieldRole, SessionForm } from "@/react/session-form/session-form.types";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";
import { useFormContext } from "react-hook-form";

export function RoleCard({
    value,
    selected,
    Icon,
    label,
    description,
} : {
    value : FormFieldRole;
    selected: boolean;
    Icon: LucideIcon;
    label: string;
    description : string;
}){
    const {
        isAISession,
        updateCreatorRole,
    } = useSessionDetail();
    const {
        formState: { errors }
    } = useFormContext<SessionForm>();
    const hasError = !!errors.role_level     // hasError && "border-destructive"
    return (
            <Card 
            onClick={() => updateCreatorRole(value)}
            className={cn(
                "p-4 w-full cursor-pointer transition-all duration-200 h-37 border",
                ( !isAISession &&
                    "hover:shadow-sm hover:border-primary/40 hover:bg-accent/40"
                ),
                (selected && "bg-accent border-primary/50 ring-1 ring-primary/20"),
                (hasError && "border-destructive"),
                (isAISession && value === "interviewer" && "cursor-not-allowed")
            )}
                >
                <div className="flex justify-between items-center">
                    <div className="rounded-md bg-muted p-2">
                        <Icon className="h-4 w-4 text-muted-foreground"/>
                    </div>
                <RadioGroupItem value={value!}></RadioGroupItem>
                </div>
                <div className="space-y-1">
                    <p className="font-medium leading-none">{label}</p>
                    <p className="text-sm text-muted-foreground leading-snug">{description}</p>
                </div>
            </Card>
    )
}