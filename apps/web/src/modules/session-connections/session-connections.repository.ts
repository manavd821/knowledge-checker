import { DB } from "@/db/types";
import { DatabaseBoundary } from "@/modules/database-boundary";
import { CreateSessionConnection, SelectSessionConnection } from "@/modules/session-connections/session-connections.types";
import { session_connections } from "@/modules/session-connections/session-connections.table";
import { and, eq, isNull } from "drizzle-orm";
import { session_participants } from "@/modules/session-participants/session-participants.table";


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

    @DatabaseBoundary("")
    async get_active_connection_by_session_id(
        session_id: string,
    ){
        return (
            await this.db
            .select({
                connection_id: session_connections.connection_id
            })
            .from(session_connections)
            .innerJoin(
                session_participants,
                eq(
                    session_connections.participant_id,
                    session_participants.participant_id,
                )
            )
            .where(
                and(
                    eq(session_participants.session_id, session_id),
                    isNull(session_connections.left_at)
                )
            )
            .limit(1)
        );
                    
    }

}