from uuid import UUID

from cache.session_runtime_context import SessionRuntimeContextCache
from config.settings import get_settings
from events.payloads import SessionRuntimeContextUpdate
from models.session_runtime_context import InsertSessionRuntimeContext, SelectSessionRuntimeContext
from repositories.session_runtime_context import SessionRuntimeContextRepository


class SessionRuntimeContextService:
    def __init__(
        self,
        session_runtime_ctx_repo: SessionRuntimeContextRepository,
        session_runtime_ctx_cache: SessionRuntimeContextCache,
    ) -> None:
        self._session_runtime_ctx_repo = session_runtime_ctx_repo
        self._session_runtime_ctx_cache = session_runtime_ctx_cache
        
    async def get_ctx(
        self,
        session_id: UUID,
    ) -> SelectSessionRuntimeContext | None:
        # cache
        data = await self._session_runtime_ctx_cache.get(str(session_id))
        if data:
            return data
        # cache miss
        # get from db
        data = await self._session_runtime_ctx_repo.get_runtime_ctx(session_id)
        # set in cache
        if data:
            ttl_seconds = get_settings().GRAPH_REDIS_TTS_MINUTES * 60
            await self._session_runtime_ctx_cache.set(str(session_id), data, ttl_seconds)
        return data
    
    async def create_ctx(
        self,
        data: InsertSessionRuntimeContext,
    ) -> str:
        runtime_ctx_id =  await self._session_runtime_ctx_repo.create(data)
        return runtime_ctx_id
    
    async def update_ctx_cache(
        self,
        session_id: UUID,
        update: SessionRuntimeContextUpdate
    ):
        await self._session_runtime_ctx_cache.update_session(
            str(session_id),
            update=update.model_dump(),
            ttl_seconds = get_settings().GRAPH_REDIS_TTS_MINUTES * 60,
        )