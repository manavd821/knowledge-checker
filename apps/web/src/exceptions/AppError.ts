import { LogLevel } from "@/lib/logging/types/loglevel";
import { ErrorCode } from "@/shared/errors/error-code";

export abstract class AppError extends Error{
    abstract readonly status_code: number;
    abstract readonly code: ErrorCode;
    abstract readonly logLevel: LogLevel;
    
    readonly cause?: unknown;
    readonly exposeToClient : boolean;
    
    constructor(
        message: string,
        options? : {
            exposeToClient?: boolean;
            cause? : unknown;
        }
    ){
        super(message);
        this.exposeToClient = options?.exposeToClient ?? false;
        this.cause = options?.cause;
    }
    toJSON(){
        return{
            success : false,
            code : this.code,
            message: this.exposeToClient
                ? this.message 
                : "Internal Server Error",
            status_code : this.status_code
        };
    }
}