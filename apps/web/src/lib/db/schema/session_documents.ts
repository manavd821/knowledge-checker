import {
    pgTable,
    uuid,
    integer, 
    text,
    timestamp,
    index,
} from "drizzle-orm/pg-core";
import { sessions } from "@/lib/db/schema/sessions";
import {
    fileTypeEnum,
} from "@/lib/db/enums";

export const session_documents = pgTable("session_documents",
{
    session_document_id : uuid().primaryKey().defaultRandom(),
    session_id : uuid()
        .references(() => sessions.session_id, {onDelete : "cascade"})
        .notNull(),
    file_name : text().notNull(),
    file_type : fileTypeEnum().notNull(),
    storage_url : text().notNull(),
    extracted_text : text(),
    token_count : integer(),
    uploaded_at : timestamp({
            withTimezone : true
        })
        .notNull()
        .defaultNow(),

    created_at : timestamp({
        withTimezone : true
    })
    .defaultNow()
    .notNull(),

    updated_at : timestamp({
        withTimezone : true
    })
    .notNull()
    .defaultNow(),
},
    (table) => [
        index("session_documents_session_id_idx")
        .on(table.session_id),
    ]
);