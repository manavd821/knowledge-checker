"use client";

import { SessionMeta } from "@/interview-session/interview-session-types";
import { createContext, useContext } from "react";

export const SessionMetaContext = createContext<SessionMeta | null>(null);

export function SessionMetaProvider({ value, children } : {
    value: SessionMeta,
    children: React.ReactNode,
}){
    return (
        <SessionMetaContext value={value}>
            {children}
        </SessionMetaContext>
    );
}

export const useSessionMetaContext = () : SessionMeta => {
    const context = useContext(SessionMetaContext);
    if (!context) {
        throw new Error(
            "useSessionMetaContext must be used inside SessionMetaProvider"
        );
    }
    return context;
}