from uuid import UUID

from cache.session import SessionCache
from cache.processor_session_context import ProcessorSessionContextCache
from config.settings import get_settings
from events.payloads import SessionContextUpdate
from exceptions.CacheMissError import CacheMissError
from exceptions.NotFoundError import NotFoundError
from models.enums import Difficulty
from models.session_runtime_context import InsertSessionRuntimeContext, SelectSessionRuntimeContext, SessionRuntimeContext
from models.sessions import SessionContext
from repositories.sessions import SessionRepository
from services.session_runtime_context import SessionRuntimeContextService
from services.session_service import SessionService

class SessionContextStore:
    def __init__(
        self,
        processor_session_ctx_cache: ProcessorSessionContextCache,
        session_service: SessionService,
        session_runtime_ctx_service: SessionRuntimeContextService
    ) -> None:
        self._session_service = session_service    
        self._processor_session_ctx_cache = processor_session_ctx_cache
        self._session_runtime_ctx_service = session_runtime_ctx_service
    
    def _create_initial_runtime_ctx(
        self, 
        session_id: UUID,
    ) -> InsertSessionRuntimeContext:
        return InsertSessionRuntimeContext(
            session_id=session_id,
            turn_number=1,
            questions_asked=0,
            fundamental_phase=True,
            current_difficulty=Difficulty.EASY,
            current_question="",
            previous_score=0,
            overall_score=0,
            active_context="",
            context_tokens=0,
            version=1,
        )
    
    async def get_session_context(
        self,
        session_id: UUID,
    ) -> SessionContext:
        # get from cache
        cached = await self._processor_session_ctx_cache.get(str(session_id))
        if cached:
            return cached
        
        # cache miss
        # get session
        session = await self._session_service.get_session(str(session_id))
        # get session runtime context
        session_runtime_ctx = await self._session_runtime_ctx_service.get_ctx(session_id)
        
        # handle it when it is first time accessed
        if session_runtime_ctx is None:
            session_runtime_ctx = self._create_initial_runtime_ctx(session_id)
            await self._session_runtime_ctx_service.create_ctx(session_runtime_ctx)
        
        runtime = SessionRuntimeContext.model_validate(session_runtime_ctx)
        session_ctx = SessionContext(
            session=session,
            runtime=runtime,
        )
        return session_ctx
    
    async def update_session_context(
        self,
        session_id: UUID,
        update: SessionContextUpdate,
    ):
        settings = get_settings()
        current = await self._processor_session_ctx_cache.get(
            str(session_id)
        )
        if current is None:
            raise CacheMissError(
                f"Session context not found: {session_id}"
            )
        current = current.model_dump()
        
        runtime = current["runtime"].update(
            update.model_dump()
        )
        
        await self._processor_session_ctx_cache.update(
            session_id=str(session_id),
            update=runtime,
            ttl_seconds=settings.GRAPH_REDIS_TTS_MINUTES * 60,
        )
        
        