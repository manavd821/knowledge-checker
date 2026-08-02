import {
    pgTable,
    uuid,
    integer, 
    text,
    timestamp,
    index,
    unique,
} from "drizzle-orm/pg-core";
import { users } from "@/modules/users/users.table";
import { sessions } from "@/modules/sessions/sessions.table";
import { roleEnum } from "@/db/enums";

export const session_participants = pgTable("session_participants",
{
    participant_id : uuid()
        .primaryKey()
        .defaultRandom(),
    session_id: uuid()
        .references(() => sessions.session_id, {onDelete : "cascade"})
        .notNull(),
    user_id: text()
        .references(() => users.user_id, {onDelete : "cascade"})
        .notNull(),
    role : roleEnum().notNull(),
    completed_duration_sec : integer()
            .notNull()
            .default(0),
    first_joined_at : timestamp({
        withTimezone: true,
    }),
    left_session_at : timestamp({
        withTimezone: true,
    }),
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
        unique("session_participants_session_user_unique")
        .on(table.session_id, table.user_id),

        index("session_participants_session_idx")
        .on(table.session_id),
        index("session_participants_user_idx")
        .on(table.user_id),
    ]
)