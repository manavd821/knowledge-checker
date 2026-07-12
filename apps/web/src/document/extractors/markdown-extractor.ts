
export async function markdown_extractor(file: File): Promise<string> {
    return file.text();
}