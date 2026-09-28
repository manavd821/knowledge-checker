ALTER TABLE "turns" ALTER COLUMN "speaker" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."speaker";--> statement-breakpoint
CREATE TYPE "public"."speaker" AS ENUM('candidate', 'interviewer');--> statement-breakpoint
ALTER TABLE "turns" ALTER COLUMN "speaker" SET DATA TYPE "public"."speaker" USING "speaker"::"public"."speaker";