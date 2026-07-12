"use client";
import {
    StepFormData,
    SessionFormSchema,
    SessionFormStep1Schema,
    SessionFormStep2Schema,
    SessionFormStep3Schema,
    steps,
    SessionForm,
} from "@/modules";
import { useState } from "react";


export const stepsSchema = [
    SessionFormStep1Schema,
    SessionFormStep2Schema,
    SessionFormStep3Schema,
    SessionFormSchema,
];
export function useMultiStepForm(){
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<SessionForm>>({
        domain: "swe",
        role_level : "beginner",
        difficulty:"medium",
        duration_minutes: 45,
        ai_strictness: "balanced",
        realtime_transcript: true,
        ai_hints_enabled: false,
        camera_required: false,
    });
    const [isSubmitted, setIsSumitted] = useState(false);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    const getCurrentStepSchema = () => stepsSchema[currentStep];

    const goToNextStep = () => {
        if(!isLastStep) setCurrentStep(s => s+1);
    }
    const goToPreviousStep = () => {
        if(!isFirstStep) setCurrentStep(s => s-1);
    }

    const updateFormData = (newData : Partial<StepFormData>) => {
        setFormData(data => ({...data, ...newData}));
    }
    const submitForm = async (data : SessionForm) => {
        console.log(data);

        const formData = new FormData();
        // console.log(Object.entries(data));

        Object.entries(data).forEach(([key, val]) => {
            if(key === "session_documents"){
                ((val ?? []) as File[]).forEach((file : File) => {
                    formData.append(key, file);
                })
            }
            else if(key === "scheduled_at"){
                if(val instanceof Date){
                    formData.append("scheduled_at", val.toISOString());
                }
            }
            else if(val !== undefined && val !== null){
                formData.append(key, String(val));
            }
        });

        await fetch("/api/v1/sessions", {
            method: "POST",
            body: formData,
        })
        alert("submission succesful");
        setIsSumitted(true);
    }

    const resetForm = () => {
        setFormData({});
        setCurrentStep(0);
        setIsSumitted(false);
    }

    return {
        currentStep,
        setCurrentStep, 
        formData,
        setFormData,
        isSubmitted,
        setIsSumitted,
        
        steps,
        isFirstStep,
        isLastStep,
        getCurrentStepSchema,
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm,
        resetForm,
    }
}