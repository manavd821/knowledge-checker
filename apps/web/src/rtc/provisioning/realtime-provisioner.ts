export interface IRealTimeProvisioner{
    generate_token(
        room_id: string, 
        participant_identity: string,
        connection_id: string,
    ): Promise<string>;
}