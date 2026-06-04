import { ClientError } from "@/exceptions/ClientError";

export class AuthError extends ClientError{
    status_code = 401;

    constructor(message = "Unauthorized", status_code? : number){
        super(message)
        this.status_code = status_code || this.status_code;
    }
}