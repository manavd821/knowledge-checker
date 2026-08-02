import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class ForbiddenError extends AppError{
    readonly status_code = 403;
    readonly code = ErrorCode["FORBIDDEN"];
    readonly logLevel = "warn";

    resource? : string;
    constructor(
        message: string,
        resource?: string,
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: true,
            cause : cause,
        });
        this.resource = resource;
    }
}