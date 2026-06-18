import {
    pgTable,
    uuid,
    integer, 
    text,
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { sessions } from "@/lib/db/schema/sessions";

export const session_contexts = pgTable("session_context",
{
    session_context_id : uuid().primaryKey().defaultRandom(),
    session_id : uuid()
        .references(() => sessions.session_id, {onDelete : "cascade"})
        .notNull()
        .unique(),
    context_text : text().notNull(),
    context_token_count : integer().notNull(),
    version : integer().notNull().default(1),

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
        index("session_contexts_session_id_idx")
        .on(table.session_id),
    ]
)
