
import { SessionTypeSection } from "@/components/new-session/SessionType/SessionTypeSection";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";
import { type FieldError as ErrorType } from "react-hook-form";


export function SessionTypeField({ errors} : {
    errors: ErrorType | undefined
}){
    return (
        <Field>
            <SectionHeading>Session Type</SectionHeading>
            <FieldError
            errors={[errors]}/>

            <SessionTypeSection hasError={!!errors}/>

        </Field>
    )
}