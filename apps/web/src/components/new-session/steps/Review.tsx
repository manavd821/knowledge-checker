import { SessionFormSchema,  } from "@/modules";
import { useFormContext, useWatch } from "react-hook-form";
import React, { SetStateAction } from "react";
import { ReviewCardStep1 } from "@/components/new-session/ReviewCard/ReviewCardStep1";
import { ReviewCardStep2 } from "@/components/new-session/ReviewCard/ReviewCardStep2";
import { ReviewCardStep3 } from "@/components/new-session/ReviewCard/ReviewCardStep3";
import { SessionForm } from "@/react/session-form/session-form.types";

export function Review({
    setCurrentStep,
} : {
    setCurrentStep : React.Dispatch<SetStateAction<number>>;
}){
    const { control } = useFormContext<SessionForm>();
    const val = useWatch({
        control: control,
        compute: data => data
    });
    const res = SessionFormSchema.safeParse(val);
    console.log(res.success)
    if(!res.success){
        console.log({error: res.error.issues});
        throw new Error(
            res.error.message,
            {cause : {error: res.error.issues}}
        )
    }
    const data = res?.data
    return (
        <>
            <ReviewCardStep1
            data={data}
            setCurrentStep={setCurrentStep}
            />
            <ReviewCardStep2
            data={data}
            setCurrentStep={setCurrentStep}
            />
            <ReviewCardStep3
            data={data}
            setCurrentStep={setCurrentStep}
            />
        </>
    )
}