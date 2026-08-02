import { 
    Field, 
    FieldError, 
} from "@/components/ui/field";
import { SectionHeading } from "@/components/new-session/SectionHeading";
import { ScheduleSection } from "@/components/new-session/Schedule/ScheduleSection";
import { type FieldError as ErrorType } from "react-hook-form";

export function ScheduleField({ errors }: {
    errors: ErrorType | undefined
}){
    return (
        <Field>
            <SectionHeading>Schedule Session</SectionHeading>
            <FieldError errors={[errors]}/>
            <ScheduleSection />
        </Field>
    )
}