
import { type SessionTypeField,FormFieldProps } from "@/modules";
import { SessionTypeSection } from "@/components/new-session/SessionType/SessionTypeSection";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";

type Props = FormFieldProps<SessionTypeField["value"]>

export function SessionTypeField({
  value,
  onChange,
  errors,
}: Props){
    return (
        <Field>
            <SectionHeading>Session Type</SectionHeading>
            <FieldError
            errors={[errors]}/>

            <SessionTypeSection
            value = {value}
            onChange = {onChange}
            hasError={!!errors}
            />

        </Field>
    )
}