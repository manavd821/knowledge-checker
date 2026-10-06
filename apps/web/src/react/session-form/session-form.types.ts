import { ControllerRenderProps } from "react-hook-form";
import { FieldError } from "react-hook-form";
import { 
    FormFieldRoleSchema,
    SessionFormSchema,
    SessionFormStep1Schema,
    SessionFormStep2Schema,
    SessionFormStep3Schema,
} from "@/modules";
import { z } from "zod";
import { STATUS } from "@/db/enums";


export type SessionForm = z.infer<typeof SessionFormSchema>;
export type FormFieldParticipant = SessionForm["participants"][number];

export interface Step {
    id : number;
    name : string;
    title?: string;
    description? : string;
}

export type SessionFormStep1 = z.infer<typeof SessionFormStep1Schema>;
export type SessionFormStep2 = z.infer<typeof SessionFormStep2Schema>;
export type SessionFormStep3 = z.infer<typeof SessionFormStep3Schema>;

export type StepFormData = SessionFormStep1 | SessionFormStep2 | SessionFormStep3;


export type SessionTypeField = ControllerRenderProps<SessionForm, "session_type">;
export type TopicTypeField = ControllerRenderProps<SessionForm, "topic_type">;
export type DomainField = ControllerRenderProps<SessionForm, "domain">;
export type RoleLevelField = ControllerRenderProps<SessionForm, "role_level">;
export type CustomDomainField = ControllerRenderProps<SessionForm, "custom_domain">;
export type DifficultyField = ControllerRenderProps<SessionForm, "difficulty">;
export type SessionDurationField = ControllerRenderProps<SessionForm, "duration_minutes">;
export type AIStrictnessField = ControllerRenderProps<SessionForm, "ai_strictness">;
export type ParticipantField = ControllerRenderProps<SessionForm, "participants">;
export type ScheduledAtField = ControllerRenderProps<SessionForm, "scheduled_at">;
export type CustomInstructionField = ControllerRenderProps<SessionForm, "custom_instructions">;
export type SessionDocumentsField = ControllerRenderProps<SessionForm, "session_documents">;

export type FormFieldRole = z.infer<typeof FormFieldRoleSchema>;
export type Status = typeof STATUS[number];

export interface FormFieldProps<T>{
    value : T;
    onChange: (value: T) => void;
    errors?: FieldError;
}
