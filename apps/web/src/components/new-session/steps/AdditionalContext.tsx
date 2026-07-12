import { StepFormData } from "@/modules";
import { Controller, useForm } from "react-hook-form";
import { CustomInstructionField } from "@/components/new-session/CustomInstruction/CustomInstructionField";
import { DocumentUploadField } from "@/components/new-session/DocumentUpload/DocumentUploadField";

export function AdditionalContext({
    control, 
} : {
    control : ReturnType<typeof useForm<StepFormData>>["control"]
}){
    return (
        <>
            <Controller
            control={control}
            name="custom_instructions"
            render={({field, fieldState}) => (
                <CustomInstructionField
                value={field.value}
                onChange={field.onChange}
                errors={fieldState.error}
                />
            )}
            />
            <Controller
            control={control}
            name="session_documents"
            render={({field, fieldState}) => (
                <DocumentUploadField
                value={field.value}
                onChange={field.onChange}
                errors={fieldState.error}
                />
            )}
            />
            
        </>
    )
}