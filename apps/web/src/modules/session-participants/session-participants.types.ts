import { session_participants } from "@/modules/session-participants/session-participants.table";
import { 
    InferInsertModel,
    InferSelectModel,
} from "drizzle-orm";

export type CreateSessionParticipants = InferInsertModel<typeof session_participants>;
export type SelectSessionParticipants = InferSelectModel<typeof session_participants>;

export type MarkParticipantJoined = {
    participant: SelectSessionParticipants,
    now: Date,
}