from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from infrastructure import get_logger
from models.orm.sessions import Session
from exceptions.client_database import DatabaseError

logger = get_logger(__name__)

class SessionRepository:
    def __init__(self, session : AsyncSession) -> None:
        self._session = session
        logger.debug("SessionRepository created")
        
    async def get_session_by_id(self, session_id : str) -> Session | None:
        stmt = select(Session).where(Session.session_id == session_id)
        try:
            result = await self._session.execute(stmt)
        except Exception as e:
            raise DatabaseError(
                operation="get_session_by_id",
                reason=str(e),
            ) from e
        
        session_obj = result.scalar_one_or_none()
        return session_obj
        