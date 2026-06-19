from typing import (
    Annotated, 
    AsyncGenerator
)
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from core.singletons import (
    get_database,
)
from infrastructure import Database

async def get_db_session(
    db : Annotated[Database, Depends(get_database)]
) -> AsyncGenerator[AsyncSession, None]:
    async with db.get_session() as session:
        yield session


AsyncDbSession = Annotated[AsyncSession, Depends(get_db_session)]