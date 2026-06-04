
export abstract class AppError extends Error{
    abstract status_code: number;

    constructor(message: string){
        super(message);
        this.name = this.constructor.name;
    }
}