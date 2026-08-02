"use client";
import { useContext } from "react";
import { ManagerContext } from "@/react/live-session/context/interview-session-provider";
import { SessionMeta } from "@/interview-session/interview-session-types";


export function useSessionMeta() : SessionMeta {
    const ctx = useContext(ManagerContext);
    if(!ctx){
        throw new Error(
            "useSessionMeta must be used inside ManagerProvider"
        );
    }
    return {
        user: ctx.user,
        session: ctx.live_session_info,
    };
}
    
    
