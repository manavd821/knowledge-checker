import { NextRequest, NextResponse } from "next/server";

import { createServices } from "@/modules/factory";
import { db } from "@/db/client";
import { getRequestContext } from "@/lib/logging/request-contexts";
import get_logger from "@/lib/logging/logger-factory";

import {
    ResumeSessionSuccess,
} from "@/shared/dto/sessions/resume-session.dto";
import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";

export const POST = withRequestContextAndErrorHandling( async ( req: NextRequest,
        { params }: { params: Promise<{ session_id: string }>; },
    ) => {
        const logger = get_logger();

        const { session_id } = await params;
        const user_id = getRequestContext()?.user_id!;

        await db.transaction(async (tx) => {
            const {
                sessions: session_service,
            } = createServices(tx);

            //  Resume the session
            await session_service.resumeSession(
                session_id, 
                user_id,
            );

            logger.info("Session resumed", {
                session_id,
                user_id,
            });
        });

        const result = {
            success: true,
            data: {
                session_id,
                status: "active",
            },
        } satisfies ResumeSessionSuccess;

        return NextResponse.json(result, {
            status: 200,
        });
    },
);