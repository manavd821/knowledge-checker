import { SectionHeading } from "@/components/new-session/SectionHeading";
import { TopicSection } from "@/components/new-session/TopicType/TopicSection";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";
import type { 
    TopicTypeField,
} from "@/react/session-form/session-form.types";
import { type FieldError as ErrorType } from "react-hook-form";

export function TopicTypeField({ errors} : {
    errors: ErrorType | undefined
}){
    
    return (
        <Field>
            <SectionHeading>Topic Type</SectionHeading>
            <FieldError
            errors={[errors]}/>
            <TopicSection hasError={!!errors}/>
        </Field>
    )
}