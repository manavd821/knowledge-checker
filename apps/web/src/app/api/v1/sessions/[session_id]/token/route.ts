import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import { NextRequest, NextResponse } from "next/server";
import { createServices } from "@/modules/factory";
import { db } from "@/db/client";
import { getRequestContext } from "@/lib/logging/request-contexts";
import { get_realtime_provisioner_service } from "@/rtc/provisioning/realtime-provisioner.factory";
import { CreateConnectionSchema, CreateConnectionSuccess } from "@/shared/dto/sessions/create-connection.dto";
import get_logger from "@/lib/logging/logger-factory";
import { ConfigurationError } from "@/exceptions/ConfigurationError";

export const POST = withRequestContextAndErrorHandling(async (
    req : NextRequest,
    { params } : { params : Promise<{ session_id : string }> }
) => {
    const logger = get_logger();
    const { session_id } = await params;
    const user_id = getRequestContext()?.user_id!;

    const session_service = createServices(db).sessions;
    const session_data = await session_service.validate_session(session_id);
    
    const {
        participant_id,
        connection_id,
        completed_duration_sec,
        role
    } = await db.transaction(async (tx) => {
        const {
            session_participants: session_participants_service,
            session_connections: session_connections_service,
        } = createServices(tx);

        const {
            participant,
            now,
        } = await session_participants_service.mark_participant_joined(user_id, session_id);
        const { 
            participant_id,
            completed_duration_sec,
            role,
        } = participant;
        const connection_id = await session_connections_service.create_session_connection({
            participant_id,
            joined_at: now,
        })
        session_service.mark_session_active_and_started_at(session_id, session_data);
        return {
            participant_id,
            connection_id,
            completed_duration_sec,
            role,
        }
    });
    const realtime_provisioner_service = get_realtime_provisioner_service();
    const connection_data = await realtime_provisioner_service
                .create_connection(session_id,participant_id, connection_id, role);
    
    const r = CreateConnectionSchema.safeParse({
        ...session_data,
        ...connection_data,
        completed_duration_sec,
        scheduled_at : session_data.scheduled_at.toISOString(),
        started_at: session_data.started_at?.toISOString(),
        ended_at: session_data.ended_at?.toISOString(),
        participant_id,
        connection_id,
        status : "active",
    });
    if(!r.success){
        logger.error("Error in parsing", {issues: r.error.issues});
        throw new ConfigurationError("Error in parsing", {issues: r.error.issues})
    }
    const {data} = r;
    const res = {
        success : true,
        data
    } satisfies CreateConnectionSuccess;
    logger.info("Connection created successfully", {session_id, user_id});
    return NextResponse.json(res,{ status: 200 });
});
