import { DB } from "@/db/types";
import { session_documents } from "@/modules/session-documents/session-documents.table";
import { NewDocument } from "@/modules/session-documents/session-documents.types";


export class SessionDocumentRepository{
    constructor(private readonly database : DB){}

    async create(data : NewDocument) : Promise<string>{
        const [ dbData ] = await this.database
        .insert(session_documents)
        .values(data)
        .returning()
        ;
        return dbData.session_document_id;
    }
}