import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { RoleDropdown } from "@/components/new-session/RoleDropdown";
import { FormFieldRole, FormFieldParticipant } from "@/react/session-form/session-form.types";
import { useUser } from "@/react/users/hooks/use-user";
import { GetSearchUsers } from "@/shared/dto/users/search-user.dto";

type Props = {
    setRole: (
        user: GetSearchUsers[number],
        role: FormFieldRole,
        isValue? : boolean,
    ) => void,
    participant: FormFieldParticipant,
    removeParticipant: (participant: FormFieldParticipant) => void,
}
export function ParticipantChip({ 
    participant ,
    setRole,
    removeParticipant,
} : Props){

    const app_user = useUser();
    function displayName(p : FormFieldParticipant) {
        const name = [p.first_name, p.last_name].filter(Boolean).join(" ");
        return name || p.email;
    }
    return (
      <>
        <Badge 
        key={participant.user_id}
        variant={"secondary"}
        className="gap-1 pr-1 px-2 py-5"
        >
        <Avatar
        className="h-6 w-6"
        >
            <AvatarImage
            src={participant.image_url ?? ""}
            alt="image"
            />
            <AvatarFallback
            className={cn(
                "text-white font-semibold border",
                // bg,
                // text, 
            )}
            >{getInitials(participant.first_name + " ")}</AvatarFallback>
        </Avatar>
        <div>
            <p>
            {displayName(participant)} {participant.user_id === app_user.user_id && "(You)"}
            </p>
            <RoleDropdown
            user={participant}
            setRole={setRole}
            showBtn={false}
            btnContent={participant.role}
            isValue
            />
        </div>
        <button
        type="button"
        onClick={() => removeParticipant(participant)}
        className="ml-1 rounded-full outline-none hover:bg-muted"
        >
        <X className="h-3 w-3" />
        </button>
        </Badge>
      </>
  )
}