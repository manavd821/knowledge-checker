import { SESSION_TYPE } from "@/db/enums";
import { RadioGroup } from "@/components/ui/radio-group";
import { SessionTypeCard } from "@/components/new-session/SessionType/SessionTypeCard";
import { SESSION_TYPE_META } from "@/react/session-form/sessions.meta";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";

export function SessionTypeSection({ hasError } : { hasError: boolean }){
    const {
        sessionType,
        updateSessionType,
    } = useSessionDetail();
    return (
            <RadioGroup
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            value={sessionType}
            onValueChange={updateSessionType}
            >
                {
                    SESSION_TYPE.map(session => {
                        const { Icon, description, label } = SESSION_TYPE_META[session];
                        return (
                            <SessionTypeCard
                            key={session}
                            value={session}
                            selected = {sessionType === session}
                            onChange = {updateSessionType}
                            Icon={Icon} 
                            description={description}
                            label={label}
                            hasError={hasError}
                            />
                        )
                    })
                }
            </RadioGroup>
    )
}