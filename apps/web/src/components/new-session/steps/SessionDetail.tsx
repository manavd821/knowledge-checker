import { 
    Controller,
    useFormContext,
} from "react-hook-form";
import {
    SessionForm,
} from "@/react/session-form/session-form.types";
import { SessionTypeField } from "@/components/new-session/SessionType/SessionTypeField";
import { TopicTypeField } from "@/components/new-session/TopicType/TopicTypeField";
import { DomainField } from "@/components/new-session/Domain/DomainField";
import { RoleLevelField } from "@/components/new-session/RoleLevel/RoleLevelField";
import { DifficultyField } from "@/components/new-session/Difficulty/DifficultyField";
import { CustomDomainField } from "@/components/new-session/CustomDomain/CustomDomainField";
import { ParticipantField } from "@/components/new-session/Participants/ParticipantField";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";


export function SessionDetail(){
    const {
        control,
    } = useFormContext<SessionForm>();
    const {
        domain,
    } = useSessionDetail();

    return (
        <>
            <Controller
            name={"session_type"}
            control={control}
            render={({ fieldState}) => (
                <SessionTypeField 
                errors={fieldState.error}
                />
            )}
            />
        
            
            <Controller
            control={control}
            name="participants"
            render={({fieldState}) => (
                <ParticipantField errors={fieldState.error}/>
            ) }
            />
            <Controller
            name={"topic_type"}
            control={control}
            render={({fieldState}) => (
                <TopicTypeField errors={fieldState.error}/>
            )}
            />
            <div className="flex flex-col sm:flex-row gap-2">
                    <Controller
                    name={"domain"}
                    control={control}
                    render={({fieldState}) => (
                        <DomainField errors={fieldState.error}/>
                    )}
                    />
                    <Controller
                    name={"role_level"}
                    control={control}
                    render={({fieldState}) => (
                        <RoleLevelField errors={fieldState.error}/>
                    )}
                    />
            </div>

            { domain === "custom" && ( <CustomDomainField />) }

            <Controller
            name="difficulty"
            control={control}
            render={({fieldState}) => (
                <DifficultyField errors={fieldState.error}/>
            )}
            />
        </>
    )
}