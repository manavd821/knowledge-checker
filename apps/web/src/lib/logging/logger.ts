import pino from "pino";
import { getRequestContext } from "@/lib/logging/request-contexts";
import { LogLevel } from "@/lib/logging/types/loglevel";

const logger = pino({
    level : process.env.LOG_LEVEL,
    ...(
        process.env.NODE_ENV === "development" && {
        transport : {
            target : "pino-pretty",
            options : {
                colorize: true,
            }
        }
    })
})

export class Logger{

    log(
        msg: string,
        level : LogLevel,
        data?: Record<string, unknown>,
    ){
        switch(level){
            case "debug":
                this.debug(msg, data);
                break;
            case "error":
                this.error(msg, data);
                break;
            case "fatal":
                this.fatal(msg, data);
                break;
            case "info":
                this.info(msg, data);
                break;
            case "warn":
                this.warn(msg, data);
                break;
        }
    }

    info(msg?: string, data?: Record<string, unknown>){
        const request_ctx_data = getRequestContext();

        logger.info({
            ...request_ctx_data,
            ...data,
        },
        msg
    )
    }
    error(msg? : string, data?: Record<string, unknown>){
        logger.error({...data}, msg);
    }
    warn(msg? : string, data?: Record<string, unknown>){
        logger.warn({...data}, msg);
    }
    fatal(msg? : string, data?: Record<string, unknown>){
        logger.fatal({...data}, msg);
    }
    debug(msg? : string, data?: Record<string, unknown>){
        logger.debug({...data}, msg);
    }
}