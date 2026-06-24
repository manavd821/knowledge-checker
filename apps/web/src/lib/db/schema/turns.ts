import {
    pgTable,
    uuid,
    integer, 
    text,
    timestamp,
    index,
    doublePrecision,
    jsonb,
    uniqueIndex,
} from "drizzle-orm/pg-core";
import { sessions } from "@/lib/db/schema/sessions";
import {
    speakerEnum,
    contentTypeEnum,
    difficultyEnum,
} from "@/lib/db/enums";

export const turns = pgTable("turns", 
{
    turn_id : uuid().primaryKey().defaultRandom(),
    session_id : uuid()
        .references(() => sessions.session_id, {onDelete : "cascade"})
        .notNull(),
    turn_number : integer().notNull(),
    speaker : speakerEnum().notNull(),

    content : text().notNull(),
    content_type : contentTypeEnum().notNull(),

    user_audio_duration_sec : doublePrecision(),

    evaluation_score : doublePrecision(),
    evaluation_feedback : text(),
    evaluation_rubric : jsonb().$type<{
        clarity: number;
        depth: number;
        accuracy: number;
    }>(),
    difficulty_applied : difficultyEnum(),

    tokens_used : integer(),
    latency_ms : integer(),
    
    created_at : timestamp({
        withTimezone : true
    })
    .defaultNow()
    .notNull(),

    updated_at : timestamp({
        withTimezone : true
    })
    .defaultNow()
    .notNull(),
},
    (table) => [
        index("turns_session_id_idx")
        .on(table.session_id),

        uniqueIndex("session_turn_unique")
        .on(table.session_id, table.turn_number, table.speaker),
    ]
)