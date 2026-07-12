import {
    type SessionDocumentsField, 
    FormFieldProps,
} from "@/modules";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { Field } from "@/components/ui/field";
import { DocumentUploadSection } from "@/components/new-session/DocumentUpload/DocumentUploadSection";

type Props = FormFieldProps<SessionDocumentsField["value"]>;

export function DocumentUploadField({
    value,
    onChange,
    errors
} : Props){
    return (
        <Field>
            <SectionHeading optional>Session Documents</SectionHeading>
            <p
            className="text-muted-foreground"
            >Job description, resume, study notes, or case materials</p>
            <DocumentUploadSection
            value={value}
            onChange={onChange}
            />
        </Field>

    )
}