import { SectionHeading } from "@/components/new-session/SectionHeading";
import { DomainSection } from "@/components/new-session/Domain/DomainSection";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";
import type{ 
    DomainField, 
} from "@/react/session-form/session-form.types";
import { type FieldError as ErrorType } from "react-hook-form";


export function DomainField({ errors} : {
    errors: ErrorType | undefined
}){
    return (
        <Field>
            <SectionHeading>Domain</SectionHeading>
            <FieldError
            errors={[errors]}/>
            <DomainSection/>
        </Field>
    )
}