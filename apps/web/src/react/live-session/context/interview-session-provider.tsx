"use client";
import { createInterviewSession } from "@/interview-session/factory";
import { InterviewSessionManager } from "@/interview-session/interview-session-manager";
import { ConnectionState } from "@/interview-session/interview-session-types";
import React, { 
    createContext, 
    useRef,
} from "react";
import { useInterviewIntialization } from "@/react/live-session/hooks/use-interview-initialization";
import { LiveSessionInfo } from "@/modules";

export type ManagerProvider = {
    manager: InterviewSessionManager,
    session_id: string,
    connection_state: ConnectionState,
    live_session_info: LiveSessionInfo,
}

export const ManagerContext = createContext< ManagerProvider | null>(null);

export const ManagerProvider = ({ session_id, children } : {
    session_id: string,
    children : React.ReactNode,
}) => {
    const managerRef = useRef<InterviewSessionManager | null>(null);
    if(!managerRef.current){
        managerRef.current = createInterviewSession();
    }
    const {
        data,
        isPending,
        isError,
        error,
    } = useInterviewIntialization(
        session_id,
        managerRef.current,
    )
    if(isPending){
        return (
            <div>Loading</div>
        )
    }
    if(isError){
        console.log(error);
        return (
            <div>Error</div>
        )
    }
    const {
        connection_state,
        live_session_info,
    } = data;
    return (
        <ManagerContext value={{
            session_id,
            manager: managerRef.current,
            connection_state,
            live_session_info,
        }}>
            {children}
        </ManagerContext>
    )
}