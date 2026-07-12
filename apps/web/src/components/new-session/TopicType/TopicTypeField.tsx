import { 
    type TopicTypeField,
    FormFieldProps,
} from "@/modules";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { TopicSection } from "@/components/new-session/TopicType/TopicSection";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";

type Props = FormFieldProps<TopicTypeField["value"]>;

export function TopicTypeField({
  value,
  onChange,
  errors,
}: Props){
    return (
        <Field>
            <SectionHeading>Topic Type</SectionHeading>
            <FieldError
            errors={[errors]}/>

            <TopicSection
            value = {value}
            onChange = {onChange}
            hasError = {!!errors}
            />

        </Field>
    )
}