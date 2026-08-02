"use client";
import { SidebarContent } from "@/components/ui/sidebar";
import { useSessionMetaContext } from "@/react/live-session/context/session-meta-provider";
import { useSessionTimer } from "@/react/live-session/hooks/use-session-timer";
import { SESSION_TYPE_META } from "@/react/session-form/sessions.meta";

export function LeftContent(){
    const {user, session} = useSessionMetaContext();
    const {
        elapsed_seconds,
        remaining_seconds
    } = useSessionTimer();
    const minutes = Math.floor(elapsed_seconds/60);
    const seconds = elapsed_seconds % 60;
    const session_type = SESSION_TYPE_META[session.session_type]
    return (
        <SidebarContent>
            <div>Sidebar header</div>
            <div>Sidebar content</div>
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
            <div>{user.email}</div>
            <div>{session_type.label}</div>
            <div>elapsed_seconds: {elapsed_seconds} seconds</div>
            <div>remaining_seconds: {remaining_seconds} seconds</div>
            <div>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
        </SidebarContent>
    )
}