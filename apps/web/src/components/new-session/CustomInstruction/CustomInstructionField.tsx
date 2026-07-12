import { 
    type CustomInstructionField,
    FormFieldProps,
} from "@/modules";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { useId } from "react";
import { 
    Field, 
    FieldDescription, 
} from "@/components/ui/field";

type Props = FormFieldProps<CustomInstructionField["value"]>;

export function CustomInstructionField({
    value,
    onChange,
    errors,
} : Props){
    const c_i = useId();
    return (
        <Field>
            <SectionHeading optional>Custom Instructions</SectionHeading>
            <Textarea 
            value={value ?? ""}
            maxLength={300}
            onChange={(e) => {
                onChange(e.target.value);
            }}
            id={c_i}
            placeholder="Add any specific instructions for the AI interviewer — topics to focus on, behaviors to avoid, areas to probe deeper, or any relevant context about your background."
            />
            <FieldDescription>{value?.length || 0}/300</FieldDescription>
        </Field>
    )
}