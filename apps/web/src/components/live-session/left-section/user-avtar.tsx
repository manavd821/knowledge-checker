import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getAvatarColor, getInitials } from "@/lib/utils"

type Props = {
    name: string,
}
export function UserAvtar({ name } : Props){
    const { bg, text } = getAvatarColor(name);
    return (
        <Avatar
        className="h-10 w-10"
        >
            <AvatarFallback
            className={cn(
                "text-white font-semibold border",
                bg,
                text, 
            )}
            >{getInitials(name)}
            </AvatarFallback>
        </Avatar>
    )
}