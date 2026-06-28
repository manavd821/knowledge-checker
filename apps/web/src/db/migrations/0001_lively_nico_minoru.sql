CREATE TYPE "public"."ai_strictness" AS ENUM('lenient', 'balanced', 'strict', 'ultra_strict');--> statement-breakpoint
CREATE TYPE "public"."content_type" AS ENUM('question', 'hint', 'feedback', 'summary', 'greeting', 'answer');--> statement-breakpoint
CREATE TYPE "public"."difficulty" AS ENUM('easy', 'medium', 'hard', 'expert');--> statement-breakpoint
CREATE TYPE "public"."domain" AS ENUM('swe', 'data_science', 'devops', 'product', 'custom');--> statement-breakpoint
CREATE TYPE "public"."file_type" AS ENUM('pdf', 'docx', 'txt', 'md');--> statement-breakpoint
CREATE TYPE "public"."role_level" AS ENUM('beginner', 'intermediate', 'experienced', 'senior');--> statement-breakpoint
CREATE TYPE "public"."session_type" AS ENUM('ai_session', 'human_session');--> statement-breakpoint
CREATE TYPE "public"."speaker" AS ENUM('user', 'ai');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'active', 'completed', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."topic_type" AS ENUM('mock_interview', 'technical', 'behavioral', 'debate', 'custom');--> statement-breakpoint
CREATE TABLE "evaluation_summaries" (
	"evaluation_summary_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"overall_score" double precision NOT NULL,
	"strength_areas" jsonb,
	"weak_areas" jsonb,
	"progression_notes" text,
	"detailed_feedback" text,
	"recommendations" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "evaluation_summaries_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE "session_context" (
	"session_context_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"context_text" text NOT NULL,
	"context_token_count" integer NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_context_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE "session_documents" (
	"session_document_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"file_name" text NOT NULL,
	"file_type" "file_type" NOT NULL,
	"storage_url" text NOT NULL,
	"extracted_text" text,
	"token_count" integer,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"session_type" "session_type" NOT NULL,
	"topic_type" "topic_type" NOT NULL,
	"role_level" "role_level" NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"domain" "domain" NOT NULL,
	"custom_domain" text,
	"duration_minutes" integer NOT NULL,
	"ai_strictness" "ai_strictness" NOT NULL,
	"realtime_transcript" boolean DEFAULT true NOT NULL,
	"ai_hints_enabled" boolean DEFAULT false NOT NULL,
	"camera_required" boolean DEFAULT false NOT NULL,
	"custom_instructions" text,
	"session_brief" text,
	"session_brief_tokens" integer,
	"scheduled_at" timestamp with time zone NOT NULL,
	"started_at" timestamp with time zone,
	"ended_at" timestamp with time zone,
	"actual_duration_sec" integer,
	"overall_score" real,
	"total_turns" integer DEFAULT 0,
	"questions_asked" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "turns" (
	"turn_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"turn_number" integer NOT NULL,
	"speaker" "speaker" NOT NULL,
	"content" text NOT NULL,
	"content_type" "content_type" NOT NULL,
	"user_audio_duration_sec" double precision,
	"evaluation_score" double precision,
	"evaluation_feedback" text,
	"evaluation_rubric" jsonb,
	"difficulty_applied" "difficulty",
	"tokens_used" integer,
	"latency_ms" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "evaluation_summaries" ADD CONSTRAINT "evaluation_summaries_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_context" ADD CONSTRAINT "session_context_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_documents" ADD CONSTRAINT "session_documents_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "turns" ADD CONSTRAINT "turns_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "evaluation_summaries_session_id_idx" ON "evaluation_summaries" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "session_contexts_session_id_idx" ON "session_context" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "session_documents_session_id_idx" ON "session_documents" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_status_idx" ON "sessions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "turns_session_id_idx" ON "turns" USING btree ("session_id");--> statement-breakpoint
CREATE UNIQUE INDEX "session_turn_unique" ON "turns" USING btree ("session_id","turn_number");--> statement-breakpoint
CREATE INDEX "users_user_id_idx" ON "users" USING btree ("user_id");