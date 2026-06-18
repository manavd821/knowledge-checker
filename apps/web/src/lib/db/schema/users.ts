import { 
    pgTable,
    text,
    timestamp,
    index
} from "drizzle-orm/pg-core";

export const users = pgTable("users",
{
    user_id : text().primaryKey(),
    email : text().notNull().unique(),
    first_name : text(),
    last_name : text(),
    created_at : timestamp().notNull().defaultNow(),
    updated_at : timestamp().notNull().defaultNow(),
},
    (table) => [
        index("users_user_id_idx")
        .on(table.user_id),
    ]
);
