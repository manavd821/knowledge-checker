import { Field, FieldError } from "@/components/ui/field";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { AIStrictnessSection } from "@/components/new-session/AIStrictness/AIStrictnessSection";
import type { AIStrictnessField } from "@/react/session-form/session-form.types";
import { type FieldError as ErrorType } from "react-hook-form";


export function AIStrictnessField({ errors }: {
    errors: ErrorType | undefined
}){
    return (
        <Field>
            <SectionHeading>AI Strictness</SectionHeading>
            <FieldError errors={[errors]}/>

            <AIStrictnessSection/>
        </Field>
    )
}