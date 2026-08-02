import { RadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { FORMFIELDROLE } from "@/modules";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";
import { ROLE_META } from "@/react/session-form/sessions.meta";
import { RoleCard } from "@/components/new-session/Role/RoleCard";

export function RoleSection(){
    const {
        creatorRole,
        updateCreatorRole,
    } = useSessionDetail();
    return (
            <RadioGroup
            className={cn(
                "flex flex-col md:flex-row",
            )}
            value={creatorRole}
            onValueChange={updateCreatorRole}
            >
            {
                FORMFIELDROLE.map((role) => {
                    const { label, description, icon } = ROLE_META[role]
                    return (
                        <RoleCard 
                        value={role}
                        selected ={role === creatorRole}
                        Icon={icon}
                        label={label}
                        description={description}
                        key={role}
                    />
                    )}
                    )
            }
            </RadioGroup>
    )
}