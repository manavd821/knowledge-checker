import { SessionRepository } from "@/modules/sessions/sessions.repository";
import { SessionDocumentRepository } from "@/modules/session-documents/session-documents.repository";
import { CreateSession, NewSession } from "@/modules/sessions/sessions.types";
import { IAIClient } from "@/ai/ai-client";
import { DocumentExtractionService } from "@/document/document-extraction.service";
import { IObjectStorage } from "@/storage/object-storage";
import { MimeType, NewDocument } from "@/modules/session-documents/session-documents.types";
import { MIME_TO_FILE_TYPE } from "@/modules/sessions/sessions.meta";
import get_logger from "@/lib/logging/logger-factory";

const logger = get_logger()
export class SessionService{
    constructor(
        private readonly session_repo : SessionRepository,
        private readonly session_doc_repo : SessionDocumentRepository,
        private readonly ai_client: IAIClient,
        private readonly doc_extract_service: DocumentExtractionService,
        private readonly object_store: IObjectStorage,
    ){}

    async createSession(
        user_id: string,
        data : CreateSession,
    ) : Promise<string>{
        const session_data : NewSession = {
            ...data,
            user_id,
            status: "preparing",
            scheduled_at: data.scheduled_at
                ? new Date(data.scheduled_at)
                : new Date()
        }
        const session_id = await this.session_repo.create(session_data);
        logger.info("Session created succefully", {session_id});
        if(data.session_documents && data.session_documents.length){
            // store docs in object storage and extract text
            const results = await Promise.all(
                data.session_documents.map(async file => {
                    const [ stored_object, extracted_text ] = await Promise.all([
                        this.object_store.store(file),
                        this.doc_extract_service.extract(file)
                    ]);
                    return { stored_object, extracted_text }
                })
            );
            logger.info("docs are stored in bucket succefully",{session_id});
            const doc_ids = Promise.all(
                results.map(async ({ stored_object,extracted_text }) => {
                    const doc_data : NewDocument = {
                        session_id: session_id,
                        file_name : stored_object.name,
                        file_type : MIME_TO_FILE_TYPE[stored_object.contentType as MimeType],
                        storage_url: stored_object.key,
                        extracted_text: extracted_text,
                    }
                    return await this.session_doc_repo.create(doc_data);
                })
            )
            logger.info("session document are stored succefully",{session_id});
            // generate and store session brief

        }
        await this.update_session_status_ready(session_id);
        return session_id;
    }
    async update_session_status_ready(session_id : string) : Promise<void>{
        await this.session_repo.update_status(session_id, "ready");
    }
}