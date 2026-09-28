CREATE TABLE "session_runtime_context" (
	"session_runtime_context_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"turn_number" integer NOT NULL,
	"questions_asked" integer NOT NULL,
	"fundamental_phase" boolean NOT NULL,
	"current_difficulty" text NOT NULL,
	"previous_score" real,
	"overall_score" real,
	"active_context" text NOT NULL,
	"context_tokens" integer NOT NULL,
	"version" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_runtime_context_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
ALTER TABLE "session_runtime_context" ADD CONSTRAINT "session_runtime_context_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE no action ON UPDATE no action;