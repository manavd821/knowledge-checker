import { DB } from "@/db/types";
import { session_documents } from "@/modules/session-documents/session-documents.table";
import { type NewDocument } from "@/modules/session-documents/session-documents.types";
import { DatabaseBoundary } from "@/modules/database-boundary";


export class SessionDocumentRepository{
    constructor(private readonly database : DB){}

    @DatabaseBoundary("create session document")
    async create(data : NewDocument) : Promise<string>{
        const [ dbData ] = await this.database
        .insert(session_documents)
        .values(data)
        .returning()
        ;
        return dbData.session_document_id;
    }
}