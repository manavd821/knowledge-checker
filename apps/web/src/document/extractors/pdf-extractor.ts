import { PDFParse } from "pdf-parse"
import "pdf-parse/worker";


export async function pdf_extractor(file: File): Promise<string> {

    const bytes = new Uint8Array(await file.arrayBuffer());
    const parser = new PDFParse(bytes);
    
    try {
        const result = await parser.getText();
        return result.text;
    } finally {
        await parser.destroy();
    }

}