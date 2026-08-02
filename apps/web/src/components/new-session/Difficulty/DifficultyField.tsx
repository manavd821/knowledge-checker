import { SectionHeading } from "@/components/new-session/SectionHeading";
import { DifficultySection } from "@/components/new-session/Difficulty/DifficultySection";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";
import type{ DifficultyField } from "@/react/session-form/session-form.types";
import { type FieldError as ErrorType } from "react-hook-form";

export function DifficultyField({ errors} : {
    errors: ErrorType | undefined
}){
    return (
        <Field>
            <SectionHeading>Difficulty</SectionHeading>
            <FieldError
            errors={[errors]}/>

            <DifficultySection />

        </Field>
    )
}