import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class NotFoundError extends AppError{
    readonly status_code = 404;
    readonly code = ErrorCode["NOT_FOUND"];
    readonly logLevel = "info";

    resource?: string;
    id? : string;
    constructor(
        message: string,
        id?: string,
        resource? : string,
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: true,
            cause : cause,
        });
        this.resource = resource;
        this.id = id;
    }
}