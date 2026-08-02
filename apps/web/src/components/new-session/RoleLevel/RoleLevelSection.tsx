import { ROLE_LEVEL } from "@/db/enums";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";

export function RoleLevelSection(){
    const {
      roleLevel,
      updateRoleLevel,
    } = useSessionDetail();
    return (
            <Select 
            value={roleLevel}
            onValueChange={updateRoleLevel}
            >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role level</SelectLabel>
                {
                  ROLE_LEVEL.map(role => (
                    <SelectItem 
                    key={role}
                    value={role}>{role}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
    )
}