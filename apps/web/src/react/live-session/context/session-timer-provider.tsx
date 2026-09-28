"use client";
import { SessionTimer } from "@/interview-session/interview-session-types";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useLiveSessionInfo } from "@/react/live-session/hooks/use-live-session-info";

export const SessionTimerContext = createContext<SessionTimer>({
    elapsed_seconds: 0,
    remaining_seconds: 0,
});

export const SessionTimerProvider = ({ children } : { 
    children: React.ReactNode,
 }) => {
    const { 
        completed_duration_sec,
        duration_minutes,
    } = useLiveSessionInfo();
    const started_at = useRef(Date.now());
    const [elapsed_seconds, setelapsed_seconds] = useState(completed_duration_sec);

    useEffect(() => {
        const id = setInterval(() => {
            setelapsed_seconds(
                completed_duration_sec +
                Math.floor((Date.now() - started_at.current) / 1000)
            )
        }, 1000)

        return () => clearInterval(id);
    },[completed_duration_sec]);

    return (
        <SessionTimerContext value={{
            elapsed_seconds,
            remaining_seconds: duration_minutes * 60 - elapsed_seconds,
        }}>
            { children }
        </SessionTimerContext>
    )
}