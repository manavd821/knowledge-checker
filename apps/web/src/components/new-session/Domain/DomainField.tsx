import { 
    type DomainField, 
    FormFieldProps 
} from "@/modules";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { DomainSection } from "@/components/new-session/Domain/DomainSection";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";

type Props = FormFieldProps<DomainField["value"]>;

export function DomainField({
  value,
  onChange,
  errors,
}: Props){
    return (
        <Field>
            <SectionHeading>Domain</SectionHeading>
            <FieldError
            errors={[errors]}/>

            <DomainSection
            value = {value}
            onChange = {onChange}
            />

        </Field>
    )
}