import { DB } from "@/db/types";
import { DatabaseBoundary } from "@/modules/database-boundary";
import { CreateSessionConnection, SelectSessionConnection } from "@/modules/session-connections/session-connections.types";
import { session_connections } from "@/modules/session-connections/session-connections.table";
import { eq } from "drizzle-orm";


export class SessionConnectionsRepository{
    constructor(
        private readonly db: DB,
    ){}
    @DatabaseBoundary("create session_connections")
    async create(
        data: CreateSessionConnection
    ) : Promise<string>{
        const [ row ] = await this.db
                .insert(session_connections)
                .values(data)
                .returning()
        
        return row.connection_id;
    }

    @DatabaseBoundary("get session_connections")
    async get(
        connection_id: string,
    ) : Promise<SelectSessionConnection | undefined>{
        const [data] = await this.db
                    .select()
                    .from(session_connections)
                    .where(eq(
                        session_connections.connection_id, connection_id
                    ));
        return data;
    }

    @DatabaseBoundary("update session_connection")
    async update(
        connection_id: string,
        update: Partial<SelectSessionConnection>
    ){
        await this.db
                .update(session_connections)
                .set(update)
                .where(eq(
                    session_connections.connection_id, connection_id
                ));
    }
}