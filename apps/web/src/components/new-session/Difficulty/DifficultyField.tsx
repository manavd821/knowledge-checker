
import type { FieldError as fieldError } from "react-hook-form";
import { 
    type DifficultyField,
    FormFieldProps,
} from "@/modules";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { DifficultySection } from "@/components/new-session/Difficulty/DifficultySection";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";

type Props = FormFieldProps<DifficultyField["value"]>;

export function DifficultyField({
  value,
  onChange,
  errors,
}: Props){
    return (
        <Field>
            <SectionHeading>Difficulty</SectionHeading>
            <FieldError
            errors={[errors]}/>

            <DifficultySection
            value = {value}
            onChange = {onChange}
            />

        </Field>
    )
}