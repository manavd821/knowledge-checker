import { 
    Field, 
    FieldError, 
} from "@/components/ui/field";
import { 
    type ScheduledAtField,
    FormFieldProps,
} from "@/modules";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { ScheduleSection } from "@/components/new-session/Schedule/ScheduleSection";

type Props = FormFieldProps<ScheduledAtField["value"]>;

export function ScheduleField({
    value,
    onChange,
    errors,
} : Props){

    return (
        <Field>
            <SectionHeading>Schedule Session</SectionHeading>
            <FieldError errors={[errors]}/>
            <ScheduleSection
            value={value}
            onChange={onChange}
            />
        </Field>
    )
}