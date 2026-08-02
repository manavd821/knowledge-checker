import { DB } from "@/db/types";
import { sessions } from "@/modules/sessions/sessions.table";
import { eq } from "drizzle-orm";
import get_logger from "@/lib/logging/logger-factory";
import type { NewSession, SelectSession } from "@/modules/sessions/sessions.types";
import { DatabaseBoundary } from "@/modules/database-boundary";

const logger = get_logger();

export class SessionRepository{
    constructor(private readonly database : DB){}

    @DatabaseBoundary("get session")
    async get_by_session_id(session_id : string): Promise<SelectSession | undefined> {
        const data = await this.database
                .select()
                .from(sessions)
                .where(eq(sessions.session_id, session_id))
        
        return data[0];
    }
    @DatabaseBoundary("create session")
    async create(data : NewSession): Promise<string>{
        const dbData = await this.database
        .insert(sessions)
        .values(data)
        .returning();
        return dbData[0].session_id;
    }
    @DatabaseBoundary("update session status")
    async update_status(
            session_id: string, 
            status : NewSession["status"],
        ){
        await this.database
            .update(sessions)
            .set({status})
            .where(eq(sessions.session_id, session_id));
    }
    @DatabaseBoundary("update session started at")
    async mark_session_started_at(session_id: string){
        const now = new Date();
        
        await this.database
        .update(sessions)
        .set({started_at : now})
        .where(eq(sessions.session_id, session_id));
        return now;
    }
}