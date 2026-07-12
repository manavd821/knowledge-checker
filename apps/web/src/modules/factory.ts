import { UserRepository } from "@/modules/users/users.repository";
import { SessionRepository } from "@/modules/sessions/sessions.repository";
import { DB } from "@/db/types";
import { SessionService } from "@/modules/sessions/sessions.service";
import { SessionDocumentRepository } from "@/modules/session-documents/session-documents.repository";
import { get_ai_client } from "@/ai/factory";
import { get_document_extraction_service } from "@/document/factory";
import { get_object_storage } from "@/storage/factory";

export function createRepositories(db : DB){
    return {
        users : new UserRepository(db),
        sessions : new SessionRepository(db),
        session_docs : new SessionDocumentRepository(db),
    }
}
export function createServices(db : DB){
    const { 
        users, 
        sessions,
        session_docs,
    } = createRepositories(db);

    const ai_client = get_ai_client();
    const doc_extract_service = get_document_extraction_service();
    const object_storage = get_object_storage("appwrite");
    return {
        sessions: new SessionService(
            sessions,
            session_docs,
            ai_client,
            doc_extract_service,
            object_storage,
        ),

    }
}