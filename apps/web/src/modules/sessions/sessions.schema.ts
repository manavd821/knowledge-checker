import { z } from "zod";
import { SessionDocumentSchema } from "@/modules/session-documents/session-documents.schema";
import { 
    AI_STRICTNESS,
    DIFFICULTY,
    DOMAIN,
    ROLE_LEVEL,
    SESSION_DURATIONS,
    SESSION_TYPE,
    TOPIC_TYPE,
} from "@/db/enums";


export const SessionBaseSchema = z.object({
    session_type : z.enum(SESSION_TYPE, "session type is needed"),
    topic_type :  z.enum(TOPIC_TYPE, "Topic type is needed"),
    role_level : z.enum(ROLE_LEVEL),
    difficulty : z.enum(DIFFICULTY),
    domain : z.enum(DOMAIN),
    custom_domain : z.string().max(50).optional(),
    duration_minutes : z.coerce.number().refine(
        (v) : v is typeof SESSION_DURATIONS[number] => 
            SESSION_DURATIONS.includes(v as any),
        {
            error: "Invalid session duration",
        }
    ),
    ai_strictness : z.enum(AI_STRICTNESS),
    realtime_transcript : z.union([
        z.boolean(),
        z.stringbool(),
    ]),
    ai_hints_enabled : z.union([
        z.boolean(),
        z.stringbool(),
    ]),
    camera_required : z.union([
        z.boolean(),
        z.stringbool(),
    ]),
    custom_instructions : z.string().max(300).optional(),
    session_documents : z.array(SessionDocumentSchema).max(2,
        {error: "max 2 documents are allowed"}
    ).optional(),
});

export const CreateSessionSchema =
    SessionBaseSchema.extend({
        scheduled_at : z.iso.datetime().optional(),
    });

export const SessionFormSchema = 
    SessionBaseSchema.extend({
        scheduled_at : z.date().optional(),
    });
    

export const SessionFormStep1Schema = 
    SessionFormSchema.pick({
        session_type : true,
        topic_type :  true,
        domain : true,
        custom_domain: true,
        role_level : true,
        difficulty : true,
    })
    .refine(
    data => data.domain !== "custom" || !!data.custom_domain?.trim(),
    {error : "Custom domain is required.", path: ["custom_domain"]}
)

export const SessionFormStep2Schema = 
    SessionFormSchema.pick({
        duration_minutes : true,
        ai_strictness : true,
        realtime_transcript : true,
        ai_hints_enabled : true,
        camera_required : true,
        scheduled_at : true,
    })

export const SessionFormStep3Schema = 
    SessionFormSchema.pick({
        custom_instructions : true,
        session_documents : true,
    })

