import { useContext } from "react";
import { SessionConfigContext } from "@/react/session-form/context/session-config-provider";

export const useSessionConfig = () => {
    const context = useContext(SessionConfigContext);
    if(!context){
        throw new Error("useSessionConfig must be used within a SessionConfigProvider");
    }
    return context;
}