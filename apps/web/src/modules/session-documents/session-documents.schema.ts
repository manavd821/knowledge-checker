import {z} from "zod";
import { MIME_TO_FILE_TYPE } from "@/modules/sessions/sessions.meta";

export const SessionDocumentSchema = z
    .instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, {
        error: "File must be at most 5 MB",
    })
    .refine(
        file => file.type in MIME_TO_FILE_TYPE, {
            error : 'Invalid file type. Only PDF, DOCX, TXT, and Markdown (.md) files are supported.',
        }
    )