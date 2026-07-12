import mammoth from 'mammoth';

export async function docx_extractor(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await mammoth.extractRawText({buffer});
    return result.value;
}