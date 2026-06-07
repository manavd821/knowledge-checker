import { AppError } from "@/exceptions/AppError";

export class ClientError extends AppError{
    status_code = 400;
    expose = true;
    constructor(
        message: string, 
        status_code? : number, 
        code = "CLIENT_ERROR",
    ){
        super(message, code);
        this.status_code = status_code || this.status_code;
    }
}