from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure import get_logger
from models.orm import SessionContext
from exceptions.client_database import DatabaseError

logger = get_logger(__name__)

class SessionContextRepository:
    def __init__(self, session : AsyncSession) -> None:
        self._session = session
        logger.debug("SessionContextRepo created")
        
    async def create_context_session(
        self,
        context_text : str,
        context_token_count : int,
        version : int,
    ) -> str | None:
        new_session_context = SessionContext(
            context_text = context_text,
            context_token_count = context_token_count,
            version = version
        )
        self._session.add(new_session_context)
        try:
            await self._session.flush()
        except Exception as e:
            raise DatabaseError(
                operation="create_context_session", 
                reason=str(e)
            ) from e
        
        return str(new_session_context.session_context_id)