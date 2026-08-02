import { SectionHeading } from "@/components/new-session/SectionHeading";
import { Field, FieldError } from "@/components/ui/field";
import { RoleSection } from "@/components/new-session/Role/RoleSection";
import { useFormContext, type FieldError as FieldErrorType } from "react-hook-form";
import type { FormFieldRole, RoleField, SessionForm } from "@/react/session-form/session-form.types";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";

export function RoleField(){
    const {
        formState : {errors},
    } = useFormContext<SessionForm>();
    const {
        creatorRole,
    } = useSessionDetail();
    return (
        <Field>
            <SectionHeading>Your Role</SectionHeading>
            {!creatorRole && 
            <FieldError
            errors={[errors.creator_role]}
            />}
            <RoleSection/>
        </Field>
    )
}