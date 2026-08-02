import { ErrorCode } from "@/shared/errors/error-code";
import { AppError } from "./AppError";

export class MessageDeserializationError extends AppError{
    readonly status_code = 500;
    readonly code = ErrorCode["MESSAGE_DESERIALIZATION_ERROR"];
    readonly exposeToClient = false;
    readonly logLevel = "warn";

    readonly raw?: Uint8Array;

    constructor(
        message: string,
        raw?: Uint8Array,
        cause?: unknown,
    ) {
        super(message, { cause });
        this.raw = raw;
    }

}