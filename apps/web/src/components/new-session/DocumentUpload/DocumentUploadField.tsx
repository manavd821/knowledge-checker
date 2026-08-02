import { SectionHeading } from "@/components/new-session/SectionHeading";
import { Field, FieldError } from "@/components/ui/field";
import { DocumentUploadSection } from "@/components/new-session/DocumentUpload/DocumentUploadSection";
import { type FieldError as ErrorType } from "react-hook-form";

export function DocumentUploadField({ errors }: {
    errors: ErrorType | undefined
}){
    return (
        <Field>
            <SectionHeading optional>Session Documents</SectionHeading>
            <FieldError errors={[errors]}/>
            <p
            className="text-muted-foreground"
            >Job description, resume, study notes, or case materials</p>
            <DocumentUploadSection />
        </Field>

    )
}