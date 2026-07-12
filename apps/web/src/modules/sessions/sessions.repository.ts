import { DB } from "@/db/types";
import { sessions } from "@/modules/sessions/sessions.table";
import { eq } from "drizzle-orm";
import get_logger from "@/lib/logging/logger-factory";
import { NewSession } from "@/modules/sessions/sessions.types";

const logger = get_logger();

export class SessionRepository{
    constructor(private readonly database : DB){}

    async get_by_session_id(session_id : string){
        try {
            return await this.database
                    .select()
                    .from(sessions)
                    .where(eq(sessions.session_id, session_id))
                    
        } catch (error) {
            // logger.error(error.message, error);
        }
    }
    async create(data : NewSession): Promise<string>{
        const dbData = await this.database
        .insert(sessions)
        .values(data)
        .returning();
        return dbData[0].session_id;
    }
    async update_status(
            session_id: string, 
            status : NewSession["status"] = "ready",
        ){
        await this.database
            .update(sessions)
            .set({status : status})
            .where(eq(sessions.session_id, session_id));
    }
}