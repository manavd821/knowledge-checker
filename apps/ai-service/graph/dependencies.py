from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from core.singletons import (
    get_database,
)

@asynccontextmanager
async def node_db_session() -> AsyncGenerator[AsyncSession, None]:
    db = get_database()
    async with db.get_session() as session:
        yield session