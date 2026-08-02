"use client";

import { useContext } from "react";
import { ManagerContext } from "@/react/live-session/context/interview-session-provider";

export function useSessionID(): string{
    const ctx = useContext(ManagerContext);
    if(!ctx){
        throw new Error(
            "useSessionID must be used inside ManagerProvider"
        );
    }
    return ctx.session_id;
}