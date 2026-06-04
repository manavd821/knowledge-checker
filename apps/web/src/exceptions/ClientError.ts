import { AppError } from "@/exceptions/AppError";

export class ClientError extends AppError{
    status_code = 400;

    constructor(message: string, status_code? : number){
        super(message)
        this.status_code = status_code || this.status_code;
    }
}