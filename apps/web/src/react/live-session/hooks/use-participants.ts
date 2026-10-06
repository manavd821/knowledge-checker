"use client";

import { useSyncExternalStore } from "react";
import { useSessionManager } from "./use-session-manager";
import { ParticipantState } from "@/store/types";

export function useParticipants() : ParticipantState{
    const manager = useSessionManager()
    if (!manager) {
        throw new Error(
            "useParticipants must be used within ManagerProvider"
        );
    }
    const {participant_store} = manager
    return useSyncExternalStore(
        participant_store.subscribe,
        participant_store.getSnapShot,
        participant_store.getSnapShot,
    );
}