import { RadioGroup } from "@/components/ui/radio-group";
import { TOPIC_TYPE } from "@/db/enums";
import { cn } from "@/lib/utils";
import { useSessionDetail } from "@/react/session-form/hooks/use-session-detail";
import { TOPIC_TYPE_META } from "@/react/session-form/sessions.meta";
import { TopicCard } from "@/components/new-session/TopicType/TopicCard";

export function TopicSection({hasError} : {hasError: boolean}){
    const {
        topicType, 
        updateTopicType,
    } = useSessionDetail();

    return (
            <RadioGroup
            className={cn(
                "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
            )}
            value={topicType}
            onValueChange={updateTopicType}
            >
            {
                TOPIC_TYPE.map(topic => {
                    const { label, description, icon } = TOPIC_TYPE_META[topic]
                    return (
                        <TopicCard 
                        value={topic}
                        selected ={topic == topicType}
                        Icon={icon}
                        label={label}
                        description={description}
                        key={topic}
                        hasError={hasError}
                    />
                    )}
                )
            }
            </RadioGroup>
    )
}