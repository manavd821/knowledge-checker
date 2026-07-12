import { ExtractorRegistry } from "@/document/extractor-registry";
import { 
    FileType, 
    MIME_TO_FILE_TYPE, 
    MimeType, 
} from "@/modules";

export class DocumentExtractionService{
    constructor(
        private readonly registery : ExtractorRegistry
    ){}

    get_file_type(file: File) : FileType{
        const file_type = MIME_TO_FILE_TYPE[file.type as MimeType]
        if (!file_type) {
            throw new Error(`Unsupported MIME type: ${file.type}`);
        }
        return file_type;
    }
    async extract(file: File) : Promise<string>{
        const type = this.get_file_type(file);
        const extractor = this.registery.get(type);
        if (!extractor) {
            throw new Error(`No extractor registered for ${type}`);
        }

        const extracted_text = await extractor(file);
        return extracted_text;
    }
};