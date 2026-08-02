import { AdditionalContext } from "@/react/session-form/context/additional-context-provider";
import { useContext } from "react";

export const useAdditionalContext = () => {
    const context = useContext(AdditionalContext);
    if (!context) {
        throw new Error("useAdditionalContext must be used within a AdditionalContextProvider");
    }
    return context;
}