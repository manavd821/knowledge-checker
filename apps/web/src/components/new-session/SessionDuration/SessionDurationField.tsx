import { Field, FieldError } from "@/components/ui/field";
import { 
    type SessionDurationField, 
    FormFieldProps,
} from "@/modules";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { SessionDurationSection } from "@/components/new-session/SessionDuration/SessionDurationSection";

type Props = FormFieldProps<SessionDurationField["value"]>;

export function SessionDurationField({
    value,
    onChange,
    errors,
} : Props){

    return (
        <Field>
            <SectionHeading>Session Duration</SectionHeading>
            <FieldError errors={[errors]}/>

            <SessionDurationSection
            value={value}
            onChange={onChange}
            />

        </Field>
    )
}