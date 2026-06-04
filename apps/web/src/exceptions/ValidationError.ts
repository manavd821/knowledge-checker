import { ClientError } from "@/exceptions/ClientError";

export class ValidationError extends ClientError{
    status_code = 400;

    constructor(message = "Validation Failed", status_code? : number){
        super(message)
        this.status_code = status_code || this.status_code;
    }
}