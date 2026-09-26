from sqlalchemy import select
from db.db_session import node_db_session
from models.orm.session_contexts import SessionContext
from models.session_context import SelectSessionContextModel, UpdateSessionContextModel

class SessionContextRepository:
    async def get_ctx(
        self,
        session_id: str,
    ) -> SelectSessionContextModel | None:
        async with node_db_session() as session:
            result = await session.execute(
                select(SessionContext)
                .where(
                    SessionContext.session_id == session_id
                )
            )
            
            data = result.scalar_one_or_none()
            if not data:
                return
            return SelectSessionContextModel.model_validate(data)
    
    async def create(
        self, 
        session_id: str,
        data: UpdateSessionContextModel
    ) -> str :
        async with node_db_session() as session:
            ctx = SessionContext(
                session_id=session_id,
                **data.model_dump(),
            )
            session.add(ctx)
            
            return str(ctx.session_context_id)
    
    async def update(
        self,
        session_id: str,
        data: UpdateSessionContextModel,
    ):
        async with node_db_session() as session:
            ctx = SessionContext(
                session_id=session_id,
                **data.model_dump(),
            )
            session.add(ctx)