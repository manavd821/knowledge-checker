

export async function text_extractor(file: File): Promise<string> {
    return file.text();
}