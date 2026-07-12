import { NextRequest, NextResponse } from "next/server";
import { request_context } from "@/lib/logging/request-contexts";
import { Logger } from "@/lib/logging/logger";
import { ClientError } from "@/exceptions/ClientError";
import { ServerError } from "@/exceptions/ServerError";
import { ValidationError } from "@/exceptions/ValidationError";

export async function withRequestContextAndErrorHandling<TContext>
    (handler : (
        req : NextRequest,
        context : TContext,
    ) => Promise<Response>) {
    return async (
            req : NextRequest, 
            context : TContext
        ) => {
            return request_context.run({
                user_id : req.headers.get('X-User-ID')  || "",
                req_id : crypto.randomUUID(),
                method : req.method,
                route : req.nextUrl.pathname,
            }, async () => {
                const logger= new Logger();
                
                logger.debug("attaching request context", request_context.getStore());
                try {
                    return await handler(req, context);
                } catch (error) {
                    if(error instanceof ServerError){
                        logger.warn(error.message, {
                            ...error
                        });
                        return NextResponse.json(error.toJSON());
                    }
                    else if(error instanceof ValidationError){
                        logger.info("Validation error",{
                            issues : error.issues,
                        });
                        return NextResponse.json(error.toJSON());
                    }
                    else if(error instanceof ClientError){
                        logger.info(error.message, {...error});
                        return NextResponse.json(error.toJSON());
                    }
                    else{
                        logger.error("Unexpected Error", {
                            error
                        });

                        return NextResponse.json({
                            success: false,
                            code : "INTERNAL_SERVER_ERROR",
                            message: "Internal Server Error",
                            status_code : 500,
                        });
                    }
                }
            })
        }
}