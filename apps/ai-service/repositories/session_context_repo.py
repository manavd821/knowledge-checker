from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import (
    select,
    update,
)
from infrastructure import get_logger
from models.orm import SessionContext
from models import SessionContextSchema
from exceptions.infrastructure import DatabaseError

logger = get_logger(__name__)

class SessionContextRepository:
    def __init__(self, session : AsyncSession) -> None:
        self._session = session
        logger.debug("SessionContextRepo created")
        
    async def create_session_context(
        self,
        session_id : str,
        context_text : str,
        context_token_count : int,
        version : int,
    ) -> str | None:
        new_session_context = SessionContext(
            session_id=session_id,
            context_text = context_text,
            context_token_count = context_token_count,
            version = version
        )
        self._session.add(new_session_context)
        try:
            await self._session.flush()
        except SQLAlchemyError as e:
            raise DatabaseError(
                f"Failed to create context session",
                code="SQLALCHEMY_ERROR",
            ) from e
        
        return str(new_session_context.session_context_id)
    
    async def get_session_context_by_session_id(
        self,
        session_id : str,
    ) -> SessionContextSchema | None:
        stmt = select(SessionContext).where(SessionContext.session_id == session_id)
        try:
            result = await self._session.execute(stmt)
        except SQLAlchemyError as e:
            raise DatabaseError(
                f"Failed to get session '{session_id}'",
                code="SQLALCHEMY_ERROR",
            ) from e
        
        session_context = result.scalar_one_or_none()
        if session_context is None:
            return None
        
        return SessionContextSchema.model_validate(session_context)
    
    async def update_session_context_by_session_id(
        self,
        session_id : str,
        context_text : str,
        context_token_count : int,
        version : int,
    ):
        stmt = (
        update(SessionContext)
        .where(SessionContext.session_id == session_id)
        .values(
            context_text = context_text,
            context_token_count = context_token_count,
            version=version + 1,
        ))
        try:
            await self._session.execute(stmt)
        except SQLAlchemyError as e:
            raise DatabaseError(
                f"Failed to update session '{session_id}'",
                code="SQLALCHEMY_ERROR",
            ) from e
        