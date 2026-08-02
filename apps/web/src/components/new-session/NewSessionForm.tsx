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
import { steps } from "@/react/session-form/sessions.meta";
import { useFormContext } from "react-hook-form";
import { SessionForm, StepFormData } from "@/react/session-form/session-form.types";

type Props = {
    currentStep: number,
    isFirstStep: boolean,
    isLastStep: boolean,
    goToPreviousStep: () => void,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    onNext: (data: StepFormData) => Promise<void>,
    onError : (errors: any) => void,
}
export function NewSessionForm({
    currentStep,
    isFirstStep,
    isLastStep,
    goToPreviousStep,
    setCurrentStep,
    onNext,
    onError,
} : Props){
    const {
        handleSubmit,
    } = useFormContext<SessionForm>();
    return (
        <div className='mx-auto min-w-4xl px-4 py-8'>
                <Card className='w-full max-w-3xl'>
                    <CardHeader className='flex flex-col gap-6'>
                        <ProgressSteps currentStep = {currentStep} steps = {steps}/>
                        <StepHeader currentStep={currentStep} steps={steps}/>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        {currentStep === 0 && <SessionDetail />}
                        {currentStep === 1 && <Configuration/>}
                        {currentStep === 2 && <AdditionalContext/>}
                        {currentStep === 3 && <Review setCurrentStep={setCurrentStep}/>}
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