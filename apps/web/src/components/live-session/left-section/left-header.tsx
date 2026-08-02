import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { SessionMetaCard } from "@/components/live-session/left-section/session-meta-card";
import { ProgressBar } from "@/components/live-session/left-section/progress-bar";
import { useSessionMetaContext } from "@/react/live-session/context/session-meta-provider";
import { UserAvtar } from "./user-avtar";
import { DIFFICULTY_META, DOMAIN_META, TOPIC_TYPE_META } from "@/react/session-form/sessions.meta";

export function LeftHeader(){

    const {user, session} = useSessionMetaContext();
    return (
        <SidebarHeader>
            <div
            className="flex justify-between"
            >
                <p>SESSION</p>
                <SidebarTrigger/>
            </div>
            <div
            className="flex gap-2"
            >
                <UserAvtar name="MD"/>
                <div>
                    <p>{user.first_name ?? ""} {user.last_name ?? ""}</p>
                    <p
                    className="text-sm text-muted-foreground"
                    >{DOMAIN_META[session.domain].label}</p>
                </div>
            </div>
            <div
            className="flex items-center gap-2"
            >
                <SessionMetaCard
                title="Type"
                label={TOPIC_TYPE_META[session.topic_type].label}
                />
                <SessionMetaCard
                title="Difficulty"
                label={DIFFICULTY_META[session.difficulty].label}
                />
            </div>
            <ProgressBar/>
        </SidebarHeader>
    )
}