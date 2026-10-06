export interface ProvisionerWebhookEvents{
    participant_left : {
        connection_id:string,
        session_id: string
    }
}