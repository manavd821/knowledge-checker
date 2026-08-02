"use client";
import { useSessionManager } from "@/react/live-session/hooks/use-session-manager"
import { ParticipantVM } from "@/store/types";
import { useEffect, useState } from "react";

export const useRemoteParticipant = () => {
    const manager = useSessionManager();
    const [participants, setParticipants] = useState<ParticipantVM[]>([]);

    useEffect(() => {
        
    }, [participants])
}