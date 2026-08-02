import { AppError } from "@/exceptions/AppError";
import { ErrorCode } from "@/shared/errors/error-code";

export class DocumentExtractionError extends AppError{

    readonly status_code = 500;
    readonly code = ErrorCode["DOCUMENT_EXTRACTION_ERROR"];
    readonly logLevel = "error";

    filetype: string;
    extractor: string;
    
    constructor(
        message: string,
        filetype: string,
        extractor: string,
        cause? : unknown,
    ){
        super(message, {
            exposeToClient: true,
            cause : cause,
        });
        this.filetype = filetype;
        this.extractor = extractor;
    }
}