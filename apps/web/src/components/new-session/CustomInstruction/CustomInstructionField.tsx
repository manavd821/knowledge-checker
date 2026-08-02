
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { useId } from "react";
import { 
    Field, 
    FieldDescription, 
} from "@/components/ui/field";
import type { CustomInstructionField, SessionForm } from "@/react/session-form/session-form.types";
import { useAdditionalContext } from "@/react/session-form/hooks/use-additional-context";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

export function CustomInstructionField(){
    const [isMounted, setIsMounted] = useState(false);
    const {
        customeInstruction,
    } = useAdditionalContext();
    const {
        register,
    } = useFormContext<SessionForm>();
    const c_i = useId();
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) {
        return (<div>loading</div>); // Or a skeleton loader
    }
    return (
        <Field>
            <SectionHeading optional>Custom Instructions</SectionHeading>
            <Textarea {...register("custom_instructions")}
            id={c_i}
            placeholder="Add any specific instructions for the AI interviewer — topics to focus on, behaviors to avoid, areas to probe deeper, or any relevant context about your background."
            />
            <FieldDescription>{customeInstruction?.length || 0}/300</FieldDescription>
        </Field>
    )
}