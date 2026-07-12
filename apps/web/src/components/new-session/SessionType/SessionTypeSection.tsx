import { SESSION_TYPE } from "@/db/enums";
import { RadioGroup } from "@/components/ui/radio-group";
import { SessionTypeCard } from "@/components/new-session/SessionType/SessionTypeCard";
import { 
    SESSION_TYPE_META,
    SessionTypeField,
    type FormFieldProps,
} from "@/modules";

type Props = FormFieldProps<SessionTypeField["value"]> & {
    hasError : boolean;
};

export function SessionTypeSection({
  value,
  onChange,
  hasError,
}: Props){
    return (
            <RadioGroup
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            value={value}
            onValueChange={onChange}
            >
                {
                    SESSION_TYPE.map(session => {
                        const { Icon, description, label } = SESSION_TYPE_META[session];
                        return (
                            <SessionTypeCard
                            key={session}
                            value={session}
                            selected = {value === session}
                            onChange = {onChange}
                            Icon={Icon} 
                            description={description}
                            label={label}
                            hasError={hasError}
                            />
                        )
                    })
                }
            </RadioGroup>
    )
}