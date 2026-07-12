import { SessionConnection } from "@/realtime/session-connection";

export interface IRealTimeProvider{
    create_session_connection() : SessionConnection;
}