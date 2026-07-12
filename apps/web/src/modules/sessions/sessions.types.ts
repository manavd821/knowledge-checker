import { CreateSessionSchema } from "@/modules/sessions/sessions.schema";
import { sessions } from "@/modules/sessions/sessions.table";
import { z } from "zod";
import { InferInsertModel } from "drizzle-orm";

export type CreateSession = z.infer<typeof CreateSessionSchema>;

export type SessionType = CreateSession["session_type"];
export type TopicType = CreateSession["topic_type"];
export type RoleLevel = CreateSession["role_level"];
export type Difficulty = CreateSession["difficulty"];
export type Domain = CreateSession["domain"];
export type CustomDomain = CreateSession["custom_domain"];
export type Duration = CreateSession["duration_minutes"];
export type AIStrictness = CreateSession["ai_strictness"];
export type RealtimeTranscript = CreateSession["realtime_transcript"];
export type AIHintsEnabled = CreateSession["ai_hints_enabled"];
export type CameraRequired = CreateSession["camera_required"];
export type CustomInstructions = CreateSession["custom_instructions"];
export type SessionDocuments = CreateSession["session_documents"];
export type ScheduledAt = CreateSession["scheduled_at"];

export type NewSession = InferInsertModel<typeof sessions>;