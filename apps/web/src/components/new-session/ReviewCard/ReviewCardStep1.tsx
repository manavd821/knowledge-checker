import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { ReviewDetailRow } from "@/components/new-session/ReviewDetailRow";
import { SetStateAction } from "react";
import { 
    SESSION_TYPE_META,
    DIFFICULTY_META, 
    DOMAIN_META, 
    ROLE_LEVEL_META, 
    SessionForm, 
    TOPIC_TYPE_META,
} from "@/modules";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
                    value={SESSION_TYPE_META[data?.session_type!].label || ""}
                    />
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