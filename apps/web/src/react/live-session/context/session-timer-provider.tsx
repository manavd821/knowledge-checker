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
        actual_duration_sec,
        active_since,
        duration_minutes,
        status,
    } = useLiveSessionInfo();
    
    const [elapsed_seconds, setelapsed_seconds] = useState<number>(actual_duration_sec ?? 0);

    useEffect(() => {
        const accumulatedSeconds = actual_duration_sec ?? 0;
        if (status !== "active" || !active_since) {
            setelapsed_seconds(accumulatedSeconds);
            return;
        }

        const activeSince = new Date(active_since).getTime();
        const updateTimer = () => {
            const currentActiveSeconds = Math.floor(
                (Date.now() - activeSince) / 1000
            )
            setelapsed_seconds(accumulatedSeconds + currentActiveSeconds);
        }
        updateTimer()
        const id = setInterval(updateTimer, 1000)

        return () => clearInterval(id);
    },[actual_duration_sec, active_since, status]);

    return (
        <SessionTimerContext value={{
            elapsed_seconds,
            remaining_seconds: duration_minutes * 60 - elapsed_seconds,
        }}>
            { children }
        </SessionTimerContext>
    )
}