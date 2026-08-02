"use client";
import { InterviewSessionManager } from "@/interview-session/interview-session-manager";
import { useContext } from "react";
import { ManagerContext } from "@/react/live-session/context/interview-session-provider";

export const useSessionManager = () : InterviewSessionManager => {
    const ctx = useContext(ManagerContext);
    if(!ctx){
        throw new Error(
            "useSessionManager must be used inside ManagerProvider"
        );
    }
    return ctx.manager;
}