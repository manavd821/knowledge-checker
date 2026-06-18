import {
    pgTable,
    uuid,
    text,
    timestamp,
    index,
    doublePrecision,
    jsonb,
} from "drizzle-orm/pg-core";
import { sessions } from "@/lib/db/schema/sessions";

export const evaluation_summaries = pgTable("evaluation_summaries",
{
    evaluation_summary_id : uuid().primaryKey().defaultRandom(),
    session_id : uuid()
        .references(() => sessions.session_id, {onDelete : "cascade"})
        .notNull()
        .unique(),
    overall_score : doublePrecision().notNull(),
    strength_areas : jsonb(),
    weak_areas : jsonb(),

    progression_notes : text(),
    detailed_feedback : text(),
    recommendations : jsonb(),

    created_at : timestamp({
        withTimezone: true,
    })
    .notNull()
    .defaultNow(),

    updated_at : timestamp({
        withTimezone : true
    })
    .notNull()
    .defaultNow(),
},
    (table) => [
        index("evaluation_summaries_session_id_idx")
        .on(table.session_id),
    ]
);