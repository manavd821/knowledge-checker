import { Button } from "@/components/ui/button";
import { FileText, Pencil } from 'lucide-react';
import { SetStateAction } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SessionForm } from "@/react/session-form/session-form.types";

export function ReviewCardStep3({
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
                >Additional Context</CardTitle>
                <CardAction>
                <Button 
                onClick={_ => setCurrentStep(2)}
                variant={"ghost"} size="sm"
                >
                    <Pencil />
                    Edit
                </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div>
                    <div
                    className="flex flex-col justify-between py-4"
                    >
                        <span
                        className="text-xs mb-1 font-medium uppercase tracking-wide text-muted-foreground"
                        >Custome Instructions</span>
                        <span
                        className="text-sm font-medium"
                        >{data.custom_instructions ?? "None provided"}</span>
                    </div>
                </div>
                <div>
                    <div
                    className="flex flex-col justify-between py-4"
                    >
                        <span
                        className="text-xs mb-1 font-medium uppercase tracking-wide text-muted-foreground"
                        >Uploaded Documents</span>
                        {
                            !data.session_documents.length
                            ? (<span>No documents uploaded</span>)
                            : (
                            <div
                            className="flex flex-col gap-2 items-start justify-center w-full mt-2"
                            >
                                {
                                    data?.session_documents.map(file => (
                                        <div 
                                        key={file.name}
                                        className="flex gap-2 items-center justify-start border w-full p-2 rounded-xl"
                                        >
                                            <div
                                            className="flex gap-2 items-center justify-start w-full"
                                            >
                                                <FileText/>
                                                <div>
                                                    <p
                                                    >{file.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            )
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}