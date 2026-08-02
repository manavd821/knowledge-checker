import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, getAvatarColor, getInitials } from "@/lib/utils"
import { FormFieldRole } from "@/react/session-form/session-form.types";
import { useUser } from "@/react/users/hooks/use-user";
import { GetSearchUsers } from "@/shared/dto/users/search-user.dto";

export function Participant({ 
    user,
    btn = false,
    role = "interviewer",
    roleDisplay = "bottom",
} : {
    user: GetSearchUsers[number],
    btn?: boolean,
    role?: FormFieldRole,
    roleDisplay? : "side" | "bottom"
}){
    const { 
        first_name,
        last_name,
        email,
        image_url,
        user_id,
    } = user;
    const {bg, text} = getAvatarColor(first_name + " " + last_name);
    const app_user = useUser();
    return (
        <div
        className="w-full flex justify-between items-center"
        >
            <div
            className="flex items-center gap-2"
            >
                <Avatar>
                    <AvatarImage
                    src={image_url ?? ""}
                    alt="image"
                    />
                    <AvatarFallback
                    className={cn(
                        "text-white font-semibold border",
                        bg,
                        text, 
                    )}
                    >{getInitials(first_name + " " + last_name)}</AvatarFallback>
                </Avatar>
                <div>
                    <p
                    >{first_name} {last_name} {user_id === app_user.user_id && "(you)"}
                    {roleDisplay === "side" && <span className="text-muted-foreground"> ({role}) </span>}
                    </p>
                    <p
                    className="text-xs text-muted-foreground"
                    >{email}</p>
                    {roleDisplay === "bottom" &&<p
                    className="text-xs text-muted-foreground"
                    >{role}</p>}
                </div>
            </div>
        </div>
    )
}