
export abstract class AppError extends Error{
    abstract status_code: number;
    abstract expose: boolean;
    code = "UNKNOWN_ERROR";

    constructor(
        message: string, 
        code = "UNKNOWN_ERROR",
    ){
        super(message);
        this.name = this.constructor.name;
        this.code = code
    }
    toJSON(){
        return{
            success : false,
            code : this.code,
            message: this.message,
            status_code : this.status_code
        };
    }
}