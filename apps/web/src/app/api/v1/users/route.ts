import { db } from "@/db/client";
import { ConfigurationError } from "@/exceptions/ConfigurationError";
import { withRequestContextAndErrorHandling } from "@/lib/api/wrap-routes";
import get_logger from "@/lib/logging/logger-factory";
import { createServices } from "@/modules/factory";
import { SearchUserQuerySchema } from "@/modules/users/users.schema";
import { GetSearchUsersSchema, GetSearchUsersSuccess } from "@/shared/dto/users/search-user.dto";
import { NextRequest, NextResponse } from "next/server";

export const GET = withRequestContextAndErrorHandling(async (
    req: NextRequest,
) => {
    const logger = get_logger();
    const searchParams = req.nextUrl.searchParams;
    const params = SearchUserQuerySchema.parse({
        search: searchParams.get("search"),
    })
    const user_service = createServices(db).users;
    const users = await user_service.search(params);
    const z_res = GetSearchUsersSchema.safeParse(users);
    if(!z_res.success) {
        logger.error(
            "Error in parsing GetSearchUsersSchema",
            {issues : z_res.error.issues},
        );
        throw new ConfigurationError(
            "Error in parsing GetSearchUsersSchema",
            {issues : z_res.error.issues},
        )
    }
    const res = {
        success: true,
        data : z_res.data,
    } satisfies GetSearchUsersSuccess;
    
    return NextResponse.json(res,{status: 200});
})