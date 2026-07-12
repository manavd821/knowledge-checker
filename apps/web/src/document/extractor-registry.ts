import { FileType } from "@/modules";

type Extractor = (doc: File) => Promise<string>;

export class ExtractorRegistry{
    docs : Map<FileType, Extractor>;
    constructor(){
        this.docs = new Map();
    };

    register(type: FileType, extractor : Extractor){
        this.docs.set(type, extractor);
    }

    get(type: FileType) : Extractor {
        return this.docs.get(type)!;
    }
};
