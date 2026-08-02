import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class RTCError extends AppError{

    readonly status_code = 500;
    readonly code = ErrorCode["RTC_ERROR"];
    readonly logLevel = "error";

    provider: string;
    operation: string;

    constructor(
        message: string,
        provider : string,
        operation: string,
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: false,
            cause : cause,
        });
        this.provider = provider;
        this.operation = operation;
    }
}