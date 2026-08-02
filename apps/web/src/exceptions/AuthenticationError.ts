import { AuthenticationMechanism } from "@/types/authentication-mechanism ";
import { AppError } from "./AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class AuthenticationError extends AppError{
    readonly status_code = 401;
    readonly code = ErrorCode["AUTHENTICATION_FAILED"];
    readonly exposeToClient = false;
    readonly logLevel = "warn";

    readonly mechanism: AuthenticationMechanism;
    constructor(
        message: string,
        mechanism: AuthenticationMechanism,
        cause?: unknown,
    ) {
        super(message, { cause });
        this.mechanism = mechanism;
    }

}