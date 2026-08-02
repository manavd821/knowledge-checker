"use client";
import { get_frontend_service } from "@/frontend/factory";
import {
    SessionFormSchema,
    SessionFormStep1Schema,
    SessionFormStep2Schema,
    SessionFormStep3Schema,
} from "@/modules";
import type {
    StepFormData,
    SessionForm,
} from "@/react/session-form/session-form.types"
import { GetUser } from "@/shared/dto/users/get-user.dto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { steps } from "@/react/session-form/sessions.meta";


export const stepsSchema = [
    SessionFormStep1Schema,
    SessionFormStep2Schema,
    SessionFormStep3Schema,
    SessionFormSchema,
];
export function useMultiStepForm(user: GetUser){
    
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<SessionForm>>({
        participants: [{
            user_id: user.user_id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            image_url: user.image_url,
            role: "candidate",
        }],
        domain: "swe",
        role_level : "beginner",
        difficulty:"medium",
        duration_minutes: 45,
        ai_strictness: "balanced",
        realtime_transcript: true,
        ai_hints_enabled: false,
        camera_required: false,
        session_documents: [],
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    const getCurrentStepSchema = () => stepsSchema[currentStep];

    const goToNextStep = () => {
        if(!isLastStep) setCurrentStep(s => s+1);
    }
    const goToPreviousStep = () => {
        if(!isFirstStep) setCurrentStep(s => s-1);
    }

    const updateFormData = (newData : Partial<SessionForm>) => {
        setFormData(data => ({...data, ...newData}));
    }
    const submitForm = async (data : SessionForm) => {
        console.log(data);
        const session_service = get_frontend_service().sessions;
        
        const session_id = await session_service.create_session(data);
        alert("submission succesful");
        setIsSubmitted(true);

        router.replace(`/sessions/${session_id}`);
    }

    const resetForm = () => {
        setFormData({});
        setCurrentStep(0);
        setIsSubmitted(false);
    }

    return {
        currentStep,
        setCurrentStep, 
        formData,
        setFormData,
        isSubmitted,
        setIsSubmitted,
        
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