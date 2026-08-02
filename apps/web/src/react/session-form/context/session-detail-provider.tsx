"use client";
import React, { createContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormFieldParticipant, FormFieldRole, SessionForm } from "@/react/session-form/session-form.types";
import { useUser } from "@/react/users/hooks/use-user";
import { MAX_PARTICIPANTS } from "@/shared/enums";


export type SessionDetailContext = {
    sessionType: SessionForm["session_type"],
    participants: SessionForm["participants"],
    isAISession: boolean,
    topicType: SessionForm["topic_type"],
    domain: SessionForm["domain"],
    roleLevel: SessionForm["role_level"],
    customDomain: SessionForm["custom_domain"],
    difficulty: SessionForm["difficulty"],
    updateSessionType: (session_type: SessionForm["session_type"]) => void,
    addParticipant: (participant: FormFieldParticipant) => void,
    removeParticipant: (participant: FormFieldParticipant) => void,
    updateParticipantRole : (participant: FormFieldParticipant, role: FormFieldRole) => void,
    updateTopicType : (topic : SessionForm["topic_type"]) => void,
    updateDomain: (d : SessionForm["domain"]) => void,
    updateRoleLevel: (rl : SessionForm["role_level"]) => void,
    updateDifficulty: (diff : SessionForm["difficulty"]) => void,
}

export const SessionDetailContext = createContext<SessionDetailContext | null>(null);

export const SessionProvider = ({ children } : {
    children: React.ReactNode,
    
}) => {
    const {
        control,
        setValue,
        setError,
        clearErrors,
    } = useFormContext<SessionForm>();
    const app_user = useUser();
    const sessionType = useWatch({
        control,
        name: "session_type",
    });
    const participants = useWatch({
        control,
        name: "participants",
    });
    const topicType = useWatch({
        control,
        name: "topic_type",
    });
    const domain = useWatch({
        control,
        name: "domain",
    });
    const customDomain = useWatch({
        control,
        name: "custom_domain",
    })
    const roleLevel = useWatch({
        control,
        name: "role_level",
    });
    const difficulty = useWatch({
        control,
        name: "difficulty",
    });
    const isAISession = sessionType === "ai_session";

    function updateSessionType(session_type: SessionForm["session_type"]){
        clearErrors("session_type");
        setValue("session_type", session_type, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    function addParticipant(participant: FormFieldParticipant){
        if(isAISession && participants.length >= 1) return; // no participant can be added in ai session
        const next = [
            ...participants,
            participant,
        ];
        clearErrors("participants");
        setValue("participants",next , {
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    function removeParticipant(participant: FormFieldParticipant){
        const next = participants.filter(
            u => u.user_id !== participant.user_id,
        );
        clearErrors("participants");
        setValue("participants", next,{
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    function updateParticipantRole(participant: FormFieldParticipant, role: FormFieldRole){
        const next = participants.map(
            u => (
                u.user_id === participant.user_id
                ? {...u, role}
                : u
            )
        );
        clearErrors("participants");
        setValue("participants", next,{
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    function updateTopicType(topic : SessionForm["topic_type"]){
        setValue("topic_type", topic, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    function updateDomain(d: SessionForm["domain"]){
        setValue("domain", d, {
            shouldDirty: true,
            shouldValidate: true,
        });
        if(d !== "custom") updateCustomDomain(undefined);
    }
    function updateRoleLevel(rl : SessionForm["role_level"]) {
        setValue("role_level", rl, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    function updateDifficulty(diff : SessionForm["difficulty"]) {
        setValue("difficulty", diff, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    function updateCustomDomain(dm : string | undefined){
        setValue("custom_domain", dm, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }
    const value : SessionDetailContext = {
        sessionType,
        participants,
        isAISession,
        topicType,
        domain,
        roleLevel,
        difficulty,
        customDomain,
        updateSessionType,
        addParticipant,
        removeParticipant,
        updateParticipantRole,
        updateTopicType,
        updateDomain,
        updateRoleLevel,
        updateDifficulty,
    }
    return (
        <SessionDetailContext value={value}>
            {children}
        </SessionDetailContext>
    )
}