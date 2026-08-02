import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { ReviewDetailRow } from "@/components/new-session/ReviewDetailRow";
import { SetStateAction } from "react";
import { 
    SESSION_TYPE_META,
    DIFFICULTY_META, 
    DOMAIN_META, 
    ROLE_LEVEL_META, 
    TOPIC_TYPE_META,
} from "@/react/session-form/sessions.meta";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Participant } from "@/components/new-session/Participants/Participant";
import { SessionForm } from "@/react/session-form/session-form.types";

export function ReviewCardStep1({
    data, 
    setCurrentStep,
} : {
    data : SessionForm;
    setCurrentStep : React.Dispatch<SetStateAction<number>>;
}){
    return (
        <Card
        className="overflow-hidden py-0 gap-0"
        >
            <CardHeader className="bg-muted py-3 px-6">
                <CardTitle
                className="mt-1"
                >Session Details</CardTitle>
                <CardAction>
                <Button 
                onClick={_ => setCurrentStep(0)}
                variant={"ghost"} size="sm"
                >
                    <Pencil />
                    Edit
                </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div>
                    <ReviewDetailRow
                    label="Session Type"
                    value={SESSION_TYPE_META[data.session_type!]?.label || ""}
                    />
                    <div
                    className="  py-4"
                    >
                        <p
                        className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                        >Participants</p>
                        <Separator
                        className="my-2 "
                        />
                        <div
                        className="flex flex-col gap-3"
                        >
                            {
                                data.participants.map(p => (
                                    <Participant
                                    key={p.user_id}
                                    user={p}
                                    roleDisplay="side"
                                    role={p.role}
                                    />
                                ))
                            }
                        </div>
                        <Separator
                        className="mt-2 "
                        />
                    </div>
                    <ReviewDetailRow
                    label="Topic Type"
                    value={TOPIC_TYPE_META[data?.topic_type!].label || ""}
                    />
                    <ReviewDetailRow
                    label="Domain"
                    value={DOMAIN_META[data?.domain!].label || ""}
                    />
                    {
                    data?.custom_domain && (
                        <ReviewDetailRow
                        label="Custome Domain"
                        value={data?.custom_domain || ""}
                        />
                    )
                    }
                    <ReviewDetailRow
                    label="Role level"
                    value={ROLE_LEVEL_META[data?.role_level!].label || ""}
                    />
                    <ReviewDetailRow
                    label="Difficulty"
                    value={DIFFICULTY_META[data?.difficulty!].label || ""}
                    />
                </div>
            </CardContent>
        </Card>
    )
}