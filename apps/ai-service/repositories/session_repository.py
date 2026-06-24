import inspect

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import (
    select,
    update,
    inspect,
)
from datetime import datetime
from infrastructure import get_logger
from models.orm.sessions import Session
from models import (
    SessionConfig, 
    STATUS,
)
from sqlalchemy.exc import SQLAlchemyError
from exceptions.infrastructure import DatabaseError

logger = get_logger(__name__)

class SessionRepository:
    def __init__(self, session : AsyncSession) -> None:
        self._session = session
        logger.debug("SessionRepository created")
        
    async def get_session_by_id(self, session_id : str) -> Session | None:
        stmt = select(Session).where(Session.session_id == session_id)
        try:
            result = await self._session.execute(stmt)
        except SQLAlchemyError as e:
            raise DatabaseError(
                f"Failed to fetch session '{session_id}'",
                code="SQLALCHEMY_ERROR",
            ) from e
        
        session_obj = result.scalar_one_or_none()
        return session_obj
    
    async def get_session_config(self, session_id : str) -> SessionConfig | None:
        session_obj = await self.get_session_by_id(session_id)
        if not session_obj:
            return None
        
        return SessionConfig.model_validate(session_obj)
    
    async def update_session_status(
        self,
        session_id : str,
        status : STATUS,
        **kwargs,
    ):
        valid_columns = {
            attr.key
            for attr in inspect(Session).mapper.column_attrs
        }
        invalid_fields = set(kwargs) - valid_columns
        if invalid_fields:
            raise ValueError(
                f"Invalid Session fields: {invalid_fields}"
            )
        stmt = (
            update(Session)
            .where(Session.session_id == session_id)
            .values(
                status = status,
                **kwargs,
            )
        )
        try:
            await self._session.execute(stmt)
        except Exception as e:
            raise DatabaseError(
                f"Failed to update session status'{session_id}'",
                code="SQLALCHEMY_ERROR",
            ) from e
        