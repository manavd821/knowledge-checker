import { ConfigurationError } from "@/exceptions/ConfigurationError";
import { ConnectionState } from "@/interview-session/interview-session-types";
import { LiveSessionInfo } from "@/modules";
import { CreateConnection } from "@/shared/dto/sessions/create-connection.dto";

export class SessionCacheService{
    constructor(){}

    get_live_session_info(session_id : string) : LiveSessionInfo | null{
        const key = `live_session_info:${session_id}`;
        
        try {
            const data_str = sessionStorage.getItem(key);
            if(!data_str) return null;
            const data : LiveSessionInfo = JSON.parse(data_str);
            return data;
        } catch (error) {
            throw new ConfigurationError(
                `Failed to parse live session info cache for session_id:${session_id} . Error: ${(error as Error).message}` ,
                {error}
            )
        }
    }
    
    set_live_session_info(session_id: string, data : LiveSessionInfo) : void{
        const key = `live_session_info:${session_id}`;
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            throw new ConfigurationError(
                `Failed to parse session data for session_id:${session_id} . Error: ${(error as Error).message}` ,
                {error}
            )
        }
    }

    get_connection_state(session_id: string) : ConnectionState | null{
        const key = `connection_state:${session_id}`;
        try {
            const data_str = sessionStorage.getItem(key);
            if(!data_str) return null;
            const data : ConnectionState = JSON.parse(data_str);
            return data;
        } catch (error) {
            throw new ConfigurationError(
                `Failed to parse connection state cache for session_id:${session_id} . Error: ${(error as Error).message}` ,
                {error}
            )
        }
    }

    set_connection_state(session_id: string, data: Partial<ConnectionState>) : void{
        const key = `connection_state:${session_id}`;
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            throw new ConfigurationError(
                `Failed to parse connection state for session_id:${session_id} . Error: ${(error as Error).message}` ,
                {error}
            )
        }
    }

    get_create_connection(session_id: string) : CreateConnection | null{
        const key = `create_connection:${session_id}`;
        try {
            const data_str = sessionStorage.getItem(key);
            if(!data_str) return null;
            const data : CreateConnection = JSON.parse(data_str);
            return data;
        } catch (error) {
            throw new ConfigurationError(
                `Failed to parse create connection cache for session_id:${session_id} . Error: ${(error as Error).message}` ,
                {error}
            )
        }
    }

    set_create_connection(session_id: string, data: CreateConnection) : void{
        const key = `create_connection:${session_id}`;
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            throw new ConfigurationError(
                `Failed to parse create connection for session_id:${session_id} . Error: ${(error as Error).message}` ,
                {error}
            )
        }
    }
}