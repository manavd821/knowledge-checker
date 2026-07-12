import { 
  RoleLevelField,
  FormFieldProps,
} from "@/modules";
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

type Props = FormFieldProps<RoleLevelField["value"]>;

export function RoleLevelSection({
  value,
  onChange,
}: Props){
    return (
            <Select 
            value={value}
            onValueChange={onChange}
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