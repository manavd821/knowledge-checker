import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { session_connections } from "@/modules/session-connections/session-connections.table";

export type CreateSessionConnection = InferInsertModel<typeof session_connections>;
export type SelectSessionConnection = InferSelectModel<typeof session_connections>;