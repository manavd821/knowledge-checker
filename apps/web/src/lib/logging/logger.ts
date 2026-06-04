import pino from "pino";
import { getRequestContext } from "@/lib/logging/request-contexts";

const logger = pino({
    level : process.env.NODE_ENV || "info",
})

export class Logger{
    info(msg?: string, data?: object){
        const request_ctx_data = getRequestContext();

        logger.info({
            ...request_ctx_data,
            ...data,
        },
        msg
    )
    }
    error(msg? : string, data?: object){
        logger.error({...data}, msg);
    }
    warn(msg? : string, data?: object){
        logger.warn({...data}, msg);
    }
    fatal(msg? : string, data?: object){
        logger.fatal({...data}, msg);
    }
    debug(msg? : string, data?: object){
        logger.debug({...data}, msg);
    }
}