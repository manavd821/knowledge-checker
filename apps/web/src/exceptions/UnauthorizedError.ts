import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class UnauthorizedError extends AppError{
    readonly status_code = 401;
    readonly code = ErrorCode["UNAUTHORIZED"];
    readonly logLevel = "warn";

    constructor(
        message: string,
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: true,
            cause : cause,
        });
    }
}