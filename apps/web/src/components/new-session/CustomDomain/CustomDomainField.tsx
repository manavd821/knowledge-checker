
import type { ControllerFieldState } from "react-hook-form";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { Input } from "@/components/ui/input";
import { 
    type CustomDomainField 
} from "@/modules";
import { 
    Field, 
    FieldDescription,
    FieldError,
} from "@/components/ui/field";

export function CustomDomainField({
    field,
    fieldState,
} : {
    field : CustomDomainField;
    fieldState: ControllerFieldState;
}){
    return (
        <Field >
            <SectionHeading>Custom Domain</SectionHeading>
            <Input {...field}
            placeholder="e.g. Fintech"
            aria-invalid={fieldState.invalid}
            required
            />
            <FieldDescription>
                    Specify a niche or sub-domain not listed above.
            </FieldDescription>
            {
                fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                )
            }
        </Field>
    )
}