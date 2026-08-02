import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class ConflictError extends AppError{
    readonly status_code = 409;
    readonly code = ErrorCode["CONFLICT"];
    readonly logLevel = "warn";

    resource: string;
    reason : string;

    constructor(
        message: string,
        resource : string,
        reason: string,
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: true,
            cause : cause,
        });
        this.resource = resource;
        this.reason = reason;
    }
}