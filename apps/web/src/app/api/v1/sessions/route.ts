import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import { NextRequest, NextResponse } from "next/server";
import { 
    CreateSessionRouteShema,
} from "@/modules";
import { createServices } from "@/modules/factory";
import { db } from "@/db/client";
import { getRequestContext } from "@/lib/logging/request-contexts";
import { ValidationError } from "@/exceptions/ValidationError";
import { CreateSessionSuccess } from "@/shared/dto/sessions/create-session.dto";
import get_logger from "@/lib/logging/logger-factory";

export const POST = withRequestContextAndErrorHandling(async (req : NextRequest) => {
    const user_id = getRequestContext()?.user_id!;
    const logger = get_logger();

    const formData = await req.formData();
    const session_service = createServices(db).sessions;
    //parse and validate data
    const data = session_service.parseFormData(formData);
    const result = CreateSessionRouteShema.safeParse(data);

    if(!result.success){
        logger.info(
            "Validation error",
            {issues: result.error.issues},
        )
        throw new ValidationError(
            "request payload Validation failed",
            result.error.issues,
        );
    }
    const session_id = await db.transaction(async tx => {
        const session_service = createServices(tx).sessions;
        return session_service.createSession(
            user_id, 
            result.data
        );
    });
    const res = {
        success: true,
        data : {
            session_id,
            status : "ready",
        }
    } satisfies CreateSessionSuccess;
    return NextResponse.json(res, {status : 201,})
})