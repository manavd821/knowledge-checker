import { pgEnum } from "drizzle-orm/pg-core";

export const STATUS = [
    "pending",
    "active",
    "completed", 
    "abandoned",
] as const;

export const SESSION_TYPE = [
    "ai_session",
    "human_session",
] as const;

export const TOPIC_TYPE = [
    "mock_interview",
    "technical",
    "behavioral",
    "debate",
    "custom",
] as const;

export const ROLE_LEVEL = [
    "beginner",
    "intermediate",
    "experienced",
    "senior",
] as const;

export const DIFFICULTY = [
    "easy",
    "medium",
    "hard",
    "expert",
] as const;

export const DOMAIN = [
    "swe",
    "data_science",
    "devops",
    "product",
    "custom",
] as const;

export const AI_STRICTNESS = [
    "lenient",
    "balanced",
    "strict",
    "ultra_strict",
] as const;

export const FILE_TYPE = [
    "pdf",
    "docx",
    "txt",
    "md",
] as const;

export const SPEAKER = [
    "user",
    "ai",
] as const;

export const AI_RESPONSE_TYPE = [
    "question",
    "hint",
    "feedback",
    "summary",
    "greeting",
] as const;
export const CONTENT_TYPE = [
    ...AI_RESPONSE_TYPE,
    "answer",
] as const;

export const statusEnum = pgEnum("status", STATUS);
export const sessionTypeEnum = pgEnum("session_type", SESSION_TYPE);
export const topicTypeEnum = pgEnum("topic_type",TOPIC_TYPE);
export const roleLevelEnum = pgEnum("role_level",ROLE_LEVEL);
export const difficultyEnum = pgEnum("difficulty",DIFFICULTY);
export const domainEnum = pgEnum("domain",DOMAIN);
export const aiStrictnessEnum = pgEnum("ai_strictness",AI_STRICTNESS);
export const fileTypeEnum = pgEnum("file_type", FILE_TYPE);
export const speakerEnum = pgEnum("speaker", SPEAKER);
export const contentTypeEnum = pgEnum("content_type", CONTENT_TYPE);