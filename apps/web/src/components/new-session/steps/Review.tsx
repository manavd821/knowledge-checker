import { SessionFormSchema, StepFormData,  } from "@/modules";
import { useForm, useWatch } from "react-hook-form";
import React, { SetStateAction } from "react";
import { ReviewCardStep1 } from "@/components/new-session/ReviewCard/ReviewCardStep1";
import { ReviewCardStep2 } from "@/components/new-session/ReviewCard/ReviewCardStep2";
import { ReviewCardStep3 } from "@/components/new-session/ReviewCard/ReviewCardStep3";

export function Review({
    control, 
    setCurrentStep,
} : {
    control : ReturnType<typeof useForm<StepFormData>>["control"];
    setCurrentStep : React.Dispatch<SetStateAction<number>>;
}){
    const val = useWatch({
        control: control,
        compute: data => data
    });
    const data = SessionFormSchema.safeParse(val)?.data;
    return (
        <>
            <ReviewCardStep1
            data={data!}
            setCurrentStep={setCurrentStep}
            />
            <ReviewCardStep2
            data={data!}
            setCurrentStep={setCurrentStep}
            />
            <ReviewCardStep3
            data={data!}
            setCurrentStep={setCurrentStep}
            />
        </>
    )
}