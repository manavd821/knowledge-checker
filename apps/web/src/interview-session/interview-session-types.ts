import { z } from "zod";
import { ConnectionStateSchema } from "@/interview-session/interview-session-schema";
import { LiveSessionInfo } from "@/modules";
import { GetUser } from "@/shared/dto/users/get-user.dto";

export type ConnectionState = z.infer<typeof ConnectionStateSchema>;

export type InterviewIntialization = {
    connection_state : ConnectionState,
    live_session_info : LiveSessionInfo,
    user : GetUser,
};
export type SessionMeta = {
    user: GetUser,
    session: LiveSessionInfo,
}
export type SessionTimer = {
    elapsed_seconds: number,
    remaining_seconds: number,
}