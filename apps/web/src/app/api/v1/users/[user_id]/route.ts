import { db } from "@/db/client";
import { ConfigurationError } from "@/exceptions/ConfigurationError";
import { NotFoundError } from "@/exceptions/NotFoundError";
import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import get_logger from "@/lib/logging/logger-factory";
import { createServices } from "@/modules/factory";
import { GetUserSchema, GetUserSuccess } from "@/shared/dto/users/get-user.dto";
import { NextRequest, NextResponse } from "next/server";

export const GET = withRequestContextAndErrorHandling(async(
    req : NextRequest,
    { params } : {params : Promise<{ user_id : string }>}
) => {
    const logger = get_logger();
    const { user_id } = await params;
    const user_service = createServices(db).users;
    const user = await user_service.get_user(user_id);
    if(!user){
        throw new NotFoundError(
            `User not found`,
            user_id,
            "user_id"
        )
    }
    logger.info(
        "User fetchd successfully",
    )
    const zod_res = GetUserSchema.safeParse({
        ...user,
        created_at : user.created_at.toISOString(),
        updated_at : user.updated_at.toISOString(),
    });
    if(!zod_res.success){
        throw new ConfigurationError(
            "User data returned from the database does not match the expected schema",
            {issues: zod_res.error.issues},
        )
    }
    const res = {
        success: true,
        data : zod_res.data,
    } satisfies GetUserSuccess;
    return NextResponse.json(res, {status: 200});
})