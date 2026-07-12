import { Field, FieldError } from "@/components/ui/field";
import { 
    type AIStrictnessField, 
    FormFieldProps,
} from "@/modules";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { AIStrictnessSection } from "@/components/new-session/AIStrictness/AIStrictnessSection";

type Props = FormFieldProps<AIStrictnessField["value"]>;

export function AIStrictnessField({
    value,
    onChange,
    errors,
} : Props){

    return (
        <Field>
            <SectionHeading>AI Strictness</SectionHeading>
            <FieldError errors={[errors]}/>

            <AIStrictnessSection
            value={value}
            onChange={onChange}
            />

        </Field>
    )
}