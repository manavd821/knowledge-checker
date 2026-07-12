import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import { NextRequest } from "next/server";
import { createRepositories } from "@/modules/factory";
import { db } from "@/db/client";

export const GET = withRequestContextAndErrorHandling(async (
    req : NextRequest,
    { params } : { params : Promise<{ session_id : string }> }
) => {
    const { session_id } = await params;
    const repos = createRepositories(db);
    const db_session = repos.sessions.get_session_by_session_id(session_id);
    return new Response('Webhook received', { status: 200 });
});