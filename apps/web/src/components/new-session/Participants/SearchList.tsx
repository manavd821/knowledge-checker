import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { GetSearchUsers } from "@/shared/dto/users/search-user.dto";
import { Participant } from "@/components/new-session/Participants/Participant";
import { RoleDropdown } from "@/components/new-session/RoleDropdown";
import { FormFieldParticipant, FormFieldRole } from "@/react/session-form/session-form.types";

type SearchUser = GetSearchUsers[number];
type Props = {
    isPending: boolean,
    users : GetSearchUsers,
    addParticipant: (participant: FormFieldParticipant) => void,
    userRole: Record<string, FormFieldRole>,
    setRole: (
        user: SearchUser,
        role : FormFieldRole,
    ) => void
}
export function SearchList({
    isPending,
    userRole,
    users,
    addParticipant,
    setRole,
}: Props){
    return (
        <Command
        className="w-full max-h-64 overflow-y-auto rounded-md"
        >
        <CommandList
        className="w-full max-h-64 overflow-y-auto"
        >
            {isPending && (
            <div 
            className="p-2 text-sm text-muted-foreground">Searching…</div>
            )}
            {!isPending && <CommandEmpty>No users found.</CommandEmpty>}
        <CommandGroup>
            {users.map(u => (
            <div
            className="flex justify-between"
            key={u.user_id}
            >
                <CommandItem
                value={u.user_id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => addParticipant({...u, role: userRole[u.user_id] ?? "interviewer"})}
                className="w-full flex justify-between"
                >
                <Participant
                user={u} 
                role={userRole[u.user_id] ?? "interviewer"}
                />
                <RoleDropdown
                user={u}
                setRole={setRole}
                showBtn
                btnContent="Role"
                />
                </CommandItem>
            </div>
            ))}
        </CommandGroup>
        </CommandList>
        </Command>
    )
}