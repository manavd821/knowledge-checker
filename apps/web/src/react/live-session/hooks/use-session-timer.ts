import { SessionTimer } from "@/interview-session/interview-session-types";
import { useContext } from "react";
import { SessionTimerContext } from "@/react/live-session/context/session-timer-provider";

export const useSessionTimer = () : SessionTimer => {
    const ctx = useContext(SessionTimerContext);
    if(!ctx){
        throw new Error(
            "useSessionTimer must be used inside SessionTimerProvider"
        );
    }
    return ctx;
}