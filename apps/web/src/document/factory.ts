import { DocumentExtractionService } from "@/document/document-extraction.service";
import { ExtractorRegistry } from "@/document/extractor-registry";
import { 
    pdf_extractor,
    docx_extractor,
    text_extractor,
    markdown_extractor,
} from "@/document/extractors";

export function get_extractor_registry() : ExtractorRegistry{
    const registery = new ExtractorRegistry();
    
    registery.register("pdf", pdf_extractor);
    registery.register("docx", docx_extractor);
    registery.register("txt", text_extractor);
    registery.register("md", markdown_extractor);

    return registery;
}
export function get_document_extraction_service() : DocumentExtractionService{
    return new DocumentExtractionService(get_extractor_registry());
}