import { CardField } from "@/components/new-session/CardField";
import { RadioGroup } from "@/components/ui/radio-group";
import { TOPIC_TYPE } from "@/db/enums";
import { cn } from "@/lib/utils";
import { 
    type TopicTypeField,
    FormFieldProps,
    TOPIC_TYPE_META,
} from "@/modules";

type Props = FormFieldProps<TopicTypeField["value"]> & {
    hasError : boolean;
};


export function TopicSection({
  value,
  onChange,
  hasError,
}: Props){
    return (
            <RadioGroup
            className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
            )}
            value={value}
            onValueChange={onChange}
            >
            {
                TOPIC_TYPE.map(topic => {
                    const { label, description, icon } = TOPIC_TYPE_META[topic]
                    return (
                        <CardField 
                        value={topic}
                        selected ={topic == value}
                        Icon={icon}
                        label={label}
                        description={description}
                        key={topic}
                        onChange = {onChange}
                        hasError = {hasError}
                    />
                    )}
                    )
            }
            </RadioGroup>
    )
}