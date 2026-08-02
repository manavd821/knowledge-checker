import { Field, FieldError } from "@/components/ui/field";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { ParticipantSection } from "@/components/new-session/Participants/ParticipantSection";
import type { 
    ParticipantField,
} from "@/react/session-form/session-form.types";
import { type FieldError as ErrorType } from "react-hook-form";

export function ParticipantField({ errors} : {
    errors: ErrorType | undefined
}){ 
    return (
        <Field>
            <SectionHeading>Participant</SectionHeading>
            <FieldError errors={[errors]}/>
            <ParticipantSection/>
        </Field>
    )
}