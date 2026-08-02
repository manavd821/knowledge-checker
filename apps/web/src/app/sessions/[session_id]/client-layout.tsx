"use client";

import { SessionMetaProvider } from "@/react/live-session/context/session-meta-provider";
import { SessionTimerProvider } from "@/react/live-session/context/session-timer-provider";
import { useSessionMeta } from "@/react/live-session/hooks/use-session-meta";
import React from "react";

export function ClientSessionLayout({session_id, children} : {
    session_id: string,
    children: React.ReactNode,
}){
    const value = useSessionMeta();
    return (
        <SessionMetaProvider value={value}>
            <SessionTimerProvider>
                {children}
            </SessionTimerProvider>
        </SessionMetaProvider>
    )
}