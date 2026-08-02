"use client";
import { ConnectionState } from "@/interview-session/interview-session-types";
import { useContext } from "react";
import { ManagerContext } from "@/react/live-session/context/interview-session-provider";

export const useConnectionState = () : ConnectionState => {
    const ctx = useContext(ManagerContext);
    if(!ctx){
        throw new Error(
            "useConnectionState must be used inside ManagerProvider"
        );
    }
    return ctx.connection_state;
}