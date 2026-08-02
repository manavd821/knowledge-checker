import { Controller, useFormContext } from "react-hook-form";
import { CustomInstructionField } from "@/components/new-session/CustomInstruction/CustomInstructionField";
import { DocumentUploadField } from "@/components/new-session/DocumentUpload/DocumentUploadField";
import { SessionForm } from "@/react/session-form/session-form.types";

export function AdditionalContext(){
    const { control } = useFormContext<SessionForm>();
    return (
        <>
            <CustomInstructionField />
            <Controller
            control={control}
            name="session_documents"
            render={({fieldState}) => (
                <DocumentUploadField errors={fieldState.error}/>
            )}
            />
        </>
    )
}