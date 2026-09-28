"use client";
import { useContext } from "react";
import { ManagerContext } from "@/react/live-session/context/interview-session-provider";
import { LiveSessionInfo } from "@/modules";


export function useLiveSessionInfo() : LiveSessionInfo {
    const ctx = useContext(ManagerContext);
    if(!ctx){
        throw new Error(
            "useLiveSessionInfo must be used inside ManagerProvider"
        );
    }
    return ctx.live_session_info;
}
    
    
