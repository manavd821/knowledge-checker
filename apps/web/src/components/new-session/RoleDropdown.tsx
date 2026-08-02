import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"
import { GetSearchUsers } from "@/shared/dto/users/search-user.dto";
import { useState } from "react";
import type { FormFieldRole } from "@/react/session-form/session-form.types";
import { FORMFIELDROLE } from "@/modules";
import { ROLE_META } from "@/react/session-form/sessions.meta";

type SearchUser = GetSearchUsers[number];
type Props = {
    user : SearchUser,
    showBtn: boolean,
    btnContent: string,
    isValue?: boolean,
    setRole: (
        user: SearchUser, 
        role : FormFieldRole,
        isValue?: boolean,
    ) => void,
}
export function RoleDropdown({ 
    user, 
    setRole,
    showBtn = true,
    btnContent,
    isValue = false,
} : Props){
    const [ openUserId, setOpenUserId ] = useState<string | null>(null);
    
    return (
        <DropdownMenu
        open={openUserId === user.user_id}
        onOpenChange={open => setOpenUserId(open ? user.user_id : null)}
        >
            <DropdownMenuTrigger
            asChild
            onClick={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            >
            {
            showBtn ? (
            <Button type="button">{btnContent}</Button>
            ) : (
                <p
                className="text-muted-foreground cursor-pointer"
                >{btnContent}</p>
            )
            }
            </DropdownMenuTrigger>
            <DropdownMenuContent
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            >
            {
                FORMFIELDROLE.map(role => (
                <DropdownMenuItem 
                key={role}
                onSelect={e => {
                    e.preventDefault();
                    setRole(user, role, isValue);
                    setOpenUserId(null);
                }}
                
                >{ROLE_META[role].label}</DropdownMenuItem>
                ))
            }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}