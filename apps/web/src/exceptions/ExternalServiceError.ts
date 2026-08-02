import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class ExternalServiceError extends AppError{

    readonly status_code = 503;
    readonly code = ErrorCode["EXTERNAL_SERVICE_ERROR"];
    readonly logLevel = "error";
    
    service: string;
    operation: string;

    constructor(
        message: string,
        service : string,
        operation: string,
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: true,
            cause : cause,
        });
        this.service = service;
        this.operation = operation;
    }
}