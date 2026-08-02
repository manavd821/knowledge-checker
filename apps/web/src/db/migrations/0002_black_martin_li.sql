CREATE TYPE "public"."disconnect_reason" AS ENUM('manual_leave', 'network_disconnect', 'connection_lost', 'session_completed', 'removed');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('candidate', 'interviewer');--> statement-breakpoint
CREATE TABLE "session_participants" (
	"participant_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"role" "role" NOT NULL,
	"completed_duration_sec" integer DEFAULT 0 NOT NULL,
	"last_joined_at" timestamp with time zone,
	"first_joined_at" timestamp with time zone,
	"left_session_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_participants_session_user_unique" UNIQUE("session_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "session_connections" (
	"connection_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"participant_id" uuid NOT NULL,
	"joined_at" timestamp with time zone NOT NULL,
	"left_at" timestamp with time zone,
	"duration_sec" integer,
	"disconnect_reason" "disconnect_reason",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_connections" ADD CONSTRAINT "session_connections_participant_id_session_participants_participant_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."session_participants"("participant_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "session_participants_session_idx" ON "session_participants" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "session_participants_user_idx" ON "session_participants" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_connections_participant_idx" ON "session_connections" USING btree ("participant_id");--> statement-breakpoint
CREATE INDEX "session_connections_joined_at_idx" ON "session_connections" USING btree ("joined_at");