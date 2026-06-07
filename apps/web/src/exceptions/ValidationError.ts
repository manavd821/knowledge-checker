import { ClientError } from "@/exceptions/ClientError";
import {z} from "zod";
export class ValidationError extends ClientError{
    status_code = 400;
    expose = true;
    issues : z.core.$ZodIssue[];
    constructor(
        message = "Validation Failed", 
        issues : z.core.$ZodIssue[],
        status_code? : number, 
        code="VALIDATION_ERROR", 
    ){
        super(message, status_code, code);
        this.status_code = status_code || this.status_code;
        this.issues = issues;
    }

    toJSON(){
        return {
            ...super.toJSON(),
            errors : this.issues,
        };
    }
}