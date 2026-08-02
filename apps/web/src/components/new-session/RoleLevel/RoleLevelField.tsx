import { SectionHeading } from "@/components/new-session/SectionHeading";
import { RoleLevelSection } from "@/components/new-session/RoleLevel/RoleLevelSection";
import { 
    Field, 
    FieldError,
} from "@/components/ui/field";
import type { RoleLevelField } from "@/react/session-form/session-form.types";
import { type FieldError as ErrorType } from "react-hook-form";

export function RoleLevelField({ errors} : {
    errors: ErrorType | undefined
}){

    return (
        <Field>
            <SectionHeading>Role Level</SectionHeading>
            <FieldError
            errors={[errors]}/>
            
            <RoleLevelSection/>
        </Field>
    )
}