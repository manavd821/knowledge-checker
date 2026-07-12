"use client";

import { 
    useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
    useEffect ,
} from 'react';
import { 
    useMultiStepForm,
    StepFormData,
    SessionForm,
    SessionFormSchema, 
} from "@/modules";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { ProgressSteps } from '@/components/ProgressSteps';
import {
    SessionDetail,
    Configuration,
    AdditionalContext,
    Review,
} from "@/components/new-session/steps";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { StepHeader } from '@/components/new-session/StepHeader';

export function Wizard(){
    const {
        currentStep,
        setCurrentStep, 
        formData,
        setFormData,
        isSubmitted,
        setIsSumitted,
        isFirstStep,
        isLastStep,
        steps,
        getCurrentStepSchema,
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        submitForm,
        resetForm,
    } = useMultiStepForm();

    const {
        register,
        handleSubmit,
        formState : {errors},
        trigger,
        setValue,
        reset,
        control,
    } = useForm<StepFormData>({
        // resolver : zodResolver(getCurrentStepSchema()),
        resolver : async(values, context, options) => {
            const schema = getCurrentStepSchema();
            return zodResolver(schema)(values, context, options);
        },
        mode: "onChange",
        defaultValues : formData,
        // shouldUnregister: true,
    });

    useEffect(() => {
        reset(formData);
    }, [currentStep, formData, reset]);

    const onNext = async(data : StepFormData) => {
        // validation check
        console.log(data);
        console.log(formData)
        const valid = await trigger();
        if(!valid) return;

        // merge current step data with previous step
        const updatedData = {...formData, ...data};

        updateFormData(updatedData);
        // console.log(updatedData)

        if(!isLastStep) goToNextStep();
        else{
            const result = SessionFormSchema.safeParse(updatedData);
            if (!result.success) {
                console.error(result.error.issues);
                return;
            }

            submitForm(result.data);
        }
    }
    const onError = (errors: any) => {
        console.log("Validation failed:", errors);
    };

    return (
        <div className='mx-auto min-w-4xl px-4 py-8'>
            <Card className='w-full max-w-3xl'>
                <CardHeader className='flex flex-col gap-6'>
                    <ProgressSteps currentStep = {currentStep} steps = {steps}/>
                    <StepHeader currentStep={currentStep} steps={steps}/>
                </CardHeader>
                <CardContent className='space-y-6'>
                    {currentStep === 0 && <SessionDetail control={control} setValue={setValue}/>}
                    {currentStep === 1 && <Configuration control={control}/>}
                    {currentStep === 2 && <AdditionalContext control={control}/>}
                    {currentStep === 3 && <Review control={control} setCurrentStep={setCurrentStep}/>}
                </CardContent>
                <CardFooter className='grid grid-cols-3 items-center border-t p-6'>
                    <div className="justify-self-start">
                        <Button 
                        type='button'
                        variant="outline"
                        onClick={goToPreviousStep}
                        disabled={isFirstStep}
                        >
                            <ChevronLeft/>
                            Back
                        </Button>
                    </div>
                    <div className='justify-self-center'>
                        <Progress value={((currentStep+1) / steps.length) * 100}/>
                        <p className='mt-1 text-center text-sm text-muted-foreground'>
                            Step {currentStep+1} of {steps.length}
                        </p>
                    </div>
                    <div className='justify-self-end'>
                        <Button
                        type='button'
                        variant='outline'
                        onClick={handleSubmit(onNext, onError)}
                        // onClick={() => goToNextStep()}
                        >
                            {isLastStep ? "Create Session" : " Next"}
                            {!isLastStep && <ChevronRight/>}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}