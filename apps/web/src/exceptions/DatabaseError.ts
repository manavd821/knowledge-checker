import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class DatabaseError extends AppError{
    readonly status_code = 500;
    readonly code = ErrorCode["DATABASE_ERROR"];
    readonly logLevel = "error";
    operation: string;

    constructor(
        message: string,
        operation : string,
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: false,
            cause : cause,
        });
        this.operation = operation;
    }
}