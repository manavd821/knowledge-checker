import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";
import { z } from "zod";
export class ValidationError extends AppError{
    readonly status_code = 400;
    readonly code = ErrorCode["VALIDATION_ERROR"];
    readonly logLevel = "info";

    issues : z.core.$ZodIssue[];

    constructor(
        message: string,
        issues : z.core.$ZodIssue[],
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: true,
            cause : cause,
        });
        this.issues = issues;
    }
    toJSON(){
        return {
            ...super.toJSON(),
            issues : this.issues,
        }
    }
}