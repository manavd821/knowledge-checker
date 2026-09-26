from uuid import UUID

from sqlalchemy import select
from db.db_session import node_db_session
from models.orm.session_runtime_contexts import SessionRuntimeContext
from models.session_runtime_context import InsertSessionRuntimeContext, SelectSessionRuntimeContext

class SessionRuntimeContextRepository:
    async def get_runtime_ctx(
        self,
        session_id: UUID,
    ) -> SelectSessionRuntimeContext | None:
        async with node_db_session() as session:
            result = await session.execute(
                select(SessionRuntimeContext)
                .where(
                    SessionRuntimeContext.session_id == session_id
                )
            )
            
            data = result.scalar_one_or_none()
            if not data:
                return
            return SelectSessionRuntimeContext.model_validate(data)
    
    async def create(self, data: InsertSessionRuntimeContext) -> str :
        async with node_db_session() as session:
            runtime = SessionRuntimeContext(
                **data.model_dump()
            )
            session.add(runtime)
            
            return str(runtime.session_runtime_context_id)