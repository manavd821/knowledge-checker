"use client";

import { useContext } from "react";
import { SessionDetailContext } from "@/react/session-form/context/session-detail-provider";

export const useSessionDetail = () : SessionDetailContext => {
    const ctx = useContext(SessionDetailContext);
    if(!ctx){
        throw new Error("useSessionDetail must be inside SessionDetailProvider");
    }
    return ctx;
}