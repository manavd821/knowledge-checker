
import { useFormContext, useFormState } from "react-hook-form";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { Input } from "@/components/ui/input";
import { 
    Field, 
    FieldDescription,
    FieldError,
} from "@/components/ui/field";
import type { SessionForm } from "@/react/session-form/session-form.types";

export function CustomDomainField(){
    const {
        register,
        control
    } = useFormContext<SessionForm>();
    const { errors } = useFormState({
        control,
        name: "custom_domain"
    })
    return (
        <Field >
            <SectionHeading>Custom Domain</SectionHeading>
            <Input {...register("custom_domain")}
            placeholder="e.g. Fintech"
            aria-invalid={!!errors.custom_domain}
            required
            />
            <FieldDescription>
                    Specify a niche or sub-domain not listed above.
            </FieldDescription>
            {
                !!errors.custom_domain && (
                    <FieldError errors={[errors.custom_domain]} />
                )
            }
        </Field>
    )
}