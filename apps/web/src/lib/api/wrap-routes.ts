import { NextRequest, NextResponse } from "next/server";
import { request_context } from "@/lib/logging/request-contexts";
import { Logger } from "@/lib/logging/logger";
import { ClientError } from "@/exceptions/ClientError";
import { ServerError } from "@/exceptions/ServerError";

export const withRequestContextAndErrorHandling = 
    async (handler : (req : NextRequest) => Promise<Response>) => {
        return async (req : NextRequest) => {
            return request_context.run({
                user_id : req.headers.get('X-User-ID')  || "",
                req_id : crypto.randomUUID(),
                method : req.method,
                route : req.nextUrl.pathname,
            }, async () => {
                const logger= new Logger();
                
                logger.debug("attaching request context", request_context.getStore());
                try {
                    return await handler(req);
                } catch (error) {
                    if(error instanceof ServerError){
                        logger.warn(error.message);
                        return NextResponse.json(
                            { 
                            success : false,
                            message : "Internal Server Error",
                            status_code : error.status_code,
                        },
                    );
                    }
                    else if(error instanceof ClientError){
                        logger.info(error.message);
                        return NextResponse.json({
                            success : false,
                            message : error.message,
                            status_code : error.status_code
                        },
                    )
                    }
                    else{
                        logger.error("Unexpected Error", {
                            error
                        });

                        return NextResponse.json({
                            success: false,
                            message: "Internal Server Error",
                            status_code : 500,
                        });
                    }
                }
            })
        }
    }