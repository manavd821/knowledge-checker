import { db } from "@/db/client";
import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import { createServices } from "@/modules/factory";
import { NextRequest, NextResponse } from "next/server";

export const POST = withRequestContextAndErrorHandling(async(
    req: NextRequest,
    { params } : { params : Promise<{connection_id: string }> } 
) => {
    const { connection_id } = await params;
    const session_connection_service = createServices(db).session_connections;
    const session_connection_data = await session_connection_service.validate_connection(connection_id);

    await db.transaction(async (tx) => {
        const {
            session_connections: session_connections_service,
            session_participants: session_participants_service
        } = createServices(tx);
        const now = new Date();
        const elapsedMs = now.getTime() - session_connection_data.joined_at.getTime();
        const elapsedSeconds = Math.floor(elapsedMs / 1000);

        await session_connections_service.mark_connection_left(
            session_connection_data.connection_id,
            elapsedSeconds,
            now,
        );
        await session_participants_service.mark_participant_left(
            session_connection_data.participant_id,
            elapsedSeconds,
        )
    })
    return new NextResponse(null, {status: 204});
})  