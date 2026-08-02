import { useSearchUser } from "@/react/users/hooks/use-search-users";
import { useEffect, useState } from "react";
import { GetSearchUsers } from "@/shared/dto/users/search-user.dto";
import { useDebounce } from "@/react/use-debounce";
import { cn } from "@/lib/utils";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { SearchList } from "@/components/new-session/Participants/SearchList";
import type { FormFieldRole } from "@/react/session-form/session-form.types";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";
import { ParticipantChip } from "./ParticipantChip";

type SearchUser = GetSearchUsers[number];

export function ParticipantSection(){
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue, 300);
    const [ open, setOpen ] = useState(false);
    const [userRole, setUserRole] = useState<Record<string, FormFieldRole>>({});
    const {
      participants,
      updateParticipantRole,
      addParticipant,
      removeParticipant,
      isAISession,
    } = useSessionDetail();
    const {
      isPending,
      isError,
      data,
      error,
    } = useSearchUser(debouncedSearch);
    if(isError){
      console.log(error);
    }
    const selectedIds = new Set(participants.map(u => u.user_id));
    const results = (data ?? []).filter(u => !selectedIds.has(u.user_id))
    
    function setRole(
      user: SearchUser,
      role : FormFieldRole = "interviewer",
      isValue = false,
    ){
      console.log(`user ${user.user_id} : ${role}`);
      if(isValue){
        updateParticipantRole({
          ...user,
          role: "interviewer",
        }, role);
      }
      setUserRole(prev => ({
        ...prev,
        [user.user_id] : role,
      }));      
    }
    useEffect(()=>{
      if(isAISession && participants.length >= 1){
        setSearchValue("");
      }
    },[isAISession, participants])
    return (
      <>
        <div
            className="flex flex-wrap gap-1"
            >
              {
                participants.map(p => (
                  <ParticipantChip
                  participant={p}
                  setRole={setRole}
                  removeParticipant={removeParticipant}
                  key={p.user_id}
                />
                ))
              }
        </div>
        <Popover
        onOpenChange={setOpen}
        open={open}
        >
          <PopoverAnchor asChild>
            <div
            className={cn(
              "flex flex-wrap items-center border rounded-2xl",
              isAISession && participants.length >= 1 && "cursor-not-allowed"
            )}
            >
              <Input
              placeholder="Search participants..."
              value={searchValue}
              disabled={isAISession && participants.length >= 1}
              onChange={e => {
                setSearchValue(e.target.value);
                e.target.value && setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              // onBlur={() => setTimeout(() => setOpen(false), 150)}
              className={cn(
                "h-10 flex-1 focus:ring-0 rounded-[inherit]",
              )}
              />
            </div>
          </PopoverAnchor>
          <PopoverContent
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-full p-0"
          >
            {searchValue && (
              <SearchList
              isPending={isPending}
              userRole={userRole}
              users={results}
              addParticipant={addParticipant}
              setRole={setRole}
              />
            )}
          </PopoverContent>
        </Popover>
      </>
  )
}