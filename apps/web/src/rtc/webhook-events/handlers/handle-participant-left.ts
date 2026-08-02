import { db } from "@/db/client";
import { createServices } from "@/modules/factory";
import { ProvisionerWebhookEvents } from "@/rtc/webhook-events/provisioner-webhook-events";

export const handleParticipantLeft = async (
    payload: ProvisionerWebhookEvents["participant_left"]
) => {
    const { connection_id } = payload;
    await db.transaction(async (tx) => {
                const {
                    session_connections: session_connections_service,
                    session_participants: session_participants_service
                } = createServices(tx);
                const session_connection =
                    await session_connections_service.validate_connection(connection_id);
    
                const now = new Date();
                const elapsedMs = now.getTime() - session_connection.joined_at.getTime();
                const elapsedSeconds = Math.floor(elapsedMs / 1000);
    
                await session_connections_service.mark_connection_left(
                    connection_id,
                    elapsedSeconds,
                    now,
                );
                await session_participants_service.update_completed_duration_sec(
                    session_connection.participant_id,
                    elapsedSeconds,
                )
            });
}