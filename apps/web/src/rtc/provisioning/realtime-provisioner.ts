import { Role } from "@/modules";

export interface IRealTimeProvisioner{
    generate_token(
        room_id: string, 
        participant_identity: string,
        connection_id: string,
        role: Role
    ): Promise<string>;

    dispatch_ai_agent(session_id: string) : Promise<void>;
}