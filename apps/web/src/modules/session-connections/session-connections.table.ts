import {
    pgTable,
    uuid,
    integer, 
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { disconnectReasonEnum } from "@/db/enums";
import { session_participants } from "@/modules/session-participants/session-participants.table";

export const session_connections = pgTable(
    "session_connections",
    {
        connection_id: uuid()
            .primaryKey()
            .defaultRandom(),

        participant_id: uuid()
            .references(() => session_participants.participant_id, {
                onDelete: "cascade",
            })
            .notNull(),

        joined_at: timestamp({
            withTimezone: true,
        }).notNull(),

        left_at: timestamp({
            withTimezone: true,
        }),

        duration_sec: integer(),

        disconnect_reason: disconnectReasonEnum(),

        created_at: timestamp({
            withTimezone: true,
        })
            .defaultNow()
            .notNull(),
    },
    (table) => [
        index("session_connections_participant_idx")
            .on(table.participant_id),

        index("session_connections_joined_at_idx")
            .on(table.joined_at),
    ]
);