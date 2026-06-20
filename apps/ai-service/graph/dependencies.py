from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from core.singletons import (
    get_database,
)
from repositories import (
    SessionRepository,
    TurnRepository,
    SessionContextRepository,
)

@asynccontextmanager
async def node_db_session() -> AsyncGenerator[AsyncSession, None]:
    db = get_database()
    async with db.get_session() as session:
        yield session

def get_session_repo(session : AsyncSession) -> SessionRepository:
    return SessionRepository(session=session)

def get_turn_repo(session :  AsyncSession) -> TurnRepository:
    return TurnRepository(session=session)

def get_session_context_repo(session : AsyncSession) -> SessionContextRepository:
    return SessionContextRepository(session=session)
