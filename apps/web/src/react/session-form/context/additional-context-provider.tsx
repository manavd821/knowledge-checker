import { createContext } from "react"
import { useFormContext, useWatch } from "react-hook-form";
import { SessionForm } from "@/react/session-form/session-form.types";

export type AdditionalContext = {
    customeInstruction: SessionForm["custom_instructions"],
    sessionDocuments: SessionForm["session_documents"],
    addSessionDocument: (doc: SessionForm["session_documents"][number]) => void,
    removeDocument: (indexToRemove: number) => void,
}

export const AdditionalContext = createContext<AdditionalContext | null>(null);

export const AdditionalContextProvider = ({ children } : {
    children: React.ReactNode,  
}) => {
    const {
        control,
        setValue,
    } = useFormContext<SessionForm>();
    const customeInstruction = useWatch({
        control,
        name: "custom_instructions",
    });

    const sessionDocuments = useWatch({
        control,
        name: "session_documents",
    });
    function addSessionDocument(doc: SessionForm["session_documents"][number]){
        setValue("session_documents", [...sessionDocuments, doc], {
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    function removeDocument(indexToRemove: number){
        setValue("session_documents", 
            sessionDocuments.filter((_, idx) => idx !== indexToRemove), {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    }
    const value : AdditionalContext = {
        customeInstruction,
        sessionDocuments,
        addSessionDocument,
        removeDocument,
    }
    return (
        <AdditionalContext value={value}>
            {children}
        </AdditionalContext>
    )
}