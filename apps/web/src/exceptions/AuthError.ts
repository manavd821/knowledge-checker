import { ClientError } from "@/exceptions/ClientError";

export class AuthError extends ClientError{
    status_code = 401;
    expose = true;
    constructor(
        message = "Unauthorized", 
        status_code? : number, 
        code = "AUTH_ERROR",
    ){
        super(message, status_code, code);
        this.status_code = status_code || this.status_code;
    }
}