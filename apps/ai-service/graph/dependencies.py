from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from core.singletons import (
    get_database,
    get_llm_provider,
    get_redis_client,
)
from repositories import (
    SessionRepository,
    TurnRepository,
    SessionContextRepository,
    CacheRepository,
)
from services.token_service import TokenService
from services.context_service import ContextService
from services.evaluation_service import EvaluationService
from services.difficulty_service import DifficultyService
from services.question_service import QuestionService
from services.hint_service import HintService

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

def get_cache_repo() -> CacheRepository:
    """CacheRepository factory function - returns CacheRepository instance"""
    return CacheRepository(get_redis_client())

def get_token_service() -> TokenService:
    return TokenService(get_llm_provider())

def get_context_service() -> ContextService:
    return ContextService(
        llm_provider=get_llm_provider(),
        token_service=get_token_service(),
    )

def get_evaluation_service() -> EvaluationService:
    return EvaluationService(get_llm_provider())

def get_difficulty_service() -> DifficultyService:
    return DifficultyService()

def get_question_service() -> QuestionService:
    return QuestionService(get_llm_provider())

def get_hint_service() -> HintService:
    return HintService(get_llm_provider())