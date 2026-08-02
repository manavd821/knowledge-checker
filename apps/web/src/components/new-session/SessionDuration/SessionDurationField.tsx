import { Field, FieldError } from "@/components/ui/field";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { SessionDurationSection } from "@/components/new-session/SessionDuration/SessionDurationSection";
import type{ SessionDurationField } from "@/react/session-form/session-form.types";
import { type FieldError as ErrorType } from "react-hook-form";


export function SessionDurationField({ errors }: {
    errors: ErrorType | undefined
}){
    return (
        <Field>
            <SectionHeading>Session Duration</SectionHeading>
            <FieldError errors={[errors]}/>

            <SessionDurationSection />

        </Field>
    )
}