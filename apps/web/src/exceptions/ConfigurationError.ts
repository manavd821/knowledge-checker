import { ErrorCode } from "@/shared/errors/error-code";
import { AppError } from "./AppError";

export class ConfigurationError extends AppError{
    readonly status_code = 500;
    readonly code = ErrorCode["CONFIGURATION_ERROR"];
    readonly exposeToClient = false;
    readonly logLevel = "error";

    constructor(
        message: string,
        cause?: unknown,
    ){
        super(message, { cause });
    }
}