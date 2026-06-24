from typing import (
    Annotated, 
    AsyncGenerator
)
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from core.singletons import (
    get_database,
    get_llm_provider,
)
from infrastructure import (
    Database,
)
from repositories import (
    SessionRepository,
    TurnRepository,
    SessionContextRepository,
)
from services.evaluation_service import EvaluationService
from services.question_service import QuestionService

async def get_db_session(
    db : Annotated[Database, Depends(get_database)]
) -> AsyncGenerator[AsyncSession, None]:
    async with db.get_session() as session:
        yield session

AsyncDbSession = Annotated[AsyncSession, Depends(get_db_session)]

async def get_session_repo(
    session: AsyncDbSession,
) -> SessionRepository:
    return SessionRepository(session=session)

SessionRepo = Annotated[SessionRepository, Depends(get_session_repo)]

async def get_turn_repo(
    session :  AsyncDbSession,
) -> TurnRepository:
    return TurnRepository(session=session)

TurnRepo = Annotated[TurnRepository, Depends(get_turn_repo)]

async def get_session_context_repo(
    session : AsyncDbSession,
) -> SessionContextRepository:
    return SessionContextRepository(session=session)

SessionContextRepo = Annotated[SessionContextRepository, Depends(get_session_context_repo)]


async def get_evaluation_service() -> EvaluationService:
    return EvaluationService(get_llm_provider())

evaluation_service = Annotated[EvaluationService, Depends(get_evaluation_service)]

async def get_question_service() -> QuestionService:
    return QuestionService(get_llm_provider())

question_service = Annotated[QuestionService, Depends(get_question_service)]