import { NextRequest, NextResponse } from "next/server";

import { createServices } from "@/modules/factory";
import { db } from "@/db/client";
import { getRequestContext } from "@/lib/logging/request-contexts";
import get_logger from "@/lib/logging/logger-factory";

import {
    PauseSessionSuccess,
} from "@/shared/dto/sessions/pause-session.dto";
import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";

export const POST = withRequestContextAndErrorHandling(async (
        req: NextRequest,
        { params }: { params: Promise<{ session_id: string }>; },
    ) => {
        const logger = get_logger();

        const { session_id } = await params;
        const user_id = getRequestContext()?.user_id!;

        await db.transaction(async (tx) => {
            const {
                sessions: session_service,
            } = createServices(tx);

            // pause the session
            await session_service.pauseSession(session_id, user_id);

            logger.info("Session paused", {
                session_id,
                user_id,
            });
        });

        const result = {
            success: true,
            data: {
                session_id,
                status: "pause",
            },
        } satisfies PauseSessionSuccess;

        return NextResponse.json(result, {
            status: 200,
        });
    },
);